import React, { createContext, useEffect, useLayoutEffect, useState } from "react";
import { IonLabel, IonContent, IonHeader, IonMenu, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonMenuButton, IonCard, IonCardTitle, IonAvatar, IonCardContent, IonList, IonItem, IonIcon, IonChip, useIonRouter, IonMenuToggle, IonCardHeader, IonCardSubtitle } from "@ionic/react"
import { map, build, home, personAdd, star, refresh, lockClosed, exit } from "ionicons/icons"
import { ClientController, ProfessionController } from "../../API/Endpoint";

import styled from "styled-components";

import ProfileCard from "./../../components/ProfileCard";
import VacancyCard from "./../../components/VacancyCard";
import LevelCard from "../../components/LevelCard";
import { User } from "../../API/types/payload/User";
import { Preferences } from "@capacitor/preferences";
import { Page } from "../../styles/pages/Page";
import Lights from "../../styles/components/lights";
import { Toolbar } from "../../styles/pages/WorkerProfile";

const Card = styled(IonCard)`
    --background: white;
`

export default function Profile() {

    const logOut = async () => {
        await Preferences.remove({key: "api_key"});
        nav.push("/reg", "root");
    };

    const [user, setUser] = useState<any>({id: -1, firstName: "", lastName: "", email: "", level: 0, activeObject: {id: -1, workName: "", price: 0, workDescription: "", availableVacancies: 0, professions: []}, professions: []});
    const [allProfessions, setAllProfessions] = useState<any[]>([]);

    const loadData = async() => {
        const clientData = await ClientController.getMe();
        const allProfessionsData = await ProfessionController.getAll();
        
        setUser({
            id: clientData!.id, 
            firstName: clientData!.first_name, 
            lastName: clientData!.surname,
            middleName: clientData!.second_name,
            email: clientData!.email, 
            level: clientData!.grade_up,
            aboutMe: clientData!.about_me,
            phoneNumber: clientData!.phone_number,
            activeObject: clientData.object_construction === null ? null : {
                id: clientData!.object_construction!.id, 
                workName: clientData!.object_construction!.work_name, 
                price: clientData!.object_construction!.price, 
                workDescription: clientData!.object_construction!.work_description, 
                availableVacancies: clientData!.object_construction!.available_vacancies, 
                professions: clientData!.object_construction!.professions.map((profession: any) => {
                    return {
                        id: profession.id,
                        professionName: profession.profession_name
                    };
                })
            }, 
            professions: clientData!.professions.map((profession: any) => {
                return {
                    id: profession.id,
                    professionName: profession.profession_name
                }
            })
        });
        console.log(user);
        setAllProfessions(allProfessionsData.professions.map((professionData: any) => {
            return {id: professionData.id, professionName: professionData.profession_name};
        }));
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleProffesionSwitch = function (ev: any, professionId: number) {
        if (ev.target.color === 'dark') {
            ev.target.color = 'default';
            ClientController.deleteProfession(professionId);
        } else {
            ev.target.color = 'dark';
            ClientController.postProfession(professionId);
        }
        
    }
    const nav = useIonRouter();

    const goToMap = ()=>{
        nav.push('/worker/map_of_partners');
    }

    const goToVacancies = () => {
        nav.push('/worker/tasks');
    }

    return (
        <>
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Меню</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonMenuToggle>
                            <IonItem style={{"cursor": "pointer"}} onClick={user.level > 1 ? goToMap : undefined}>
                                <IonIcon aria-hidden="true" icon={map} slot="start" />
                                <IonLabel>Карта Партнеров</IonLabel>
                                {(user.level < 2) &&
                                    <IonIcon icon={lockClosed} slot="end"/>
                                }
                            </IonItem>
                            <IonItem style={{"cursor": "pointer"}} onClick={goToVacancies}>
                                <IonIcon aria-hidden="true" icon={personAdd} slot="start" />
                                <IonLabel>Вакансии</IonLabel>
                            </IonItem>
                            <IonItem style={{"cursor": "pointer"}} onClick={logOut}>
                                <IonIcon icon={exit} slot="start"></IonIcon>
                                <IonLabel>Выйти</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
            </IonMenu>
            <Page>
                <IonHeader>
                    <Toolbar>
                        <Lights/>
                        {/* <IonTitle>Профиль</IonTitle> */}
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>

                        <IonButtons slot="end">
                            <IonButton onClick={loadData}><IonIcon icon={refresh}/></IonButton>
                        </IonButtons>
                    </Toolbar>
                </IonHeader>
                <IonContent id="main-content" fullscreen>
                    <ProfileCard role="worker" user={user}></ProfileCard>
                    {user.activeObject && 
                        <>
                            <IonTitle>Текущая задача:</IonTitle>
                            <VacancyCard setUser={setUser} data={user.activeObject} isAssigned={true}></VacancyCard>
                        </>
                    }
                    <Card className="ion-padding">
                        <IonCardHeader>
                            <IonCardTitle>Ваши профессии</IonCardTitle>
                            <IonCardSubtitle>Для изменения нажмите на профессию</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            {allProfessions.map((profession) => (
                                <IonChip onClick={(ev) => handleProffesionSwitch(ev, profession.id)} color={user.professions.map((profession: any) => profession.id).includes(profession.id) ? 'dark' : 'default'}>{profession.professionName}</IonChip>
                            ))}
                        </IonCardContent>
                    </Card>
                    <LevelCard level={user?.level}></LevelCard>
                </IonContent>
            </Page>
        </>
    )
}