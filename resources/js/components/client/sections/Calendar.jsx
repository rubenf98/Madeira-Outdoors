import React, { useState } from 'react'
import styled from "styled-components";
import { Calendar, DateObject } from "react-multi-date-picker"
import { borderRadius, dimensions, margin } from "../../../helper";
import { UnderlineTitle } from '../../helpers/style';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 100px;
    box-sizing: border-box;
    width: 100%;
    max-width: 1920px;
    margin: auto;
    flex-wrap: wrap;

    @media (max-width: ${dimensions.xl}) {
        padding: 0px 50px;
    }


    @media (max-width: ${dimensions.lg}) {
        padding: ${margin};
    }

    @media (max-width: ${dimensions.md}) {
        padding: 0px;
    }
`;

const Arrow = styled.div`
    border-radius: 50%;
    background-color: #ededed;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: 500;
    cursor: pointer;
`;

const PriceContainer = styled.div`
    width: 50%;
    padding: 50px;
    box-sizing: border-box;

    @media (max-width: ${dimensions.xl}) {
        padding: 30px;
    }

    @media (max-width: ${dimensions.lg}) {
        padding: 20px;
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;
        
    }
`;

const Price = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    border-radius: ${borderRadius};
    border: 2px solid #777;
    margin-bottom: 30px;

    @media (max-width: ${dimensions.lg}) {
        padding: 20px;
    }

    @media (max-width: ${dimensions.md}) {
        display: none;
    }

    p {
        margin: 0px;
    }
`;

const Book = styled.button`
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    border-radius: ${borderRadius};
    margin-bottom: 30px;
    color: white;
    font-size: 26px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.primary};
    cursor: pointer;
    transition: all .3s ease;

    @media (max-width: ${dimensions.lg}) {
        padding: 20px;
    }

    @media (max-width: ${dimensions.md}) {
        display: none;
    }

    &:hover {
        background-color: ${({ theme }) => theme.primaryHover};
    }
`;



const DatePicker = styled(Calendar)`
    width: 50%;
    box-shadow: 50px 50px 4px 5px rgba(0, 0, 0, 0.15);
    background-color: ${({ theme }) => theme.primary};
    padding: 100px 80px;
    box-sizing: border-box;
    border-radius: ${borderRadius};

    @media (max-width: ${dimensions.lg}) {
        padding: 50px 30px;
    }

    @media (max-width: ${dimensions.md}) {
        width: 80%;
        margin: auto;
        box-shadow: 30px 30px 4px 5px rgba(0, 0, 0, 0.15);
        
    }

    @media (max-width: ${dimensions.sm}) {
        width: 90%;
        box-shadow: 20px 20px 4px 5px rgba(0, 0, 0, 0.15);
        
    }

    .rmdp-calendar {
        width: 100%;

        .rmdp-header {
            margin-bottom: 30px;

            .rmdp-header-values {
                background-color: #ededed;
                border-radius: ${borderRadius};
                flex: 1;
                padding: 16px 0px;
                box-sizing: border-box;
                font-weight: 900;
                font-size: clamp(18px, 3vw, 24px);
            }

            .rmdp-left {
                margin-right: 10px;
            }
            .rmdp-right {
                margin-left: 10px;
            }
        }

        
        .rmdp-week {
            gap: 8px;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        .rmdp-day-picker > div {
            width: 100%;
        }

        .rmdp-day {
            transition: all .3s ease;
            background-color: #ededed;
            border-radius: 50%;
            margin: 0px;
            color: ${({ theme }) => theme.secundary};
            font-weight: 900;
            flex: 1 0 auto;
            aspect-ratio: 1 / 1 ;
            height: auto !important;

            span {
                font-size: clamp(16px, 2.5vw, 22px);;
            }

            span:hover {
                background-color: ${({ theme }) => theme.secundary}
            }

            &:hover {
                background-color: ${({ theme }) => theme.secundary} !important;
                color: white;
            }
        }

        .rmdp-week-day {
            height: default;
        }

        .rmdp-range, .rmdp-range-hover {
            border-radius: 0px;
            margin: 0px;
            border: 0px;  
            box-shadow: 0px;     
        }

        .start, .end {
            
            background-color: ${({ theme }) => theme.secundary};
            color: white;
        }

        .start {
            border-top-left-radius: 90px;
            border-bottom-left-radius: 90px;
        }
        .end {
            border-top-right-radius: 90px;
            border-bottom-right-radius: 90px;
        }

        .rmdp-disabled {
            color: #777;
            position: relative;

            &:hover {
                background-color: #ededed !important;
                color: #777;
            }

            span:hover {
                background-color: #ededed;
            }

            span {
                color: #ededed;
            }

            span::before {
                content: "x";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #777;
                font-size: clamp(18px, 2.5vw, 22px);;
            }
        }
    }
`;

function CalendarContainer({ text, disabledDates }) {
    const [value, setValue] = useState(undefined);
    let navigate = useNavigate();

    const prices = [
        { price: 140, days: "1-3" },
        { price: 110, days: "4-7" },
        { price: 90, days: "7-10" },
        { price: 70, days: ">10" }
    ]

    function isDisabled(range) {
        var isRangeBlocked = false;
        if (range) {
            if (range.length == 2) {
                for (let index = 0; index < disabledDates.dates.length; index++) {
                    var disabledDate = new DateObject(disabledDates.dates[index]);
                    if (range[0] <= disabledDate && range[1] >= disabledDate) {
                        isRangeBlocked = true;
                        break;
                    }
                }
            }
        }

        return isRangeBlocked;
    }

    const handleSearch = () => {
        if (value.length == 2) {
            navigate("/booking?from=" + dayjs(value[0]).format('DD-MM-YYYY') + "&to=" + dayjs(value[1]).format('DD-MM-YYYY'));
        }

    }

    return (
        <Container>
            <PriceContainer>
                <UnderlineTitle>
                    {text.title}

                    {prices.map((current, index) => (
                        <Price key={index}>
                            <p>€{current.price}/{text.day}</p>
                            <p>{current.days} {text.day}s</p>
                        </Price>
                    ))}
                    <Book onClick={handleSearch}>
                        {text.button}
                    </Book>
                </UnderlineTitle>

            </PriceContainer>
            <DatePicker
                value={value}
                onChange={(range) => {
                    setValue(isDisabled(range) ? undefined : range);
                }}
                range
                rangeHover
                highlightToday={false}
                hideWeekDays
                minDate={new DateObject().add(1, "days")}
                maxDate={new DateObject().add(6, "months")}
                mapDays={({ date }) => {
                    let isDisabled = disabledDates?.dates.includes(date.format('YYYY-MM-DD'))

                    if (isDisabled) return {
                        disabled: true,
                    }
                }}
                renderButton={(direction, handleClick, disabled) => (
                    <Arrow
                        style={{ color: disabled ? "gray" : "blue" }}
                        className={direction === "right" ? "rmdp-right" : "rmdp-left"}
                        onClick={handleClick}
                    >
                        {direction === "right" ? ">" : "<"}
                    </Arrow>
                )}
            />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        disabledDates: state.blockDate.data,
    };
};

export default connect(mapStateToProps, null)(CalendarContainer);