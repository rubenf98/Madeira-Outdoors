import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchRelevantReservations } from "../../redux/reservation/actions";
import DrawerContainer from "./reservation/DrawerContainer";
import TableContainer from "./homepage/TableContainer";

const Container = styled.div`
    h1 {
        font-size: 36px;
        text-align: left;
        padding: 50px 0;
    }
`;

const TodayContainer = styled.section`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
`;

function Dashboard({ fetchRelevantReservations, data }) {
    const [current, setCurrent] = useState(undefined);
    const [drawerState, setDrawerState] = useState(0);

    useEffect(() => {
        fetchRelevantReservations();
    }, [])

    const handleRowClick = (row) => {
        setCurrent(row.id);
        setDrawerState(1);
    }


    return (
        <Container>
            <h1>Bem vindo de volta ao painel de controlo</h1>
            <DrawerContainer currentId={current} drawerState={drawerState} setDrawerState={setDrawerState} />
            <TodayContainer>
                <TableContainer handleRowClick={handleRowClick} title="Levantamentos Hoje" data={data.today} />
                <TableContainer handleRowClick={handleRowClick} title="Devoluções Hoje" data={data.next} />
            </TodayContainer>


        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRelevantReservations: () => dispatch(fetchRelevantReservations()),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
        data: state.reservation.relevantData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
