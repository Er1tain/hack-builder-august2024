from fastapi import APIRouter
from controllers.customer_controller import router as object_construction_router
from controllers.auth_controller import router as auth_router
from controllers.client_controller import router as client_router
from controllers.profession_controller import router as profession_router


api_router = APIRouter(prefix="/api", tags=["API"])

api_router.include_router(object_construction_router)
api_router.include_router(auth_router)
api_router.include_router(client_router)
api_router.include_router(profession_router)
