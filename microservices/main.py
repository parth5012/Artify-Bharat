from fastapi import FastAPI, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from utils.transcription import get_transcription
from utils.story_generation import generate_artisan_story, generate_product_story
from utils.description import generate_product_description


app = FastAPI()

origins = [
    # For React Frontend Server
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # List of allowed origins
    allow_credentials=True,  # Allow cookies and authorization headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.get("/story/{product:str}")
async def create_story(product: str, request: Request):
    return generate_product_story(product)


@app.post("/process_audio")
async def process_audio(request: Request, file: UploadFile = File(...)):
    audio_bytes = await file.read()
    # Transcribe!!
    try:
        transcription = get_transcription(audio_bytes)
        print(transcription)
    except RuntimeError:
        return {"error": "Couldn't transcribe the audio!!"}
    # Story Generation!!
    story = generate_artisan_story(transcription)

    # Return the Response!!
    return {"text": transcription, "story": story}


@app.post("/process_product_description")
async def process_product_description(request: Request, file: UploadFile = File(...)):
    """
    Process audio recording of product description
    - Transcribes the audio (any language)
    - Generates a concise 20-30 word English description
    """
    audio_bytes = await file.read()

    # Transcribe the audio
    try:
        transcription = get_transcription(audio_bytes)
        print(f"Transcribed: {transcription}")
    except RuntimeError:
        return {"error": "Couldn't transcribe the audio!!"}

    # Generate product description
    description = generate_product_description(transcription)

    # Return the response
    return {"transcription": transcription, "description": description}
