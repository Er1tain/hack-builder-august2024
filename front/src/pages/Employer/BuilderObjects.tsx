import React, { Ref, useEffect, useRef, useState } from "react";
import { IonBackButton, IonPage, IonTitle, IonHeader, IonToolbar, IonButtons, IonContent, IonList, IonItem, IonLabel, IonModal, IonIcon, IonFab, IonFabButton, IonInput, IonSelect, IonSelectOption, IonButton } from "@ionic/react";

import VacancyCard from "../../components/VacancyCard";

import { person, add, refreshCircle } from "ionicons/icons";
import { CustomerController, ProfessionController } from "../../API/Endpoint";

export default function BuilderObjects() {
    const [isOpen, setIsOpen] = useState(false);

    const modal = useRef<HTMLIonModalElement>(null);
    const [customer, setCustomer] = useState<any>({id: -1, firstName: "", lastName: "", secondName: "", email: "", objects: []});
    const [allProfessions, setAllProfessions] = useState<any[]>([]);

    const pageRef = useRef<any>(null);
    const loadData = async ()=>{
        const allProfessionsData = await ProfessionController.getAll();

        const customerData = await CustomerController.getMe();
        
        const newCustomer = {
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
        };
        for (const key in newCustomer.objects) {
            if (Object.prototype.hasOwnProperty.call(newCustomer.objects, key)) {
                const element = newCustomer.objects[key];
                const objectData = await CustomerController.getObjectInfo(element.id);
                newCustomer.objects[key].workers = objectData.workers.map((worker: any) => {
                    return {
                        id: worker.id,
                        firstName: worker.first_name,
                        surname: worker.surname,
                        secondName: worker.second_name,
                        email: worker.email
                    };
                });
            }
        }
        setAllProfessions(allProfessionsData.professions.map((professionData: any) => {
            return {id: professionData.id, professionName: professionData.profession_name};
        }));
        setCustomer(newCustomer);
    };

    useEffect(() => {
        loadData();
    }, []);

    const [values, setValues] = useState({
        objectName: useRef<HTMLIonInputElement>(null), 
        objectDescription: useRef<HTMLIonInputElement>(null), 
        availableVacancies: useRef<HTMLIonInputElement>(null),
        price: useRef<HTMLIonInputElement>(null),
        professions: useRef<HTMLIonSelectElement>(null)
    });

    const createObjectHandler = async () => {
        setIsOpen(false);
        await CustomerController.createObject(
            values.objectName.current!.value!.toString(),
            values.objectDescription.current!.value!.toString(),
            parseInt(values.price.current!.value!.toString()),
            parseInt(values.availableVacancies.current!.value!.toString()),
            values.professions.current!.value.map((profession: string) => {
                return {
                    id: profession.split('|')[0],
                    professionName: profession.split('')[1]
                };
            })
        );
        loadData();
    };

    const createButton = useRef<HTMLIonButtonElement>(null);

    const onChangeCheck = (ev: any) => {
        if (!!values.objectName.current?.value && !!values.objectDescription.current?.value && !!values.availableVacancies.current?.value && !!values.price.current?.value && !!values.professions.current?.value) {
            createButton.current!.disabled = false;
            return;
        }
        createButton.current!.disabled = true;
        return;
    }

    return (
        <IonPage ref={pageRef}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Активные Объекты</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {customer.objects.map((object: any) => (
                        <IonItem>
                            <VacancyCard data={object} isOwnedByConsumer={true}></VacancyCard>
                        </IonItem>
                    ))} 
                </IonList>
                <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton id="create-object-modal" onClick={() => (setIsOpen(true))}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>
                {customer.objects.map((object: any) => (
                    <IonModal ref={modal} trigger={"modal-id-" + object.id} initialBreakpoint={0.25} breakpoints={[0, 0.25, 0.5, 0.75]}>
                        <IonContent className="ion-padding">
                            <IonList>
                                {object.workers.map((worker: any) => (
                                    <IonItem>
                                        <IonIcon icon={person} />
                                        <IonLabel>
                                            {worker.firstName} {worker.surname}
                                        </IonLabel>
                                    </IonItem>
                                ))}
                            </IonList>
                        </IonContent>
                    </IonModal>
                ))}
                <IonModal isOpen={isOpen} ref={modal} trigger="create-object-modal" initialBreakpoint={0.75} breakpoints={[0, 0.25, 0.5, 0.75, 1.0]}>
                    <IonContent className="ion-padding">
                        <IonList>
                            <IonHeader>
                                <IonTitle className="ion-text-center ion-padding">
                                    Создать Объект
                                </IonTitle>
                            </IonHeader>
                            <IonItem>
                                <IonInput onInput={onChangeCheck} ref={values.objectName} label="Название Объекта" labelPlacement="floating" type="text" />
                            </IonItem>
                            <IonItem>
                                <IonInput onInput={onChangeCheck} ref={values.objectDescription} label="Описание" labelPlacement="floating" type="text" />
                            </IonItem>
                            <IonItem>
                                <IonInput onInput={onChangeCheck} ref={values.availableVacancies} label="Число Рабочих" labelPlacement="floating" type="number" />
                            </IonItem>
                            <IonItem>
                                <IonInput onInput={onChangeCheck} ref={values.price} label="Оклад" labelPlacement="floating" type="number" />
                            </IonItem>
                            <IonItem>
                                <IonSelect onIonChange={onChangeCheck} ref={values.professions} label="Необходимые специалисты" labelPlacement="floating" multiple={true}>
                                    {allProfessions.map((profession: any) => (
                                        <IonSelectOption value={profession.id + "|" + profession.professionName}>{profession.professionName}</IonSelectOption>
                                    ))}
                                </IonSelect>
                            </IonItem>
                        </IonList>
                        <IonButton ref={createButton} disabled expand="block" onClick={createObjectHandler}>Создать</IonButton>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    )
}