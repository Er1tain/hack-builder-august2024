from fastapi import FastAPI
from database.manager import model_manager
from settings.router import api_router
import uvicorn

app = FastAPI(title="Hackaton API",
            version="0.1.0",
            openapi_url="/openapi.json",
            docs_url="/docs")
app.include_router(api_router)


#app.mount(
#    "/", StaticFiles(directory=os.path.abspath("static"), html=True), name="static"
#)

#@app.on_event("startup")
#async def startup_event():
#    await model_manager.clear_models()

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

