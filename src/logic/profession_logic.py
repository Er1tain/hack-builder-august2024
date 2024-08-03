from database.schemas import ProfessionsSchema, ProfessionsSchemaCreate, ProfessionsFeedSchema
from database.manager import model_manager


class ProfessionLogicManager:

    @staticmethod
    async def create_profession_logic(schema_create: ProfessionsSchemaCreate):
        await model_manager.create_profession(schema_create.dict())

    @staticmethod
    async def get_feed_professions():
        professions = await model_manager.get_all_professions()
        return ProfessionsFeedSchema(professions=[ProfessionsSchema(id=prof.id, profession_name=prof.profession_name) for prof in professions] if professions else [])