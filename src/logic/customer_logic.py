from database.schemas import ErrorSchema, CustomerInfoSchema, ObjectConstructionProfileSchema, ProfessionsSchema, \
    CustomerUpdateSchema, ObjectConstructionCreateSchema, ObjectConstructionInfoSchema, CustomerSchema, ProfileSchema
from database.manager import model_manager


class CustomerLogicManager:

    @staticmethod
    async def get_customer_info_logic(api_key: str):
        customer_info = await model_manager.get_customer_info(api_key)
        return CustomerInfoSchema(id=customer_info.user_id,
                                  first_name=customer_info.user.first_name,
                                  surname=customer_info.user.surname,
                                  second_name=customer_info.user.second_name,
                                  email=customer_info.user.email,
                                  company_name=customer_info.company_name,
                                  company_description=customer_info.company_description,
                                  object_constructions=[ObjectConstructionProfileSchema
                                                        (id=obj.object_construction.id,
                                                         work_name=obj.object_construction.work_name,
                                                         price=obj.object_construction.price,
                                                         ork_description=obj.object_construction.work_description,
                                                         available_vacancies=obj.object_construction.available_vacancies,
                                                         professions=[ProfessionsSchema(id=prof.id,
                                                                                        profession_name=prof.profession_name)
                                                                      for prof in obj.object_construction.professions])
                                                        for obj in customer_info.object_constructions])

    @staticmethod
    async def get_customer_update_logic(customer_id: int, schema_update: CustomerUpdateSchema, api_key: str):
        user_info = {"first_name": schema_update.first_name,
                     "surname": schema_update.surname,
                     "second_name": schema_update.second_name,
                     "email": schema_update.email
                     }
        customer_info = {
            "company_name": schema_update.company_name,
            "company_description": schema_update.company_description
        }
        await model_manager.update_user(user_id=customer_id, values_data=user_info)
        await model_manager.update_customer(values_data=customer_info, customer_id=customer_id)
        customer_info = await model_manager.get_customer_info(api_key)
        return CustomerInfoSchema(id=customer_info.user_id,
                                  first_name=customer_info.user.first_name,
                                  surname=customer_info.user.surname,
                                  second_name=customer_info.user.second_name,
                                  email=customer_info.user.email,
                                  company_name=customer_info.company_name,
                                  company_description=customer_info.company_description,
                                  object_constructions=[ObjectConstructionProfileSchema
                                                        (id=obj.object_construction.id,
                                                         price=obj.object_construction.price,
                                                         work_name=obj.object_construction.work_name,
                                                         ork_description=obj.object_construction.work_description,
                                                         available_vacancies=obj.object_construction.available_vacancies,
                                                         professions=[ProfessionsSchema(id=prof.id,
                                                                                        profession_name=prof.profession_name)
                                                                      for prof in
                                                                      obj.object_construction.professions] if obj.object_construction.professions else [])
                                                        for obj in
                                                        customer_info.object_constructions] if customer_info.object_constructions else [])

    @staticmethod
    async def get_info_object_construction_logic(obj_id: int):
        obj = await model_manager.get_object_construction_info(object_construction_id=obj_id)
        return ObjectConstructionInfoSchema(id=obj.id,
                                            work_name=obj.work_name,
                                            price=obj.price,
                                            customer=CustomerSchema(id=obj.customer_id,
                                                                    first_name=obj.customer.user.first_name,
                                                                    surname=obj.customer.user.surname,
                                                                    second_name=obj.customer.user.second_name,
                                                                    company_name=obj.customer.company_name),
                                            work_description=obj.work_description,
                                            available_vacancies=obj.available_vacancies,
                                            professions=[
                                                ProfessionsSchema(id=prof.id, profession_name=prof.profession_name) for
                                                prof in obj.professions] if obj.professions else [],
                                            workers=[ProfileSchema(id=worker.user_id,
                                                                   first_name=worker.user.first_name,
                                                                   second_name=worker.user.second_name,
                                                                   surname=worker.user.surname,
                                                                   worker=worker.user.second_name,
                                                                   email=worker.user.email) for worker in
                                                     obj.workers] if obj.workers else [])

    @staticmethod
    async def create_object_construction_logic(schema_create: ObjectConstructionCreateSchema, api_key: str):
        customer = await model_manager.get_user(api_key=api_key)
        await model_manager.create_object_construction(schema_create.dict(), customer_id=customer.id)

    @staticmethod
    async def delete_object_construction_logic(obj_id: int, customer_id: int):
        await model_manager.delete_object_construction(obj_id=obj_id, customer_id=customer_id)
