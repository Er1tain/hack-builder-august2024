import React, { useEffect, useState } from "react";
import { IonBackButton, IonPage, IonTitle, IonHeader, IonToolbar, IonButtons, IonContent, IonCardContent, IonCard, IonList, IonItem, IonListHeader, IonLabel, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton } from "@ionic/react";

import VacancyCard from "../../components/VacancyCard";
import { ClientController } from "../../API/Endpoint";

export default function WorkerTasks() {
    const [isAssigned, setIsAssigned] = useState<boolean>(false);
    const [vacancies, setVacancies] = useState<any[]>([]);

    useEffect(() => {
        const f = async () => {
            const clientData = await ClientController.getMe();
            if (!!(clientData!.object_construction)) {
                setIsAssigned(true);
            }
            const vacanciesData = await ClientController.getFeedObjects();
            setVacancies(vacanciesData.objects_constructions.map((object:any) => {
                return {
                    id: object.id, 
                    workName: object.work_name, 
                    price: object.price, 
                    workDescription: object.work_description,
                    availableVacancies: object.available_vacancies,
                    professions: object.professions.map((profession: any) => {
                        return {id: profession.id,
                        professionName: profession.profession_name};
                    })
                };
            }))
        };
        f();
    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Доступные вакансии</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {vacancies.map((vacancy) => (
                        <IonItem>
                            <VacancyCard doDisable={isAssigned} data={vacancy}></VacancyCard>
                        </IonItem>
                    ))} 
                </IonList>
            </IonContent>
        </IonPage>
    )
}