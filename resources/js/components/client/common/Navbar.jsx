import React from 'react'
import styled, { css } from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 30px 5px 30px;
    box-sizing: border-box;
    width: 100%;
    left: 0px;
    top: 0px;
    position: absolute;
    color: white;
    text-transform: uppercase;

    .logo {
        width: 150px;
    }

    .language {
        .ant-select-selector, svg { 
            color: white;
        }
    }
`;


function Navbar() {
    return (
        <Container>
            <img className="logo" alt="logo" src="/images/logo.png" />


        </Container>
    )
}

export default Navbar