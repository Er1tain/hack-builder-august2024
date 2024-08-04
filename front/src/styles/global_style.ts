import { createGlobalStyle } from "styled-components";
import RobotoFlex from '../assets/fonts/RobotoFlex-Regular.ttf';

export const global_style = createGlobalStyle`
    @font-face {
        font-family: "RobotoFlex";
        src: url(${RobotoFlex})
    }
`