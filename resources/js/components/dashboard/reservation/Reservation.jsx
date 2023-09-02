import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import TableContainer from './TableContainer';
import { connect } from 'react-redux';
import { fetchReservations, deleteReservation, setCurrentReservation } from "../../../redux/reservation/actions";
import FormContainer from './FormContainer';

const Banner = styled.section`
    background: url("/images/dashboard/banner.svg");
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 20vh;
    color: white;
    display: flex;
    align-items: flex-end;

    h1 {
        padding: 0px 0px 40px 40px;
        margin: 0px;
        box-sizing: border-box;
        font-size: 36px;
    }
`;


function Reservation(props) {
    const [filters, setFilters] = useState({});
    const [edit, setEdit] = useState(false);
    const [visible, setVisible] = useState(false);
    const { loading, data, meta, current } = props

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });
    }

    useEffect(() => {
        props.fetchReservations(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {
        props.fetchReservations(pagination.current, filters);
    }

    const handleUpdateClick = (row) => {
        setVisible(true);
        setEdit(true);
        props.setCurrentReservation(row);

    }

    const handleCreateClick = () => {
        setVisible(true);
        setEdit(false);
        props.setCurrentReservation({});

    }

    return (
        <div>
            <Banner>
                <h1>As minhas atividades</h1>
            </Banner>

            <FormContainer
                visible={visible}
                handleClose={() => setVisible(false)}
                current={current}
                edit={edit}
            />

            <TableContainer
                data={data}
                meta={meta}
                loading={loading}
                onDelete={props.deleteReservation}
                handlePageChange={handlePageChange}
                handleUpdateClick={handleUpdateClick}
                handleCreateClick={handleCreateClick}
                handleFilters={handleFilters}
            />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReservations: (page, filters) => dispatch(fetchReservations(page, filters)),
        deleteReservation: (id) => dispatch(deleteReservation(id)),
        setCurrentReservation: (reservation) => dispatch(setCurrentReservation(reservation)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
        data: state.reservation.data,
        meta: state.reservation.meta,
        current: state.reservation.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);