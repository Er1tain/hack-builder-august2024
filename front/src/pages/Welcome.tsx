import { IonButton, IonPage, IonText, useIonRouter } from "@ionic/react";
import { Page, Text } from "../styles/pages/Welcome2.0";
import { useEffect } from "react";

export default function Welcome() {
    const nav = useIonRouter();

    useEffect(()=>{
        setTimeout(()=>{
            nav.push('/reg');
            location.reload();
        }, 3500)
    }, [])

    return (
        <Page>
            <Text>
                Work<span style={{color: '#E892D7'}}>Boost</span>
            </Text>
        </Page>
    )
}