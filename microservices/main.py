from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from utils.transcription import get_transcription
from utils.story_generation import generate_story


app = FastAPI()

origins = [
    # For React Frontend Server
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,  # Allow cookies and authorization headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.get("/story/{product:str}")
async def create_story(product):
    return generate_story(product)

@app.get('/transcribe')
async def transcribe():
    return get_transcription