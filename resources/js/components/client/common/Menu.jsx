import React from 'react'
import styled, { css } from "styled-components";
import { handleMenu } from '../../../redux/application/actions';
import { connect } from "react-redux";
import { dimensions } from '../../../helper';

const Container = styled.div`
    display: flex;
    align-items: center;
    left: 30px;
    top: 50%;
    position: absolute;
    cursor: pointer;

    h3 {
        transform: rotate(-90deg);
        color: white;
        text-transform: uppercase;
        margin: -10px;
    }

    img {
        width: 20px;
    }

    @media (max-width: ${dimensions.md}) {
        left: auto;
        right: 10px;
        top: 10px;

        h3 {
            display: none;
        }
    }
`;

function Menu(props) {
    return (
        <Container onClick={() => props.handleMenu(true)}>
            <h3>menu</h3>
            <img src="/icons/menu.svg" alt="menu" />
        </Container>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleMenu: (state) => dispatch(handleMenu(state)),
    };
};

export default connect(null, mapDispatchToProps)(Menu);