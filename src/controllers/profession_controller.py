from fastapi import APIRouter, Request
from logic.profession_logic import ProfessionLogicManager
from database.schemas import ProfessionsSchemaCreate, SuccessfulResponse, ProfessionsSchema, ProfessionsFeedSchema

router = APIRouter(prefix="/profession", tags=["Profession"])


@router.post("/new/profession", response_model=SuccessfulResponse)
async def create_new_profession_point(schema: ProfessionsSchemaCreate, request: Request):
    await ProfessionLogicManager.create_profession_logic(schema)
    return SuccessfulResponse(result=True)


@router.get("/all", response_model=ProfessionsFeedSchema)
async def get_all_profession_point():
    feed = await ProfessionLogicManager.get_feed_professions()
    return feed




