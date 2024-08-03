from fastapi import APIRouter, Request
from fastapi.responses import FileResponse
from database.schemas import UpdateProfileSchema, ProfileSchema, ObjectConstructionFeedSchema, SuccessfulResponse, ProfileInfo, LevelUpSchema
from logic.client_logic import UserLogicManager
from database.manager import model_manager

router = APIRouter(prefix="/client", tags=["Client"])


@router.get("/me", response_model=ProfileInfo)
async def get_me_info_point(request: Request) -> ProfileInfo:
    api_key = request.headers.get("api-key")
    result = await UserLogicManager.get_profile_info_logic(api_key)
    return result


@router.put("/me", response_model=ProfileInfo)
async def me_info_update_point(request: Request, schema: UpdateProfileSchema) -> ProfileSchema:
    api_key = request.headers.get("api-key")
    result = await UserLogicManager.update_profile_client(api_key, schema)
    return result


@router.get("/feed/object-construction", response_model=ObjectConstructionFeedSchema)
async def get_feed_object_construction_point(request: Request) -> ObjectConstructionFeedSchema:
    result = await UserLogicManager.get_all_object_construction_logic()
    return result


@router.post("/get_work/{obj_id}", response_model=SuccessfulResponse)
async def create_profile_object_construction_point(obj_id: int, request: Request) -> SuccessfulResponse:
    api_key = request.headers.get("api-key")
    user = await model_manager.get_user(api_key=api_key)
    await UserLogicManager.create_profile_object_construction_logic(obj_id=obj_id, user_id=user.id)
    return SuccessfulResponse(result=True)


@router.post("/new/file")
async def create_diplom_file_point(request: Request):
    form = await request.form()
    file = form.get("file")
    api_key = request.headers.get("api-key")
    await UserLogicManager.save_files_logic(file=file, api_key=api_key)


@router.get("/file/{file_name}")
def get_files_point(request: Request, file_name: str):
    file_path = UserLogicManager.get_files(file_name)
    return FileResponse(file_path)


@router.put("/level-up", response_model=LevelUpSchema)
async def grade_user_point(request: Request):
    api_key = request.headers.get("api-key")
    result = await UserLogicManager.level_up_profile_logic(api_key)
    return result


@router.post("/profession/{profession_id}")
async def add_profession_user(profession_id: int, request: Request):
    api_key = request.headers.get("api-key")
    await UserLogicManager.create_profession_profile_logic(api_key=api_key, profession_id=profession_id)
    return SuccessfulResponse(result=True)


@router.delete("/profession/{profession_id}")
async def delete_profession_user(profession_id: int, request: Request):
    api_key = request.headers.get("api-key")
    await UserLogicManager.delete_profession_profile_logic(api_key=api_key, profession_id=profession_id)
    return SuccessfulResponse(result=True)

