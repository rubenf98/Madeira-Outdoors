import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import dayjs from "dayjs";
import { Badge, Calendar } from 'antd';
import PopoverContainer from './PopoverContainer';
import { connect } from 'react-redux';
import { fetchReservationsPerMonth } from '../../../redux/reservation/actions';

const Container = styled.div`
    width: 100%;

    .ant-picker-calendar-date-content {
        height: 50px !important;

        p {
            margin: 2px 0px;
        }
    }
`;

function CalendarContainer(props) {
    const { data, loading } = props;
    const [filters, setFilters] = useState({})

    useEffect(() => {
        props.fetchReservationsPerMonth();
    }, [filters])


    const handlePanelChange = (date) => {
        var startDate = dayjs(date).startOf('month').startOf('day').subtract(5, 'days').format(dateFormat);
        var endDate = dayjs(date).endOf('month').endOf('day').add(10, 'days').format(dateFormat);
        setFilters({ dates: [startDate, endDate] });
    }

    const dateCellRender = (value) => {
        var listData = [];

        data.map((reservation) => {

            if (dayjs(reservation.date).isSame(value, 'day')) {
                listData.push({
                    type: 'error',
                    content: reservation?.activity?.name?.pt + ' (#' + reservation.id + ')',
                    reservation: reservation
                },)
            }
        })

        return (
            <div>
                {listData.map((item) => (
                    <PopoverContainer key={item.content} item={item.reservation}>
                        <p >
                            <Badge status={item.type} text={item.content} />
                        </p>
                    </PopoverContainer>
                ))}
            </div>
        );
    };

    return (
        <Container>
            <Calendar onPanelChange={handlePanelChange} loading={loading} cellRender={dateCellRender} />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReservationsPerMonth: (filters) => dispatch(fetchReservationsPerMonth(filters)),
    };
};


const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
        data: state.reservation.dataPerMonth,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);