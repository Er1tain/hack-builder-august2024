from fastapi import APIRouter
from database.schemas import RegisterRequestSchema, RegisterResponseSchema, LoginRequestSchema, LoginResponseSchema
from logic.client_logic import UserLogicManager

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=RegisterResponseSchema)
async def register_user_point(schema: RegisterRequestSchema) -> RegisterResponseSchema:
    result = await UserLogicManager.register_user_logic(schema)
    return result


@router.post("/login", response_model=LoginResponseSchema)
async def login_user_point(schema: LoginRequestSchema) -> LoginResponseSchema:
    result = await UserLogicManager.loging_user_logic(login_schema=schema)
    return result

