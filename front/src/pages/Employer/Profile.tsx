import { IonLabel, IonContent, IonHeader, IonMenu, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonIcon, useIonRouter, IonMenuToggle, IonButton } from "@ionic/react"
import { build, exit, home, personAdd, refreshCircle } from "ionicons/icons"


import ProfileCard from "./../../components/ProfileCard";
import { useEffect, useState } from "react";
import { CustomerController } from "../../API/Endpoint";
import { Preferences } from "@capacitor/preferences";

export default function Profile() {

    const logOut = async () => {
        await Preferences.remove({key: "api_key"});
        nav.push("/reg", "root");
    };

    const [customer, setCustomer] = useState<any>({id: -1, firstName: "", lastName: "", secondName: "", email: "", objects: []});
    const nav = useIonRouter();

    const goToObjects = () => {
        nav.push("/employer/builder_projects");
    };

    useEffect(() => {
        const f = async ()=>{
            const customerData = await CustomerController.getMe();
            console.log(customerData);
            
            setCustomer({
                id: customerData.id,
                firstName: customerData.first_name,
                lastName: customerData.surname,
                secondName: customerData.second_name,
                email: customerData.email,
                objects: customerData.object_constructions.map((object: any) => {
                    return {
                        id: object.id,
                        workName: object.work_name,
                        price: object.price,
                        workDescription: object.work_description,
                        availableVacancies: object.available_vacancies,
                        professions: object.professions.map((profession: any) => {
                            return {
                                id: profession.id,
                                professionName: profession.profession_name
                            };
                        })
                    };
                })
            });
        }
        f();
    }, []);

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
                            <IonItem style={{"cursor": "pointer"}} onClick={goToObjects}>
                                <IonIcon aria-hidden="true" icon={home} slot="start" />
                                <IonLabel>Объекты</IonLabel>
                            </IonItem>
                            <IonItem style={{"cursor": "pointer"}} onClick={logOut}>
                                <IonIcon icon={exit} slot="start"></IonIcon>
                                <IonLabel>Выйти</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
            </IonMenu>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Профиль</IonTitle>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent id="main-content" fullscreen>
                    <ProfileCard user={customer}></ProfileCard>
                </IonContent>
            </IonPage>
        </>
    )
}