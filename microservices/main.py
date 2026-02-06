from fastapi import FastAPI, Request, UploadFile, File
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
async def create_story(product: str, request: Request):
    return generate_story(product)


@app.post("/transcribe")
async def transcribe(request: Request, file: UploadFile = File(...)):
    audio_bytes = file.read()
    try:
        transcription = get_transcription(audio_bytes)

    except RuntimeError:
        return {"error": "Couldn't transcribe the audio!!"}
    return {"text": transcription}
