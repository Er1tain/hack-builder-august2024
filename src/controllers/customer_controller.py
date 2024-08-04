from fastapi import APIRouter, Request
from database.schemas import CustomerUpdateSchema, ObjectConstructionCreateSchema, SuccessfulResponse, ObjectConstructionInfoSchema, CustomerInfoSchema
from logic.customer_logic import CustomerLogicManager
from database.manager import model_manager

router = APIRouter(prefix="/customer", tags=["Customer"])


@router.get("/me", response_model=CustomerInfoSchema)
async def get_me_point(request: Request) -> CustomerInfoSchema:
    api_key = request.headers.get("api-key")
    result = await CustomerLogicManager.get_customer_info_logic(api_key=api_key)
    return result


@router.put("/me", response_model=CustomerInfoSchema)
async def update_me_point(request: Request, schema: CustomerUpdateSchema) -> CustomerInfoSchema:
    api_key = request.headers.get("api-key")
    customer = await model_manager.get_user(api_key=api_key)
    result = await CustomerLogicManager.get_customer_update_logic(api_key=api_key, customer_id=customer.id, schema_update=schema)
    return result


@router.post("/new/object-construction", response_model=SuccessfulResponse)
async def create_object_construction_point(schema: ObjectConstructionCreateSchema, request: Request) -> SuccessfulResponse:
    api_key = request.headers.get("api-key")
    await CustomerLogicManager.create_object_construction_logic(api_key=api_key, schema_create=schema)
    return SuccessfulResponse(result=True)


@router.get("/info/object-construction/{obj_id}", response_model=ObjectConstructionInfoSchema)
async def get_info_object_construction_point(obj_id: int, request: Request) -> ObjectConstructionInfoSchema:
    obj_info = await CustomerLogicManager.get_info_object_construction_logic(obj_id)
    return obj_info


@router.delete("/delete/object-construction/{obj_id}", response_model=SuccessfulResponse)
async def delete_object_construction_point(obj_id: int, request: Request) -> SuccessfulResponse:
    api_key = request.headers.get("api-key")
    customer = await model_manager.get_customer_info(api_key=api_key)
    await CustomerLogicManager.delete_object_construction_logic(obj_id=obj_id, customer_id=customer.id)
    return SuccessfulResponse(result=True)