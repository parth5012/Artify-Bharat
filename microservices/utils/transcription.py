import assemblyai as aai
from dotenv import load_dotenv
import os


load_dotenv()


def get_transcription(audio: __file__) -> str:
    aai.settings.api_key = os.getenv("ASSEMBLYAI_API_KEY")
    config = aai.TranscriptionConfig(speech_model=aai.SpeechModel.universal)

    transcript = aai.Transcriber(config=config).transcribe(audio)

    if transcript.status == "error":
        raise RuntimeError(f"Transcription failed: {transcript.error}")

    return transcript.text
