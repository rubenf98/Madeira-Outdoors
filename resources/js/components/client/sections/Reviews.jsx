import React from 'react'
import styled, { keyframes } from "styled-components";
import { borderRadius, buttonPadding, dimensions, margin } from '../../../helper';
import { UnderlineTitle } from '../../helpers/style';

const scroll = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100vw, 0, 0);
  }
`;

const inverseScroll = keyframes`
  0% {
    transform: translate3d(-100vw, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const Container = styled.section`
    width: 100%;
`;

const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: ${margin};
    box-sizing: border-box;
    flex-wrap: wrap;

    .title {
        width: 70%;

        h2 {
            margin: 0;
        }
    }

    p {
        width: 30%;
    }

    @media (max-width: ${dimensions.md}) {
        .title, p {
            width: 100%;
        }
    }
`;

const ScrollingRow = styled.div`
	display: flex;
	align-items: center;

    img {
        animation: ${(props) => props.inverse ? inverseScroll : scroll};
        animation-duration: 25s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        will-change: transform;
        transform-style: preserve-3d;
        display: inline-block;
        margin: 30px;
        text-transform: uppercase;
        width: 30vw;
        height: auto;
        border-radius: ${borderRadius};
        box-shadow: 0px 0px 30px 3px rgba(0, 0, 0, 0.25);


        @media (max-width: ${dimensions.md}) {
            width: 70vw;
            margin: 20px;
        }
    }
`;

function Reviews({ text }) {
    return (
        <Container>
            <TitleContainer>
                <UnderlineTitle className='title'>
                    {text.title}
                </UnderlineTitle>
                <p>{text.description}</p>
            </TitleContainer>
            <ScrollingRow>
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
            </ScrollingRow>
            <ScrollingRow inverse={1}>
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
            </ScrollingRow>
            <ScrollingRow>
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
                <img src="/images/review/1.jpg" alt="" />
            </ScrollingRow>
        </Container>
    )
}

export default Reviews