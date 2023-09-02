import { Collapse } from 'antd'
import React from 'react'
import Header from './common/Header';
import styled from "styled-components";
import { borderRadius, dimensions } from '../../helper';

const Content = styled.div`
    width: 50%;
    margin: 100px auto;
    display: flex;

     

    .ant-collapse-item {
        padding-left: 180px;
        box-sizing: border-box;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            left: 0px;
            width: 150px;
            height: 1px;
            top: 40px;
            background-color: ${({ theme }) => theme.secundary};
        }
    }

    h2 {
        margin-top: 100px;
    }

    .ant-collapse-expand-icon {
        display: none !important;
    }

    .ant-collapse-header-text {
        font-size: clamp(20px, 2vw, 38px);
        color: ${({ theme }) => theme.primary}
    }

    .ant-collapse-content-box {
        padding: 0px;
        color: ${({ theme }) => theme.primary};
        font-size: 18px;
    }
    
    @media (max-width: ${dimensions.lg}) {
        width: 80%;

        .ant-collapse-content-box {
            font-size: 16px;
        }
    }

    @media (max-width: ${dimensions.md}) {
        margin: 100px 0px;
        width: 100%;
        box-sizing: border-box;
        padding: 0px 20px;

        .ant-collapse-item {
            padding-left: 120px;

            &::before {
                top: 30px;
                width: 100px;
            }
        }
    }

    @media (max-width: ${dimensions.sm}) {

        .ant-collapse-item {
            padding-left: 80px;

            &::before {
                top: 30px;
                width: 50px;
            }
        }

        .ant-collapse-content-box {
            font-size: 14px;
        }
    }
`;

const items = [
    {
        key: '1',
        label: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, maiores consequatur laboriosam cupiditate perferendis impedit dolor debitis.',
        children: <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, maiores consequatur laboriosam cupiditate perferendis impedit dolor debitis, animi culpa soluta est modi quis veniam asperiores, a perspiciatis cum. Rem, magni.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, maiores consequatur laboriosam cupiditate perferendis impedit dolor debitis, animi culpa soluta est modi quis veniam asperiores, a perspiciatis cum. Rem, magni.</p>
        </div>,
    },
    {
        key: '2',
        label: 'Animi culpa soluta est modi quis veniam asperiores, a perspiciatis cum. Rem, magni.',
        children: <p>A dog is a type of domesticated animal.
            Known for its loyalty and faithfulness,
            it can be found as a welcome guest in many households across the world.</p>,
    },
    {
        key: '3',
        label: 'Lorem ipsum dolor sit amet consectetur',
        children: <p>A dog is a type of domesticated animal.
            Known for its loyalty and faithfulness,
            it can be found as a welcome guest in many households across the world.</p>,
    },
];

function Faq() {
    return (
        <div>
            <Header text="frequently asked questions" />
            <Content>
                <Collapse ghost items={items} />
            </Content>

        </div>
    )
}

export default Faq