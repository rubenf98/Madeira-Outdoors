import { Checkbox } from 'antd';
import React from 'react'
import styled, { withTheme } from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    margin: 30px 0px;

    .title {
        flex: 1;

        .underline {
            width: 100px;
            height: 10px;
            background-color: ${({ theme }) => theme.secundary};
            margin-bottom: 30px;
        }

        h2 {
            font-size: 40px;
            font-weight: 700;
            margin: 0px;
            line-height: 100%;
            margin-bottom: 10px;
        }
    }

    .options {
        display: ${props => props.visibleOptions ? "block" : "none"};
        font-weight: bold;
    }
    
`;


function TitleContainer({ theme, title, visibleOptions, same, setSame }) {
    return (
        <Container visibleOptions={setSame} underline={theme.secundary}>
            <div className='title'>
                <h2>{title}</h2>
                <div className='underline' />
            </div>

            <div className='options'>
                <Checkbox checked={same} onChange={(e) => setSame(e.target.checked)}>Same as renter</Checkbox>
            </div>
        </Container>
    )
}

export default withTheme(TitleContainer)