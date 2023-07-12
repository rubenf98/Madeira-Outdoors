import React from 'react'
import { connect } from 'react-redux';
import styled from "styled-components";
import { setLanguage } from '../../../redux/application/actions';
import { Tooltip } from "antd";
import { dimensions } from '../../../helper';
import { Link } from 'react-router-dom';

const Container = styled.section`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;

    .logo {
        width: 90px;
    }
`;

const ButtonContainer = styled.div`
    transition: all .3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    
    color: white;

    .language {
        transition: all .3s ease;
        background: ${({ theme }) => theme.primary};
        opacity: .7;
        box-sizing: border-box;
        padding: 12px 16px;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: bold;
    }

    .phone {
        background-color: ${({ theme }) => theme.primary};
        padding: 12px 30px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;

        p {
            margin: 0px;
            font-weight: bold;
        }

        .phone-icon {
            margin-right: 10px;
            width: 15px;
            height: 15px;
        }

        .info {
            margin-left: 25px;
            cursor: pointer;
            width: 15px;
            height: 15px;
        }
        
    }
    @media (max-width: ${dimensions.lg}) {
        font-size: 16px;

        img {
            margin-right: 10px;
            width: 15px;
            height: 15px;
        }
    }
 
`;

function Navbar(props) {

    const handleLanguageChange = (value) => {
        if (props.language == "pt") {
            localStorage.setItem("language", "en");
            props.setLanguage("en");
        } else {
            localStorage.setItem("language", "pt");
            props.setLanguage("pt");
        }
    }


    return (
        <Container>
            <Link to="/"><img className="logo" alt="logo" src="/images/logo.png" /></Link>

            <ButtonContainer>
                <div className='language' onClick={handleLanguageChange}>
                    {props.language}
                </div>
                <div className='phone'>
                    <img className='phone-icon' src="/icon/phone.svg" alt="phone" />
                    <p>+351 911 111 111</p>
                    <Tooltip title="chamada para rede movel nacional">
                        <img className='info' src="/icon/info.svg" alt="info" />
                    </Tooltip>
                </div>
            </ButtonContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLanguage: (state) => dispatch(setLanguage(state)),
    };
};

const mapStateToProps = (state) => {
    return {
        language: state.application.language,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);