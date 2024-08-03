from fastapi import APIRouter, Request
from database.schemas import UpdateProfileSchema, ProfileSchema, ObjectConstructionFeedSchema, SuccessfulResponse, ProfileInfo
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

