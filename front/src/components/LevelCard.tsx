import { IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonText, IonLabel, IonGrid, IonRow, IonCol, IonImg } from "@ionic/react";
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import styled from "styled-components";

const Card = styled(IonCard)`
    --background: white;
`

export default function LevelCard(props: any) {
    const { photos, takePhoto } = usePhotoGallery();

    return (
        <Card className="ion-padding">
            <IonCardHeader>
                <IonCardTitle>Текущий уровень: {props.level}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonText>Для повышения уровня Вы можете пройти повышение квалификации, чаще выходить на смены, а также получать хорошие отзывы.</IonText>
                <IonLabel>Ваши дипломы:</IonLabel>
                <IonGrid>
                    <IonRow>
                    {photos.map((photo, index) => (
                        <IonCol size="3" key={photo.filepath}>
                        <IonImg src={photo.webviewPath} />
                        </IonCol>
                    ))}
                    </IonRow>
                </IonGrid>
            </IonCardContent>
            <IonButton expand="block" onClick={() => takePhoto()}>Загрузить фото диплома</IonButton>
        </Card>
    )
}