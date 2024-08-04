import { IonButton, IonCard, IonContent, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { text } from "ionicons/icons";
import styled from "styled-components";

export const Page = styled(IonPage)`
    width: 100%;
    height: 100%;
    --ion-background-color: #1F3040;
`
export const Wrapper = styled.div`
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media screen and (width > 500px) {
        max-width: 500px;
    }
`

export const Card = styled(IonCard)`
    --ion-background-color: white;
`
 
export const InButton = styled(IonButton)`
    --background: #E892D7;
`

export const Title = styled(IonTitle)`
    display: flex;
    flex-direction: row;
    --color: #E892D7
`