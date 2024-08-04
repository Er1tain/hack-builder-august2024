import {view} from '../assets/images/godbutton.svg';
import styled from 'styled-components';

// const Image = styled.img`
//     width: 17rem;
// `

const Button = styled.div`
    background-image: ${view};
    width: 10rem;
`

export default function GodButton(/*props :{url: string}*/) {
    return (
        <Button/>
    )
}