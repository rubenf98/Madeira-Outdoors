import React from 'react'
import Header from './common/Header'
import styled from "styled-components";
import { borderRadius, dimensions } from '../../helper';


const ParagraphContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;

    div {
        width: 50%;
    } 
`;

const PartnerContainer = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 30px;
    margin: 100px 0px;
    flex-wrap: wrap;

    div {
        width: calc(25% - 30px);

        img {
            width: 100%;
            margin: auto;
            display: block;
            height: auto;
            max-width: 200px;
        }

        h4{
            text-align: center;
        } 

    } 

    @media (max-width: ${dimensions.md}) {
        div {
            width: calc(33% - 30px);
        } 
    }    
`;


const ImageContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
    margin: 100px 0px;

    
    img {
        width: 33%;
        border-radius: ${borderRadius};
    } 
`;

const Content = styled.div`
    width: 100%;
    max-width: 1440px;
    margin: auto;
    margin-bottom: 100px;

    h2 {
        margin-top: 100px;
    }
    
    @media (max-width: ${dimensions.md}) {
        box-sizing: border-box;
        padding: 0px 20px;
    }

    @media (max-width: ${dimensions.md}) {
        margin: 100px 0px;
    }

`;
function About() {
    return (
        <div>
            <Header text="about" />
            <Content>
                <h2>Explore Madeira: Where Levada Tours, Hiking, and Camping Dreams Unite!</h2>

                <ParagraphContainer>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad commodi culpa modi deleniti. Mollitia maxime non libero ducimus laborum eos asperiores facilis officiis, porro cupiditate nulla quae, eligendi reiciendis ipsa!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad commodi culpa modi deleniti. Mollitia maxime non libero ducimus laborum eos asperiores facilis officiis, porro cupiditate nulla quae, eligendi reiciendis ipsa!</p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad commodi culpa modi deleniti. Mollitia maxime non libero ducimus laborum eos asperiores facilis officiis, porro cupiditate nulla quae, eligendi reiciendis ipsa!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad commodi culpa modi deleniti. Mollitia maxime non libero ducimus laborum eos asperiores facilis officiis, porro cupiditate nulla quae, eligendi reiciendis ipsa!</p>
                    </div>
                </ParagraphContainer>

                <ImageContainer>
                    <img src="/images/homepage/flying.jpg" alt="" />
                    <img src="/images/homepage/land.jpg" alt="" />
                    <img src="/images/homepage/marine.jpg" alt="" />
                </ImageContainer>

                <h2>Partners that support and work with Madeira Outdoors</h2>
                <PartnerContainer>
                    <div>
                        <img src="/images/partners/default.png" alt="" />
                        <h4>Lorem ipsum</h4>
                    </div>
                    <div>
                        <img src="/images/partners/default.png" alt="" />
                        <h4>Lorem ipsum</h4>
                    </div>
                    <div>
                        <img src="/images/partners/default.png" alt="" />
                        <h4>Lorem ipsum</h4>
                    </div>
                    <div>
                        <img src="/images/partners/default.png" alt="" />
                        <h4>Lorem ipsum</h4>
                    </div>
                    <div>
                        <img src="/images/partners/default.png" alt="" />
                        <h4>Lorem ipsum</h4>
                    </div>
                    <div>
                        <img src="/images/partners/default.png" alt="" />
                        <h4>Lorem ipsum</h4>
                    </div>
                    <div>
                        <img src="/images/partners/default.png" alt="" />
                        <h4>Lorem ipsum</h4>
                    </div>
                    <div>
                        <img src="/images/partners/default.png" alt="" />
                        <h4>Lorem ipsum</h4>
                    </div>
                </PartnerContainer>
            </Content>


        </div>
    )
}

export default About