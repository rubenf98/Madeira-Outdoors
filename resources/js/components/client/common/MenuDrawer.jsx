import React from 'react'
import { Drawer, Select } from "antd";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { handleMenu, setLanguage } from '../../../redux/application/actions';
import { dimensions } from '../../../helper';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background-color: ${({ theme }) => theme.background};
    height: 100%;
    padding: 50px 100px 50px 30px;
    box-sizing: border-box;

    @media (max-width: ${dimensions.md}) {
        padding: 50px 30px;
    }    
`;

const Close = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 30px;

    h3 {
        transform: rotate(-90deg);
        color: #000;
        text-transform: uppercase;
        margin: -10px;
    }

    img {
        width: 14px;
    }

    @media (max-width: ${dimensions.md}) {
        display: none;
    }
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1;
    height: 100%;
`;

const Navbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .language-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
`;

const Social = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    gap: 10px;

    img {
        height: 20px;
    }
`;

const Language = styled.div`
    border-bottom: ${(props) => props.active ? "2px solid " + props.theme.secundary : "0px"};
    transition: all .3s ease;
    cursor: pointer;
`;

const LinksContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex: 1;
    
    a {
        display: block;
    }

    .activities {
        font-size: clamp(22px, 3vw, 36px);
        font-weight: bold;

        a {
            margin: 80px 0px;
            color: ${({ theme }) => theme.primary};
        }
    }

    .pages {
        a {
            margin: 15px 0px;
            color: #000;
            opacity: .8;
            font-size: clamp(16px, 2vw, 18px);
            text-transform: uppercase;
            text-align: right;
        }
    }

    @media (max-width: ${dimensions.md}) {
        flex-wrap: wrap;

        .activities, .pages {
            width: 100%;

            a {
                margin: 20px 0px;
                text-align: left;
            }
            
        }
    }
`;

function MenuDrawer(props) {
    const { text } = require('../../../../assets/' + props.language + "/menu");

    const handleLanguageChange = (value) => {
        localStorage.setItem("language", value);
        props.setLanguage(value)
    }

    return (
        <Drawer
            title=""
            placement="left"
            closable={false}
            onClose={() => props.handleMenu(false)}
            open={props.visible}
            width={960}
            className="menu-modal"
        >
            <Container>
                <Close onClick={() => props.handleMenu(false)}>
                    <h3>{text.button}</h3>
                    <img src="/icons/close.svg" alt="x" />
                </Close>
                <Content>
                    <Navbar>
                        <img src="logo.jpg" alt="logo" />
                        <div className='language-container'>
                            <Language active={props.language === "en"} onClick={() => handleLanguageChange("en")} >EN</Language>
                            <Language active={props.language === "pt"} onClick={() => handleLanguageChange("pt")} >PT</Language>
                        </div>
                    </Navbar>
                    <LinksContainer>
                        <div className='activities'>
                            <Link to={text.links[0].to}>{text.links[0].name}</Link>
                            <Link to={text.links[1].to}>{text.links[1].name}</Link>
                            <Link to={text.links[2].to}>{text.links[2].name}</Link>
                        </div>
                        <div className='pages'>
                            <Link to={text.links[3].to}>{text.links[3].name}</Link>
                            <Link to={text.links[4].to}>{text.links[4].name}</Link>
                            <Link to={text.links[5].to}>{text.links[5].name}</Link>
                        </div>
                    </LinksContainer>
                    <Social>
                        <a><img src="/icons/facebook.svg" alt="facebook" /></a>
                        <a href="https://www.instagram.com/madeira_outdoors/" target='__blank'><img src="/icons/instagram.svg" alt="instagram" /></a>
                        <a><img src="/icons/whatsapp.svg" alt="whatsapp" /></a>
                    </Social>
                </Content>
            </Container>
        </Drawer>
    )
}

const mapStateToProps = (state) => {
    return {
        visible: state.application.menuVisible,
        language: state.application.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleMenu: (state) => dispatch(handleMenu(state)),
        setLanguage: (state) => dispatch(setLanguage(state)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer);