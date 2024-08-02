from .db import DB
from settings.config import settings


class ManagerDB:
    def __init__(self, db_url: str) -> None:
        self.db = DB(db_url)
        self.async_session = self.db.async_session


manager = ManagerDB(settings.db_settings.url_db)
