import React, { useState } from "react";
import styled from "styled-components";
import { login, setAuthorizationToken } from "../../redux/auth/actions";
import { dimensions } from "../../helper";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: ${({ theme }) => theme.secundary};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

const Input = styled.input`
    width: 60%;
    box-sizing: border-box;
    margin: 15px 0;
    border: none;
    border-bottom: 2px solid #777;
    padding: 8px;

    &:focus,
    &:active {
        outline: none;
        border: none;
        border-bottom: 2px solid red;
        background-color: white !important;
        appearance: none;
    }

    ::placeholder {
        font-size: 16px;
        display: inline-block;
        margin-left: 10px;
    }
`;

const FormContainer = styled.div`
    z-index: 1;
	position: relative;	
	height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
`;

const Card = styled.div`
    width: 50%;
    max-width: 500px;
    min-width: 120px;
    min-height: 500px;
    display: block;
    padding: 20px;
    background: ${({ theme }) => theme.primary};	
	position: relative;	
    border-radius: 8px;
	box-shadow: 0px 0px 24px #0000005a;

    @media (max-width: ${dimensions.lg}) {
        width: 70%;
    }

    @media (max-width: ${dimensions.md}) {
        width: 90%;
    }

    @media (max-width: ${dimensions.sm}) {
        width: 100%;
    }


    .screen__background {		
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        -webkit-clip-path: inset(0 0 0 0);
        clip-path: inset(0 0 0 0);	
    }

    .screen__background__shape {
        transform: rotate(45deg);
        position: absolute;
        height: 520px;
        width: 520px;
        background: #FFF;	
        top: -50px;
        right: 180px;	
        border-radius: 0 72px 0 0;
    }
`;


const Button = styled.button`
    margin-top: 30px;
    display: block;
    padding: 10px 26px;
    border: none;
    background: ${({ theme }) => theme.primary};
    color: white;
    cursor: pointer;
    font-size: 16px;
    border-radius: 0px;
    transition: all .3s ease;

    &:hover {
        background: ${({ theme }) => theme.primaryHover};
    }
`;


function Login(props) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    let navigate = useNavigate();

    const submitForm = () => {
        props.login({ email: email, password: password }).then((response) => {
            const token = response.value.data.access_token;
            localStorage.setItem("token", token);
            setAuthorizationToken(token);
            navigate("/painel")
        }).catch((err) => {
            messageApi.open({
                type: 'error',
                content: err.response.data.message,
            });
        });
    };

    return (
        <Container>
            {contextHolder}
            <Card>
                <FormContainer>
                    <div>
                        <Input
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <Input
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                        <Button onClick={submitForm}>{props.loading ? "Loading..." : "Login"}</Button>
                    </div>
                </FormContainer>
                <div className="screen__background">
                    <span className="screen__background__shape"></span>
                </div>

            </Card>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(login(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
