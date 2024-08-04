import os

from fastapi import FastAPI, Request
from starlette.responses import HTMLResponse
from starlette.staticfiles import StaticFiles

from database.manager import model_manager
from settings.router import api_router
import uvicorn

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Hackaton API",
            version="0.1.0",
            openapi_url="/openapi.json",
            docs_url="/docs")
app.include_router(api_router)

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:8100",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)
app.mount(
    "/", StaticFiles(directory=os.path.abspath("dist"), html=True), name="dist"
)


@app.get("/", response_class=HTMLResponse)
async def get_root(request: Request) -> HTMLResponse:
    return HTMLResponse("index.html")


#@app.on_event("startup")
#async def startup_event():
   # await model_manager.clear_models()

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

