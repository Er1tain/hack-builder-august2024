import { IonBackButton, IonPage, IonTitle, IonHeader, IonToolbar, IonButtons, IonContent, IonList, IonItem, IonListHeader, IonLabel } from "@ionic/react";

import PartnerMap from "../../components/PartnersMap";
import EducationalCourseCard from "../../components/EducationalCourseCard";
import { Page } from "../../styles/pages/Page";
import { Title } from "../../styles/pages/Map";



const courses = [
    {
        id: 0,
        name: "Курс \"Электромонтер\"",
        address: "г. Краснодар, ул. Красная, д. 23",
        organisation: "Учебный центр НЦПО",
        duration: "от 1 месяца",
        price: "6 500",
        phoneNumber: "8 (800)-000 80 80"
    },
    {
        id: 1,
        name: "Курс \"Капитальные работы\"",
        address: "г. Краснодар, ул. Садовая, д. 117",
        organisation: "Институт профессионального образования",
        duration: "9 месяцев",
        price: "29 900",
        phoneNumber: "8 (800)-000 80 80"
    },
    {
        id: 2,
        name: "Курс \"Сварщик\"",
        address: "г. Краснодар, ул. Петра Метальникова, д. 2",
        organisation: "Учебный центр НЦПО",
        duration: "от 1 месяца",
        price: "6 500",
        phoneNumber: "8 (800)-000 80 80"
    },
    {
        id: 3,
        name: "Курс \"Сметное дело\"",
        address: "г. Краснодар, ул. Ставропольская, д. 88",
        organisation: "Академия непрерывного образования",
        duration: "1 месяц",
        price: "9 800",
        phoneNumber: "8 (800)-000 80 80"
    },
    {
        id: 4,
        name: "Курс \"Повышение квалификации строителей\"",
        address: "г. Краснодар, ул. Октябрьская, д. 247",
        organisation: "Межрегиональный центр дополнительного профессионального образования",
        duration: "от 9 дней",
        price: "4 000",
        phoneNumber: "8 (800)-000 80 80"
    },
]

export default function MapOfPartners() {
    return (
        <Page>
            <IonHeader>
                <IonToolbar>
                    <Title>Карта партнеров</Title>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <PartnerMap></PartnerMap>
                <IonList>
                    {courses.map((course) => (
                        <IonItem>
                            <EducationalCourseCard
                                id={course.id} 
                                name={course.name}
                                address={course.address}
                                organisation={course.organisation}
                                duration={course.duration}
                                price={course.price}
                                phoneNumber={course.phoneNumber}
                            ></EducationalCourseCard>
                        </IonItem>
                    ))} 
                </IonList>
            </IonContent>
        </Page>
    )
}