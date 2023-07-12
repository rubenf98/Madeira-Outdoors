import React from 'react'
import styled, { css } from "styled-components";
import { borderRadius, margin, dimensions } from '../../../helper';

const Container = styled.section`
    width: 100%;
    min-height: 100vh;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @media (max-width: ${dimensions.md}) {
        display: block;
    }
`;

const Background = styled.img`
    width: 100%;
    height: 80%;
    object-fit: cover;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;

    @media (max-width: ${dimensions.md}) {
        height: 50%;
        position: relative;
        height: 60vh;
    }
`;

const Arrow = styled.div`
    width: 50%;

    @media (max-width: ${dimensions.md}) {
        display: none;
    }
    
    img {
        width: 30%;
    }
`;

const Content = styled.div`
    width: 50%;

    div {
        width: 80%;
        min-height: 40%;
        border-top-left-radius: ${borderRadius};
        border-top-right-radius: ${borderRadius};
        background-color: ${({ theme }) => theme.background} ;
        padding: 50px 50px 150px 50px;
        box-sizing: border-box;
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;

        div {
            min-height: 50%;
            width: 100%;
            padding: ${margin};
        }
    }
`;

function Banner({ text }) {
    return (
        <Container>
            <Background src="/images/banner.jpg" />
            <Arrow>
                <img src="/images/arrow.svg" />
            </Arrow>

            <Content>
                <div>
                    <h2>{text.title}</h2>
                    <p>{text.description}</p>
                </div>
            </Content>
        </Container>
    )
}

export default Banner