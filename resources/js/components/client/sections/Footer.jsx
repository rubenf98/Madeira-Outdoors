import React from 'react'
import styled from "styled-components";
import { borderRadius, dimensions, margin } from '../../../helper';

const Container = styled.section`
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;

    @media (max-width: ${dimensions.lg}) {
        padding: ${margin};
    }
`;

const Image = styled.div`
    width: 25%;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-top-left-radius: ${borderRadius};
        border-bottom-left-radius: ${borderRadius};
        
    }

    @media (max-width: ${dimensions.lg}) {
        width: 100%;

        img {
            max-height: 400px;
            border-radius: 0px;
            border-bottom-left-radius: ${borderRadius};
            border-bottom-right-radius: ${borderRadius};
        }
    }
`;

const ContentContainer = styled.div`
    width: 75%;
    padding: 50px 0px 50px 20px;
    box-sizing: border-box;

    @media (max-width: ${dimensions.lg}) {
        width: 100%;
        padding: 0px;
    }
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    padding: 50px;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.primary};
    border-top-left-radius: ${borderRadius};
    border-bottom-left-radius: ${borderRadius};
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;

    @media (max-width: ${dimensions.lg}) {
        border-radius: 0px;
        padding: 30px;
        border-top-left-radius: ${borderRadius};
        border-top-right-radius: ${borderRadius};
    }

    @media (max-width: ${dimensions.md}) {
        padding: 20px;
    }
`;

const Section = styled.div`
    width: ${props => props.width};

    @media (max-width: ${dimensions.md}) {
        width: ${props => props.large ? "100%" : "50%"};
    }
`;


function Footer() {
    return (
        <Container>
            <ContentContainer>
                <Content>
                    <Section large={1} width="30%">
                        <h3>Cosy Campers ©2023</h3>
                        <p>Restaurante Tricolore, Estrada Monumental, 9000-096 Funchal</p>
                        <p>info@cozycampers.pt</p>
                        <p>(351) 964 180 092</p>
                    </Section>

                    <Section width="20%">
                        <h3>Social</h3>
                        <p>Instagram</p>
                        <p>Tripadvisor</p>
                        <p>Google</p>
                    </Section>

                    <Section width="20%">
                        <h3>Pages</h3>
                        <p>Home</p>
                        <p>About</p>
                        <p>Contact</p>
                    </Section>

                    <Section width="20%">
                        <h3 style={{ opacity: 0 }}>.</h3>
                        <p>Privacy police</p>
                        <p>Terms of use</p>
                    </Section>

                </Content>
            </ContentContainer>
            <Image>
                <img src="/images/footer.jpg" alt="" />
            </Image>
        </Container>
    )
}

export default Footer