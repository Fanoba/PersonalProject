from beanie import  Document
from pydantic import Field
from typing import Optional

class Prompt(Document):
    titulo: str = Field(..., min_length=3)
    description: Optional[str] = Field(None, max_length=300)
    text: Optional[str] = Field(None, max_length=300)
    
    class Settings:
        name = "prompts"  # Nombre de la colección en MongoDB
