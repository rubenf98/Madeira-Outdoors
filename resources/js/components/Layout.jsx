import React, { useEffect } from "react";
import styled from "styled-components";
import ScrollToTop from "./helpers/ScrollToTop";
import ThemeContainer from "./helpers/ThemeContainer";
import { setCookiesVisibility } from "../redux/application/actions";
import { connect } from "react-redux";
import CookiesModal from "./client/sections/CookiesModal";
import MenuDrawer from "./client/common/MenuDrawer";

const Container = styled.div`
    width: 100%;
    min-height: 100%;
    margin: auto;
    display: block;
    position: relative;
    box-sizing: border-box;
`;

const Cookies = styled.div`
    position: fixed;
    bottom: 35px;
    left: 35px;
    width: 50px; height: 50px; border-radius: 50px;
    background-color: ${({ theme }) => theme.primary};
    display: ${props => props.enable ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    transition: all .3s ease;
    cursor: pointer;

    img {
        width: 30px;
        height: 30px;
    }

    &:hover {
        background-color: ${({ theme }) => theme.primaryHover};
    }
`;

export const Layout = (props) => {

    return (
        <ThemeContainer>
            <CookiesModal />
            <ScrollToTop>
                <Container>
                    <div> {props.children} </div>
                    <MenuDrawer />
                    <Cookies enable={props.enable} onClick={() => props.setCookiesVisibility(true)}><img src="/images/icons/cookies.svg" alt="cookies" /></Cookies>
                </Container>
            </ScrollToTop>
        </ThemeContainer>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCookiesVisibility: (state) => dispatch(setCookiesVisibility(state)),
    };
};

export default connect(null, mapDispatchToProps)(Layout);
