from fastapi import FastAPI

from settings.router import api_router
import uvicorn

app = FastAPI()
app.include_router(api_router)
#app.mount(
#    "/", StaticFiles(directory=os.path.abspath("static"), html=True), name="static"
#)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
