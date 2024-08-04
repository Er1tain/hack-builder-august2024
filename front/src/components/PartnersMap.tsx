import { IonCardContent, IonCard } from "@ionic/react";

import styled from "styled-components";

const MapFrame = styled.iframe`
    width: 100%;
`

export default function PartnerMap() {
    return (
        <IonCard>
            <IonCardContent>
                <MapFrame src="https://yandex.ru/map-widget/v1/?um=constructor%3A39780d8766c0e704746b601773cdf42fcd031ce0fd7e43967fa61fe598c656df&amp;source=constructor" width="400" height="400"></MapFrame>
            </IonCardContent>
        </IonCard>
    )
}