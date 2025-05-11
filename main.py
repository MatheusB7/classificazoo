from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum
from fastapi.middleware.cors import CORSMiddleware

class Genero(str, Enum):
    macho = "Macho"
    femea = "Fêmea"

app = FastAPI()

# Liberação do CORS para permitir acesso do frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, defina o domínio correto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Animal(BaseModel):
    nome: str
    descricao: str
    especie: str
    habitat: str
    pais_origem: str
    tratamento_gestacional: Optional[bool] = None
    e_filhote: Optional[bool] = None
    idosos: Optional[bool] = None
    genero: Optional[Genero] = None
    castrado: Optional[bool] = None
    albino: Optional[bool] = None
    deficiente: Optional[bool] = None
    tipo_deficiencia: Optional[str] = None

animais_db: List[Animal] = []

@app.get("/")
def read_root():
    return {"message": "Bem-vindo ao Zoológico!"}

@app.get("/animais", response_model=List[Animal])
def listar_animais():
    return animais_db

@app.post("/animais", response_model=Animal)
def cadastrar_animal(animal: Animal):
    animais_db.append(animal)
    return animal

@app.put("/animais/{nome}", response_model=Animal)
def atualizar_animal(nome: str, animal_atualizado: Animal):
    for idx, animal in enumerate(animais_db):
        if animal.nome == nome:
            animais_db[idx] = animal_atualizado
            return animal_atualizado
    return {"error": "Animal não encontrado"}

@app.delete("/animais/{nome}", response_model=Animal)
def remover_animal(nome: str):
    for animal in animais_db:
        if animal.nome == nome:
            animais_db.remove(animal)
            return animal
    return {"error": "Animal não encontrado"}
