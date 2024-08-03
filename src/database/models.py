from sqlalchemy.orm import declarative_base, mapped_column, Mapped, relationship
from sqlalchemy import String, Text, ForeignKey, Integer, Boolean
from typing_extensions import Annotated

Base = declarative_base()

obj_id = Annotated[int, mapped_column(primary_key=True, autoincrement=True)]


class User(Base):
    __tablename__ = "profile"
    id: Mapped[obj_id]
    first_name: Mapped[str] = mapped_column(String(30), nullable=False)
    surname: Mapped[str] = mapped_column(String(30), nullable=False)
    second_name: Mapped[str] = mapped_column(String(30), nullable=False)
    password: Mapped[str] = mapped_column(Text(), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(225), nullable=False, unique=True)
    api_key: Mapped[str] = mapped_column(Text(), nullable=False, unique=True)
    role: Mapped[bool] = mapped_column(Boolean, default=False)
    profile: Mapped["Profile"] = relationship(back_populates="user", uselist=False)
    customer: Mapped["Customer"] = relationship(back_populates="user", uselist=False)


class Profile(Base):
    __tablename__ = "profile_info"
    id: Mapped[obj_id]
    user_id: Mapped[int] = mapped_column(ForeignKey("profile.id", ondelete="CASCADE"))
    grade_up: Mapped[int] = mapped_column(Integer, default=0)
    phone_number: Mapped[str | None] = mapped_column(String(10), nullable=True)
    about_me: Mapped[str | None] = mapped_column(Text(), nullable=True)
    object_construction_id: Mapped[int | None] = mapped_column(ForeignKey("object_construction.id", ondelete="CASCADE"), nullable=True)
    professions: Mapped[list["Professions"]] = relationship(back_populates="profiles", secondary="profile_professions")
    user: Mapped["User"] = relationship(back_populates="profile", uselist=False)
    object_construction: Mapped["ObjectConstruction"] = relationship(back_populates="workers")


class Customer(Base):
    __tablename__ = "customer"
    id: Mapped[obj_id]
    user_id: Mapped[int] = mapped_column(ForeignKey("profile.id", ondelete="CASCADE"))
    company_name: Mapped[str | None] = mapped_column(String(60), nullable=True, unique=True)
    company_description: Mapped[str | None] = mapped_column(Text(), nullable=True)
    object_constructions: Mapped[list["ObjectConstruction"]] = relationship(back_populates="customer")
    user: Mapped["User"] = relationship(back_populates="customer", uselist=False)


class ObjectConstruction(Base):
    __tablename__ = "object_construction"
    id: Mapped[obj_id]
    customer_id: Mapped[int] = mapped_column(ForeignKey("customer.id", ondelete="CASCADE"))
    work_name: Mapped[str] = mapped_column(String(100), nullable=False)
    work_description: Mapped[str] = mapped_column(Text(), nullable=False)
    price: Mapped[int] = mapped_column(Integer())
    available_vacancies: Mapped[int] = mapped_column(Integer())
    customer: Mapped["Customer"] = relationship(back_populates="object_constructions")
    workers: Mapped[list["Profile"]] = relationship(back_populates="object_construction")
    professions: Mapped[list["Professions"]] = relationship(back_populates="object_constructions", secondary="object_construction_professions")


class Professions(Base):
    __tablename__ = "professions"
    id: Mapped[obj_id]
    profession_name: Mapped[str] = mapped_column(String(50))
    object_constructions: Mapped[list["ObjectConstruction"]] = relationship(back_populates="professions", secondary="object_construction_professions")
    profiles: Mapped[list["Profile"]] = relationship("Profile", back_populates="professions", secondary="profile_professions")


class ObjectConstructionProfessions(Base):
    __tablename__ = "object_construction_professions"
    object_construction_id: Mapped[int] = mapped_column(ForeignKey("object_construction.id", ondelete="CASCADE"), primary_key=True)
    profession_id: Mapped[int] = mapped_column(ForeignKey("professions.id", ondelete="CASCADE"), primary_key=True)


class ProfileProfessions(Base):
    __tablename__ = "profile_professions"
    profile_id: Mapped[int] = mapped_column(ForeignKey("profile_info.id", ondelete="CASCADE"), primary_key=True)
    profession_id: Mapped[int] = mapped_column(ForeignKey("professions.id", ondelete="CASCADE"), primary_key=True)



