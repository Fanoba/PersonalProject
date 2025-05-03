from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from modelPrompt import Prompt
from beanie import init_beanie,PydanticObjectId
import os
from bson.errors import InvalidId  # En lugar de pymongo.errors
from typing import List  
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Configuración de conexión
MONGODB_URI = os.getenv("MONGODB_ATLAS_URI")
DB_NAME = "Promptwise"

@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(MONGODB_URI)
    await init_beanie(
        database=app.mongodb_client[DB_NAME],
        document_models=[Prompt]  # <-- Registra tu modelo aquí
    )

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

@app.post("/prompt", response_model=Prompt)  # <-- Usa response_model
async def create_prompt(prompt: Prompt):
    try:
        await prompt.insert()  # <-- Método nativo de Beanie
        return prompt
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.get("/allprompts", response_model=List[Prompt])
async def get_all_prompts():
    """
    Obtiene TODOS los prompts de la colección.
    """
    prompts = await Prompt.find_all().to_list()
    return prompts

@app.delete("/prompts/{prompt_id}")
async def delete_prompt(prompt_id: str):
    try:
        # Convertir el string a ObjectId
        obj_id = PydanticObjectId(prompt_id)
        prompt = await Prompt.get(obj_id)
        
        if not prompt:
            raise HTTPException(status_code=404, detail="Prompt no encontrado")
            
        await prompt.delete()
        return {"status": "success", "message": f"Prompt '{prompt.titulo}' eliminado"}
        
    except (InvalidId, ValueError):
        raise HTTPException(
            status_code=400,
            detail="Formato de ID inválido. Ejemplo correcto: 68155d5b6afaea2e9dc11541"
        )