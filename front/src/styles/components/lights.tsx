import styled from "styled-components"

const Block = styled.div`
    display: flex;
    flex-direction: row;
    width: max-content;
    gap: 0.2rem
`

const Light = styled.div`
    width: 1rem;
    height: 1rem;
    border-radius: 10px;
`

export default function Lights() {
    return (
       <Block>
        <Light style={{background: '#FA6453'}}/>
        <Light style={{background: '#FEBD41'}}/>
        <Light style={{background: '#28C245'}}/>
       </Block>
    )

}