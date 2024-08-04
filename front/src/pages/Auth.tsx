import React, { useRef, useState } from "react";
import styled from "styled-components";
import { IonButton, IonContent, IonInput, IonList, IonPage,IonHeader, IonToolbar, IonTitle, IonCard, IonItem, IonCardHeader, IonCardContent, useIonRouter, IonCardTitle } from "@ionic/react";
import {AuthController} from "../API/Endpoint";
import { Card, InButton, Page, Title, Wrapper } from "../styles/pages/Auth_and_Reg";
import Lights from "../styles/components/lights";

export default function Auth() {
    const nav = useIonRouter();
    const goToReg = ()=>nav.push('/reg');

    const [values, setValues] = useState({
        email: useRef<HTMLIonInputElement>(null), 
        password: useRef<HTMLIonInputElement>(null)
    });

    const loginButtonHandler = async () => {
        const emailValue = values.email.current!.value!.toString();
        const passwordValue = values.password.current!.value!.toString();

        const loginData = await AuthController.login(emailValue, passwordValue);
        console.log(loginData);
        if (loginData.role) {
            nav.push("/worker/profile");
        } else {
            nav.push("employer/profile");
        }

    }

    const registerButton = useRef<HTMLIonButtonElement>(null);

    const onChangeCheck = (ev: any) => {
        if (!!values.email.current?.value && !!values.password.current?.value) {
            registerButton.current!.disabled = false;
            return;
        }
        registerButton.current!.disabled = true;
        return;
    }

    return (
        <Page>
            <IonHeader>
                <IonToolbar>
                    <Title>
                        <Lights/>
                    </Title>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Wrapper>
                    <Card>
                        <IonCardHeader>
                            <IonCardTitle>
                                Войти
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonList>
                                <IonItem>
                                    <IonInput ref={values.email} label="Почта" labelPlacement="floating" type="email" onInput={onChangeCheck}></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput ref={values.password} label="Пароль" labelPlacement="floating" type="password" onInput={onChangeCheck}></IonInput>
                                </IonItem>
                            </IonList>
                        </IonCardContent>
                    </Card>
                    <IonButton fill="clear" expand="block" onClick={goToReg}>Зарегистрироваться</IonButton>
                    <IonButton ref={registerButton} expand="block" onClick={loginButtonHandler}>Войти</IonButton>
                    </Wrapper>
            </IonContent>
        </Page>
    )
}