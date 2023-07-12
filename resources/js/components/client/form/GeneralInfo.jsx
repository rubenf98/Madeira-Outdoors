import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from 'react-redux';
import dayjs from "dayjs";
import TitleContainer from './common/TitleContainer';
import { borderRadius, dimensions } from '../../../helper';


const Container = styled.section`
    position: relative;
    padding: 0px 0px;
    box-sizing: border-box;

    .flex {
        display: flex;
        justify-content: flex-start;
        gap: 15px;
    }
`;


const TimeContainer = styled.div`
    width: 100%;
`;


const Time = styled.div`
    padding: 20px;
    box-sizing: border-box;
    opacity: ${props => props.active ? 1 : .5};
    border: 1px solid;
    border-color: ${props => props.active ? props.theme.primary : "transparent"};
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
    width: 50%;
    cursor: pointer;
    border-radius: ${borderRadius};
    background-color: #fff;

    

    @media (max-width: ${dimensions.lg}) {
        width: 45%;
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;
    }

    h3 {
        font-size: 20px;
        font-weight: 700;
        text-align: center;
    }

    ul {
        margin: 40px 0px;
    } 

    li {
        font-size: 14px;
    }

    p {
        font-size: 14px;
        text-align: center;
        margin: auto;
        margin-top: 10px;
        
    }

    .discount {
        text-decoration: line-through;
    }
`;

function GeneralInfo(props) {
    const { text, dates } = props;

    const isActive = (index, value) => {
        return dayjs(dates[index]).format('HH:mm') === value
    }

    const setDates = (index, value) => {
        var newDates = [...dates];
        newDates[index] = newDates[index].set('hour', value);
        props.setDates(newDates)
    }

    return (
        <Container>

            <TitleContainer title={text.titles[0]} />

            <div className='flex'>
                <TimeContainer>
                    <h3>{text.placeholder.date[0]}</h3>
                    <div className='flex'>
                        <Time onClick={() => setDates(0, 9)} active={isActive(0, "09:00")}>09h00</Time>
                        <Time onClick={() => setDates(0, 14)} active={isActive(0, "14:00")}>14h00</Time>
                    </div>
                </TimeContainer>
                <TimeContainer>
                    <h3>{text.placeholder.date[1]}</h3>
                    <div className='flex'>
                        <Time onClick={() => setDates(1, 12)} active={isActive(1, "12:00")} >12h00</Time>
                        <Time onClick={() => setDates(1, 20)} active={isActive(1, "20:00")} >20h00</Time>
                    </div>
                </TimeContainer>

            </div>


        </Container >
    )
}

const mapStateToProps = (state) => {
    return {
        extras: state.extra.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocalizations: () => dispatch(fetchLocalizations()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(GeneralInfo));