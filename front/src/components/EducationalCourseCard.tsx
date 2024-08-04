import { IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonAlert } from "@ionic/react";

import styled from "styled-components";

const StyledCard = styled(IonCard)`
    width: 100%;
    --background: white
`

const Button = styled(IonButton)`
    --background: pink;
`

export default function EducationalCourseCard(props: any) {
    return (

        <>
            <StyledCard className="ion-padding">
                <IonCardHeader>
                    <IonCardTitle>{props.name}</IonCardTitle>
                    <IonCardSubtitle>{props.address}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <div>
                        <p>Организация: {props.organisation}</p>
                        <p>Длительность: {props.duration}</p>
                        <p>Стоимость: {props.price} руб.</p>
                    </div>
                </IonCardContent>
                <IonButton id={`alert-${props.id}`} expand="block">Связаться</IonButton>
            </StyledCard>
            <IonAlert 
                trigger={`alert-${props.id}`}
                header={props.organisation}
                message={`Телефон: ${props.phoneNumber}.`}
            />
        </>

    )
}