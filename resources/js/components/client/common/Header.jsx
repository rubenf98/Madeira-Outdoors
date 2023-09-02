import React, { useEffect } from 'react'
import styled from "styled-components";
import { dimensions } from '../../../helper';
import Navbar from './Navbar';
import Menu from './Menu';

const Container = styled.section`
    width: 100%;
    min-height: 70vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        color: white;
        font-size: clamp(36px, 5vw, 90px);
        text-align: center;
        margin: auto;
        line-height: 100%;
    }

    .button-container {
        margin: 5px 0px ;
    }

    @media (max-width: ${dimensions.md}) {
        br {
            width: 70%;
            display: none;
        }
    }

`;

const Background = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    filter: brightness(.7);
`;

function Header({ text }) {
    return (
        <Container>
            <div>
                <h1>{text}</h1>
                <Background src="/images/homepage/wallpaper_1920.jpg" />

                <Navbar />
                <Menu />
            </div>
        </Container>
    )
}

export default Header