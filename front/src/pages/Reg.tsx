
import React, { useRef, useState } from "react";
import { IonButton, IonContent, IonInput, IonList, IonPage,IonHeader, IonToolbar, IonTitle, IonCard, IonItem, IonSelect, IonSelectOption, useIonRouter, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/react";
import styled from "styled-components";
import {AuthController,  ClientController } from "../API/Endpoint";
import { Card, InButton, Title, Wrapper } from "../styles/pages/Auth_and_Reg";
import Lights from "../styles/components/lights";
import {Page} from "../styles/pages/Auth_and_Reg";
export default function Reg() {
    const nav = useIonRouter();
    const goToAuth = ()=>nav.push('/auth');

    const registerButtonHandler = async () => {
        try {
            await AuthController.Reg(
                values.firstName.current!.value!.toString(), values.lastName.current!.value!.toString(), values.middleName.current!.value!.toString(), values.email.current!.value!.toString(), values.password.current!.value!.toString(), values.role.current!.value == "worker" ? true : false 
            );
        } catch (ex) {
            console.log(ex);
            return;
        }
        if (values.role.current!.value == "worker") {
            nav.push("/worker/profile");
        } else {
            nav.push("employer/profile");
        }
        
    };
    const [values, setValues] = useState({
        firstName: useRef<HTMLIonInputElement>(null), 
        lastName: useRef<HTMLIonInputElement>(null), 
        middleName: useRef<HTMLIonInputElement>(null),
        email: useRef<HTMLIonInputElement>(null),
        password: useRef<HTMLIonInputElement>(null),
        passwordRepeat: useRef<HTMLIonInputElement>(null),
        role: useRef<HTMLIonSelectElement>(null)
    });

    const registerButton = useRef<HTMLIonButtonElement>(null);

    const onChangeCheck = (ev: any) => {
        if (!!values.firstName.current?.value && !!values.lastName.current?.value && !!values.middleName.current?.value && !!values.email.current?.value && !!values.password.current?.value && !!values.passwordRepeat.current?.value && !!values.role.current?.value) {
            if (values.password.current?.value == values.passwordRepeat.current?.value) {
                registerButton.current!.disabled = false;
                return;
            }
            registerButton.current!.disabled = true;
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
            <IonContent fullscreen>
                <Wrapper>
                    <Card>
                        <IonCardHeader>
                            <IonCardTitle>Регистрация</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonList>
                                <IonItem>
                                    <IonInput ref={values.firstName} name="firstName" onInput={onChangeCheck} label="Фамилия" labelPlacement="floating" type="text"></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput ref={values.lastName} name="lastName" onInput={onChangeCheck} labelPlacement="floating" label="Имя" type="text"></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput ref={values.middleName} name="middleName" onInput={onChangeCheck} labelPlacement="floating" label="Отчество" type="text"></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput ref={values.email} name="email" onInput={onChangeCheck} labelPlacement="floating" label="Почта" type="email"></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput ref={values.password} name="password" onInput={onChangeCheck} labelPlacement="floating" label="Пароль" type="password"></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput ref={values.passwordRepeat} name="passwordRepeat" onInput={onChangeCheck} labelPlacement="floating" label="Повторите пароль" type="password"></IonInput>
                                </IonItem>
                                <IonItem className="ion-margin-bottom">
                                    <IonSelect ref={values.role} name="role" label="Ваша роль" labelPlacement="floating" onIonChange={onChangeCheck}>
                                        <IonSelectOption value='worker'>Рабочий</IonSelectOption>
                                        <IonSelectOption value='employer'>Работодатель</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonList>
                        </IonCardContent>
                        <IonButton fill="outline" expand="block" onClick={goToAuth}>У меня есть аккант</IonButton>
                        <InButton ref={registerButton} expand="block" disabled onClick={registerButtonHandler}>Зарегистрироваться</InButton>
                    </Card>
                    </Wrapper>
            </IonContent>
        </Page>
    )
}