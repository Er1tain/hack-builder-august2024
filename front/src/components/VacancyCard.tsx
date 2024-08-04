import { useContext, useEffect } from "react";
import { IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonCardSubtitle, IonList, IonListHeader, IonLabel, IonItem, IonText, IonChip, IonButton, useIonRouter } from "@ionic/react"
import styled from "styled-components";
import { ClientController, CustomerController } from "../API/Endpoint";
import { Title } from "../styles/pages/Auth_and_Reg";

const StyledCard = styled(IonCard)`
    width: 100%;
    --background: white;
`
const StyledItem = styled.div`
    flex-wrap: wrap;
    display: flex;
`

const Item = styled(IonItem)`
    --background: white;
`
const List = styled(IonList)`
    --background: white;
`

export default function VacancyCard(props: any) {
    const nav = useIonRouter();
    const buttonHandler = (objectId: number) => {
        if (!props.isAssigned && !props.isOwnedByConsumer) {
            ClientController.postGetWork(objectId);
            nav.push("/worker/profile");
        } else if (props.isOwnedByConsumer) {
            CustomerController.deleteObject(objectId);
            nav.push("/employer/profile");
        } else if (props.isAssigned) {
            ClientController.deleteWork(objectId);
            location.reload();
            nav.push("/worker/tasks");
        }
    };

    return (
        <StyledCard className="ion-padding">
            <Title>Текущая задача:</Title>

            <IonCardHeader>
                <IonCardSubtitle>Оплата: {props.data.price} руб.</IonCardSubtitle>
                <IonCardTitle>{props.data.workName}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <List>
                    <Item>
                        <IonText>Описание: {props.data.workDescription}</IonText>
                    </Item>
                    <Item>
                        <IonText> Доступных мест: {props.data.availableVacancies}</IonText>
                    </Item>
                    
                        <Item>
                            Требуемые профессии:
                        </Item>
                   
                    <StyledItem className="ion-wrap">
                        {props.data.professions.map((profession: any) => (
                            <IonChip>{profession.professionName}</IonChip>
                        ))}
                    </StyledItem>
                    {props.isOwnedByConsumer && 
                        <IonItem>
                            <IonButton id={"modal-id-" + props.data.id} expand="block" fill="outline">Просмотреть рабочих</IonButton>
                        </IonItem>
                    }
                </List>
            </IonCardContent>
            <IonButton onClick={() => {buttonHandler(props.data.id)}} expand="block" disabled={props.doDisable}>{(props.isAssigned || props.isOwnedByConsumer) ? 'Отменить' : 'Откликнуться'}</IonButton>
            
        </StyledCard>
    )
}