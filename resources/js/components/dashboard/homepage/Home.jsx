import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchRelevantReservations } from "../../../redux/reservation/actions";
import DrawerContainer from "../reservation/DrawerContainer";
import TableContainer from "./TableContainer";
import CalendarContainer from "./CalendarContainer";

const Container = styled.section`
`;

const Content = styled.div`
padding: 50px;
    box-sizing: border-box;
`;

const TodayContainer = styled.section`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
    
`;

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


function Home({ fetchRelevantReservations, data }) {
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
            <Banner>
                <h1>Bem vindo de volta ao painel de controlo</h1>
            </Banner>

            <DrawerContainer currentId={current} drawerState={drawerState} setDrawerState={setDrawerState} />
            <Content>
                <TodayContainer>
                    <TableContainer handleRowClick={handleRowClick} title="Atividades hoje" data={data.today} />
                    <TableContainer handleRowClick={handleRowClick} title="Próximas atividades" data={data.next} />
                </TodayContainer>
                <CalendarContainer />
            </Content>

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
