from fastapi import FastAPI, HTTPException
from copykitt import generate_branding_snippet, MAX_INPUT_LENGTH
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware


# command: uvicorn copykitt_api:app --reload
app = FastAPI()
# handler func works as an entry point for AWS Lambda
handler = Mangum(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
    validate_input(prompt)
    snippet, keywords = generate_branding_snippet(prompt)
    return {
        "prompt": prompt,
        "snippet": snippet,
        "keywords": keywords
        }


def validate_input(prompt: str) -> bool:
    if len(prompt) > MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input is too long! Must not exceed {MAX_INPUT_LENGTH} characters. Your input is {prompt}."
        )
