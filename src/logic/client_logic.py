import os
import secrets
import string
import uuid

from database.schemas import RegisterRequestSchema, RegisterResponseSchema, ProfessionsSchema, LoginRequestSchema, ErrorSchema, LoginResponseSchema, ProfileInfo, ObjectConstructionProfileSchema, ObjectConstructionFeedSchema, UpdateProfileSchema, DiplomFileSchema, LevelUpSchema
from database.manager import model_manager
from werkzeug.security import check_password_hash, generate_password_hash
from fastapi import HTTPException


class UserLogicManager:
    
    @staticmethod
    def _generate_api_key() -> str:
        allowed_characters = string.ascii_letters + string.digits + '-_.~'
        return "".join(secrets.choice(allowed_characters) for _ in range(120))

    @staticmethod
    async def register_user_logic(register_schema: RegisterRequestSchema) -> RegisterResponseSchema:
        register_schema.password = generate_password_hash(register_schema.password)
        api_key = UserLogicManager._generate_api_key()
        user = await model_manager.create_user(register_schema.dict(), api_key=api_key)
        print(user.api_key)
        return RegisterResponseSchema(id=user.id,
                                      first_name=user.first_name,
                                      surname=user.surname,
                                      second_name=user.second_name,
                                      api_key=user.api_key)

    @staticmethod
    async def loging_user_logic(login_schema: LoginRequestSchema):
        user = await model_manager.get_user(email=login_schema.email)
        if user is None:
            detail_error = ErrorSchema(error_message="Вы не зарегестрированы или ввели не верный пароль", error_type="ErrorAuthorihtation")
            raise HTTPException(status_code=404, detail=detail_error.dict())
        if check_password_hash(password=login_schema.password, pwhash=user.password):
            return LoginResponseSchema(id=user.id, api_key=user.api_key)
        detail_error = ErrorSchema(error_message="Ошибка авторизации, не верный пороль", error_type="ErrorAuthorihtation")
        raise HTTPException(status_code=403, detail=detail_error.dict())

    @staticmethod
    async def get_profile_info_logic(api_key: str):
        profile_info = await model_manager.get_profile_info(api_key=api_key)
        print(profile_info.professions)
        return ProfileInfo(id=profile_info.user_id,
                           first_name=profile_info.user.first_name,
                           diploms_files=[DiplomFileSchema(url=f"api/client/file/{url.file_name}") for url in profile_info.user.diplom_files] if profile_info.user.diplom_files else [],
                           surname=profile_info.user.surname,
                           second_name=profile_info.user.second_name,
                           email=profile_info.user.email,
                           phone_number=profile_info.phone_number,
                           about_me=profile_info.about_me,
                           grade_up=profile_info.grade_up,
                           professions=[ProfessionsSchema(id=prof.id, profession_name=prof.profession_name) for prof in profile_info.professions] if profile_info.professions else [],
                           object_construction=ObjectConstructionProfileSchema(id=profile_info.object_construction.id,
                                                                               price=profile_info.object_construction.price,
                                                                               work_name=profile_info.object_construction.work_name,
                                                                               work_description=profile_info.object_construction.work_description,
                                                                               available_vacancies=profile_info.object_construction.available_vacancies,
                                                                               professions=[ProfessionsSchema(id=prof.id, profession_name=prof.profession_name) for prof in profile_info.object_construction.professions]) if profile_info.object_construction_id is not None else None)

    @staticmethod
    async def update_profile_client(api_key: str, schema_update: UpdateProfileSchema):
        user_info = {"first_name": schema_update.second_name,
                     "surname": schema_update.surname,
                     "second_name": schema_update.second_name,
                     "email": schema_update.email
                     }
        profile_info = {
            "phone_number": schema_update.phone_number,
            "about_me": schema_update.about_me,
        }
        print(profile_info)
        user = await model_manager.get_user(api_key=api_key)
        await model_manager.update_user(values_data=user_info, user_id=user.id)
        await model_manager.update_profile(values_data=profile_info, user_id=user.id)
        update_user_profile = await UserLogicManager.get_profile_info_logic(api_key)
        return update_user_profile

    @staticmethod
    async def get_all_object_construction_logic():
        objects_constructions = await model_manager.get_object_construction_all()
        return ObjectConstructionFeedSchema(objects_constructions=[
            ObjectConstructionProfileSchema(id=obj.id,
                                            work_name=obj.work_name,
                                            price=obj.price,
                                            work_description=obj.work_description,
                                            available_vacancies=obj.available_vacancies,
                                            professions=[ProfessionsSchema(id=prof.id, profession_name=prof.profession_name) for
                                            prof in obj.professions] if obj.professions else []) for obj in objects_constructions] if objects_constructions else [])

    @staticmethod
    async def create_profile_object_construction_logic(obj_id: int, user_id: int):
        await model_manager.create_profile_object_construction(user_id=user_id, object_construction_id=obj_id)

    @staticmethod
    async def save_files_logic(file, api_key):
        client = await model_manager.get_user(api_key=api_key)
        file_name = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]
        file_path = os.path.join("src", "files", f"{client.id}_{file_name}")
        with open(file_path, "wb") as f:
            f.write(await file.read())
        await model_manager.create_diplom_file({"path": file_path, "file_name": file_name, "profile_id": client.id})

    @staticmethod
    def get_files_logic(file_name: str):
        file_location: str = os.path.join("src", "files", file_name)
        if os.path.exists(file_location):
            return file_location

    @staticmethod
    async def level_up_profile_logic(api_key: str):
        profile = await model_manager.get_profile_info(api_key=api_key)
        level = profile.grade_up + 1
        profile.grade_up += 1
        await model_manager.update_profile(values_data={"grade_up": profile.grade_up}, user_id=profile.user_id)
        return LevelUpSchema(level=level)

    @staticmethod
    async def create_profession_profile_logic(api_key: str, profession_id: int):
        profile = await model_manager.get_user(api_key)
        await model_manager.create_profession_user(profession_id=profession_id, user_id=profile.id)

    @staticmethod
    async def delete_profession_profile_logic(api_key: str, profession_id: int):
        profile = await model_manager.get_user(api_key)
        await model_manager.delete_profession_user(profession_id=profession_id, user_id=profile.id)
