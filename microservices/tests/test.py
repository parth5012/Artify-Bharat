import os
import sys

parent_dir = sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from main import app
from fastapi.testclient import TestClient


client = TestClient(app)


def test_artisan_story_generation():
    # Create a dummy audio file for testing
    with open("test_audio.wav", "wb") as f:
        f.write(b"dummy audio data")

    # Open the file in binary read mode and prepare the 'files' dictionary
    with open("test_audio.wav", "rb") as audio_file:
        files = {"file": ("test_audio.wav", audio_file, "audio/wav")}

        # Send the POST request to the endpoint
        response = client.post("/process_audio", files=files)

    # Clean up the dummy file
    os.remove("test_audio.wav")

    assert response.status_code == 200
    # assert isinstance(response.data["text"], str)
