from .db import DB
from .models import Base, User, Profile, Customer, ObjectConstruction, Professions, ProfileProfessions, ObjectConstructionProfessions
from sqlalchemy import select, update, delete
from sqlalchemy.orm import joinedload, selectinload


class ManagerDB:
    def __init__(self, db_url: str) -> None:
        self.db = DB(db_url)
        self.async_session = self.db.async_session

    async def get_user(self, api_key: str | None = None, user_id: int | None = None, email: str | None = None) -> User | None:
        async with self.async_session() as session:
            request_model = select(User)
            if user_id is not None:
                request_model = request_model.where(User.id == user_id)
            elif api_key is not None:
                request_model = request_model.where(User.api_key == api_key)
            else:
                request_model = request_model.where(User.email == email)
            user = await session.execute(request_model)
            return user.scalar_one_or_none()

    async def create_user(self, user_data: dict, api_key: str) -> User:
        async with (self.async_session() as session):
            new_user: User = User(**user_data, api_key=api_key)
            session.add(new_user)
            await session.commit()
            print(new_user)
            user_id = new_user.id
            if user_data["role"]:
                session.add(Profile(user_id=user_id))
            else:
                session.add(Customer(user_id=user_id))
            await session.commit()
            return new_user

    async def create_object_construction(self, object_construction_data: dict, customer_id: int) -> ObjectConstruction:
        professions = object_construction_data["professions"]
        object_construction_data.pop("professions")
        async with self.async_session() as session:
            new_object_construction = ObjectConstruction(**object_construction_data, customer_id=customer_id)
            session.add(new_object_construction)
            await session.commit()
            for i in professions:
                session.add(ObjectConstructionProfessions(object_construction_id=new_object_construction.id, profession_id=i["id"]))
            await session.commit()
            obj = new_object_construction
            return obj

    async def create_profession(self, profession_data: dict) -> Professions:
        async with self.async_session() as session:
            new_profession = Professions(**profession_data)
            session.add(new_profession)
            await session.commit()

    async def delete_object_construction(self, customer_id: int, obj_id: int) -> None:
        async with self.async_session() as session:
            await session.execute(delete(ObjectConstruction).filter(ObjectConstruction.customer_id == customer_id, ObjectConstruction.id == obj_id))
            await session.commit()

    async def get_profile_info(self, api_key: str) -> Profile:
        async with self.async_session() as session:
            requests_model = (
            select(Profile)
            .options(
                joinedload(Profile.user),
                joinedload(Profile.object_construction),
                joinedload(Profile.professions),
                joinedload(Profile.object_construction).joinedload(ObjectConstruction.professions)
            )
            .join(Profile.user)
            .where(User.api_key == api_key)
        )
            profile_info = await session.execute(requests_model)
            return profile_info.unique().scalar_one_or_none()

    async def get_customer_info(self, api_key: str) -> Customer:
        async with self.async_session() as session:
            requests_model = select(Customer).options(joinedload(Customer.object_constructions),
                                                      joinedload(Customer.user),
                                                      joinedload(Customer.object_constructions).joinedload(ObjectConstruction.professions)
                                                      ).join(Customer.user).where(User.api_key == api_key)
            customer = await session.execute(requests_model)
            return customer.unique().scalar_one_or_none()

    async def get_all_professions(self) -> list[Professions]:
        async with self.async_session() as session:
            professions = await session.execute(select(Professions))
            return professions.scalars().all()

    async def get_object_construction_info(self, object_construction_id: int) -> ObjectConstruction | None:
        async with self.async_session() as session:
            requests_model = select(ObjectConstruction).options(joinedload(ObjectConstruction.customer),
                                                                joinedload(ObjectConstruction.professions),
                                                                joinedload(ObjectConstruction.workers),
                                                                joinedload(ObjectConstruction.workers).joinedload(Profile.user),
                                                                joinedload(ObjectConstruction.customer).joinedload(Customer.user)).where(ObjectConstruction.id == object_construction_id)
            object_construction = await session.execute(requests_model)
            return object_construction.unique().scalar_one_or_none()

    async def get_object_construction_all(self) -> list[ObjectConstruction]:
        async with self.async_session() as session:
            requests_model = select(ObjectConstruction).options(joinedload(ObjectConstruction.customer),
                                                                joinedload(ObjectConstruction.professions))
            feed_object_construction = await session.execute(requests_model)
            return feed_object_construction.unique().scalars()

    async def update_profile(self, values_data: dict, user_id: int) -> None:
        async with self.async_session() as session:
            if values_data["professions"]:
                for i in values_data["professions"]:
                    await session.add(ProfileProfessions(profile=user_id, profession_id=i["id"]))
            else:
                values_data.pop("professions")
            requests_model = update(Profile).values(**values_data).where(Profile.user_id == user_id).returning(Profile)
            await session.execute(requests_model)
            await session.commit()

    async def update_user(self, values_data: dict, user_id: int) -> None:
        async with self.async_session() as session:
            requests_model = update(User).values(**values_data).where(User.id == user_id)
            await session.execute(requests_model)
            await session.commit()

    async def update_customer(self, values_data: dict, customer_id: int) -> None:
        async with self.async_session() as session:
            requests_model = update(Customer).values(**values_data).where(Customer.user_id == customer_id)
            await session.execute(requests_model)
            await session.commit()

    async def create_profile_object_construction(self, user_id: int, object_construction_id: int):
        async with self.async_session() as session:
            requests_model = update(Profile).values(object_construction_id=object_construction_id).where(Profile.user_id == user_id)
            await session.execute(requests_model)
            await session.commit()

    async def clear_models(self) -> None:
        async with self.db.engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)
            await conn.run_sync(Base.metadata.create_all)

    async def init_models(self) -> None:
        async with self.db.engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)


model_manager = ManagerDB(db_url="postgresql+asyncpg://root:root@localhost:5437/hackaton_db")
