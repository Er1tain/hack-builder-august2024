from pathlib import Path

from pydantic_settings import BaseSettings
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent.parent


class DBSettings(BaseModel):
    url_db: str = "postgresql+asyncpg://root:root@db:5437/hackaton_db"


class Settings(BaseSettings):
    db_settings: DBSettings = DBSettings()


settings = Settings()