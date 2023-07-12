import React from 'react'
import styled from "styled-components";
import { borderRadius, dimensions, margin } from "../../../helper";
import { UnderlineTitle } from '../../helpers/style';
import { Input } from 'antd';

const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;


    @media (max-width: ${dimensions.lg}) {
        padding: 0px;
    }

    @media (max-width: ${dimensions.md}) {
        justify-content: flex-start;
    }
`;

const Image = styled.div`
    width: 50%;

    img {
        width: 100%;
        border-top-right-radius: ${borderRadius};
        border-bottom-right-radius: ${borderRadius};
    }


    @media (max-width: ${dimensions.md}) {
        margin-top: 30px;
        width: 100%;
        padding-right: ${margin};
        box-sizing: border-box;
        order: 2;
    }
`;

const Content = styled.div`
    width: 50%;
    padding: 50px 100px;
    box-sizing: border-box;

    @media (max-width: ${dimensions.md}) {
        padding: ${margin};
        width: 100%;
        order: 1;
    }
`;

const CustomInput = styled(Input)`
    margin-top: 20px;

    .ant-input-wrapper {
        background-color: ${({ theme }) => theme.background};
        border-radius: ${borderRadius};
        border: 1px solid #777;
        padding: 2px 6px;
        box-sizing: border-box;

        .ant-input {
            background-color: transparent;
            padding: 25px 30px;
            border: 0px;
        }

        .ant-input::placeholder {
            font-size: 18px;
        }

        .ant-input-group-addon {
            background-color: transparent;
            padding: 0px;
            border: 0px;
            
            .submit-button {
                cursor: pointer;
                color: white;
                font-weight: bold;
                font-size: 22px;
                padding: 20px 40px;
                width: 100%;
                margin: 3px;
                border-radius: ${borderRadius};
                background-color: ${({ theme }) => theme.primary};
                border: 0px;
                box-shadow: 0px;
                transition: all .3s ease;

                &:hover {
                    background-color: ${({ theme }) => theme.primaryHover};
                }
            }
        }
    }
`;

function Newsletter({ text }) {
    return (
        <Container>
            <Image>
                <img src="/images/newsletter.jpg" alt="" />
            </Image>
            <Content>
                <UnderlineTitle>
                    {text.title}
                </UnderlineTitle>
                <p>{text.description}</p>
                <CustomInput
                    addonAfter={
                        <button className='submit-button'>
                            {text.button}
                        </button>
                    }
                    placeholder={text.placeholder}
                />
            </Content>
        </Container>
    )
}

export default Newsletter