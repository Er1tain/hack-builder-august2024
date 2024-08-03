from pydantic import BaseModel
from typing import List


class SuccessfulResponse(BaseModel):
    result: bool


class LevelUpSchema(BaseModel):
    level: int


class RegisterRequestSchema(BaseModel):
    first_name: str
    surname: str
    second_name: str
    password: str
    email: str
    role: bool


class LoginRequestSchema(BaseModel):
    email: str
    password: str


class LoginResponseSchema(BaseModel):
    id: int
    api_key: str


class RegisterResponseSchema(BaseModel):
    id: int
    api_key: str


class ProfessionsSchema(BaseModel):
    id: int
    profession_name: str


class ProfessionsSchemaCreate(BaseModel):
    profession_name: str


class ProfessionsFeedSchema(BaseModel):
    professions: List[ProfessionsSchema]


class RegisterObjectConstructionSchema(BaseModel):
    work_name: str
    work_description: str
    available_vacancies: int
    profession: List[ProfessionsSchema]


class CustomerSchema(BaseModel):
    id: int
    first_name: str
    surname: str
    second_name: str
    company_name: str | None


class ObjectConstructionProfileSchema(BaseModel):
    id: int
    work_name: str
    price: int
    work_description: str
    available_vacancies: int
    professions: List[ProfessionsSchema]


class ObjectConstructionFeedSchema(BaseModel):
    objects_constructions: List[ObjectConstructionProfileSchema]


class ProfileSchema(BaseModel):
    id: int
    first_name: str
    surname: str
    second_name: str
    email: str

class DiplomFileSchema(BaseModel):
    url: str


class ProfileInfo(BaseModel):
    id: int
    first_name: str
    diploms_files: List[DiplomFileSchema]
    surname: str
    second_name: str
    email: str
    grade_up: int
    phone_number: str | None
    about_me: str | None
    object_construction: ObjectConstructionProfileSchema | None
    professions: List[ProfessionsSchema]


class UpdateProfileSchema(BaseModel):
    first_name: str
    surname: str
    second_name: str
    email: str
    grade_up: int
    phone_number: str | None
    about_me: str | None

class CustomerInfoSchema(BaseModel):
    id: int
    first_name: str
    surname: str
    second_name: str
    email: str
    company_name: str | None
    company_description: str | None
    object_constructions: List[ObjectConstructionProfileSchema]


class CustomerUpdateSchema(BaseModel):
    first_name: str
    surname: str
    second_name: str
    email: str
    company_name: str | None
    company_description: str | None


class ObjectConstructionInfoSchema(BaseModel):
    id: int
    customer: CustomerSchema
    price: int
    work_name: str
    work_description: str
    available_vacancies: int
    workers: List[ProfileSchema]
    professions: List[ProfessionsSchema]


class ObjectConstructionCreateSchema(BaseModel):
    work_name: str
    work_description: str
    price: int
    available_vacancies: int
    professions: List[ProfessionsSchema]

class ErrorSchema(BaseModel):
    error_type: str
    error_message: str