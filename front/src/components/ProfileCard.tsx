import { IonCard, IonCardTitle, IonAvatar, IonCardContent, IonList, IonItem, IonInput, IonTextarea, IonButton } from "@ionic/react"
import { useEffect, useRef, useState } from "react";


import styled from "styled-components";
import { ClientController } from "../API/Endpoint";

const ProfileCardTitle = styled(IonCardTitle)`
    display: flex;
`

export default function ProfileCard(props: any) {
    const [values, setValues] = useState({
        aboutMe: useRef<HTMLIonInputElement>(null), 
        tel: useRef<HTMLIonInputElement>(null)
    });

    const [saveButton, setSaveButton] = useState(useRef<HTMLIonButtonElement>(null));

    const buttonHandler = () => {
        const aboutMeValue = values.aboutMe.current!.value?.toString();
        const telValue = values.tel.current!.value?.toString();
        console.log(props.user);
        ClientController.putMe(props.user.firstName, props.user.lastName, props.user.middleName, props.user.email, props.user.level, telValue!, aboutMeValue!);
        saveButton.current!.disabled = true;
    };

    const onChangeCheck = () => {
        console.log(props.user);
        if ((values.aboutMe.current!.value?.toString() != props.user.aboutMe || values.tel.current!.value?.toString() != props.user.phoneNumber) && (values.aboutMe.current!.value?.toString() != "" || values.tel.current!.value?.toString() != "")) {
            saveButton.current!.disabled = false;
        } else {
            saveButton.current!.disabled = true;
        }
    }

    return (
        <IonCard className="ion-padding-start ion-padding-top">
            <ProfileCardTitle className="ion-align-items-center">
                <IonAvatar className="ion-margin-end">
                    <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
                </IonAvatar>
                {props.user.firstName} {props.user.lastName}
            </ProfileCardTitle>
            <IonCardContent>
                <IonList>
                    <IonItem>
                        <IonInput name="email" type="email" value={props.user.email} label="Email" labelPlacement="stacked" disabled></IonInput>
                    </IonItem>
                    {props.role == "worker" && 
                        <>
                            <IonItem>
                                <IonInput onIonInput={onChangeCheck} ref={values.aboutMe} name="aboutMe" label="О себе" labelPlacement="stacked" value={props.user.aboutMe}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput onIonInput={onChangeCheck} ref={values.tel} name="tel" type="tel" value={props.user.phoneNumber} label="Phone Number" labelPlacement="stacked"></IonInput>
                            </IonItem>
                        </>
                    }
                </IonList>
                {props.role == "worker" && <IonButton ref={saveButton} onClick={buttonHandler} disabled>Сохранить</IonButton>}
            </IonCardContent>
        </IonCard>
    )
}