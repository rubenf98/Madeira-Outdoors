import styled from "styled-components";
import React from 'react'

const Container = styled.section`
    background: url("/images/dashboard/banner.svg");
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 20vh;
    color: white;
    display: flex;
    align-items: flex-end;

    h1 {
        padding: 0px 0px 40px 40px;
        margin: 0px;
        box-sizing: border-box;
        font-size: 36px;
    }
`;


function Banner({ text }) {
    return (
        <Container><h1>{text}</h1></Container>
    )
}

export default Banner