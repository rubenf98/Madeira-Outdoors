import React from 'react'
import styled, { css } from "styled-components";
import { borderRadius, buttonPadding, dimensions } from '../../../helper';

const Container = styled.section`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    h1 {
        color: white;
        font-size: clamp(36px, 5vw, 90px);
        text-align: center;
        margin: auto;
        line-height: 100%;
        margin-bottom: 30px;
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

const Image = styled.img`
    width: 50%;

    @media (max-width: ${dimensions.lg}) {
        width: 100%;
        padding-left: 20px;
        box-sizing: border-box;
    
    }
`;

const Content = styled.div`
    width: 50%;
    padding: 100px;
    box-sizing: border-box;

    h2 {
        font-size: clamp(26px, 3vw, 50px);
        
        span {
            position: relative;

            &::before {
                content: "";
                position: absolute;
                width: 100%;
                height: 18px;
                background-color: ${({ theme }) => theme.secundary};
                bottom: 5px;
                z-index: -1;
            }
        }
    }

    p {
        font-size: clamp(16px, 2vw, 18px);
    }

    

    .details {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-top: 50px;

        h4 {
            font-weight: 400;
        }

        
    }

    @media (max-width: ${dimensions.lg}) {
        width: 100%;
        padding: 20px;

        h2 {

        
        span {

            &::before {
                height: 13px;
                bottom: 5px;
            }
        }
    }
    
    }
    

    @media (max-width: ${dimensions.md}) {
        .details { 
            display: none;
        }
        h2 {
        span {

            &::before {
                height: 10px;
                bottom: 5px;
            }
        }
    }
    }
`;

const Details = styled.div`
    width: 100%;
    display: none;
    justify-content: space-between;
    align-items: flex-start;
    margin: 50px auto;
    flex-wrap: wrap;
    padding: 20px;
    box-sizing: border-box;

    h4 {
        font-weight: 400;
    }

    .detail {
        width: 50%;
    }
    
    @media (max-width: ${dimensions.md}) {
        display: flex;
    }
`;

function About({ text }) {
    return (
        <Container>
            <Content>
                <h2>{text.title}</h2>
                <p>{text.description}</p>

                <div className='details'>
                    <div className='detail'>
                        <img src="/images/nature.svg" alt="nature" />
                        <h4>{text.details[0]}</h4>
                    </div>
                    <div className='detail'>
                        <img src="/images/comfort.svg" alt="nature" />
                        <h4>{text.details[1]}</h4>
                    </div>
                    <div className='detail'>
                        <img src="/images/freedom.svg" alt="nature" />
                        <h4>{text.details[2]}</h4>
                    </div>
                    <div className='detail'>
                        <img src="/images/view.svg" alt="nature" />
                        <h4>{text.details[3]}</h4>
                    </div>
                </div>
            </Content>
            <Image src="/images/about.png" />

            <Details>
                <div className='detail'>
                    <img src="/images/nature.svg" alt="nature" />
                    <h4>{text.details[0]}</h4>
                </div>
                <div className='detail'>
                    <img src="/images/comfort.svg" alt="nature" />
                    <h4>{text.details[1]}</h4>
                </div>
                <div className='detail'>
                    <img src="/images/freedom.svg" alt="nature" />
                    <h4>{text.details[2]}</h4>
                </div>
                <div className='detail'>
                    <img src="/images/view.svg" alt="nature" />
                    <h4>{text.details[3]}</h4>
                </div>
            </Details>
        </Container>
    )
}

export default About