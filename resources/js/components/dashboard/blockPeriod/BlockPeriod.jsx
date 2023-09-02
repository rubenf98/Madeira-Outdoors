import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import TableContainer from "./TableContainer";
import FormContainer from './FormContainer';
import { deleteBlockPeriod, fetchBlockPeriods } from '../../../redux/blockPeriod/actions';


const Container = styled.div`
    width: 100%;
    margin-bottom: 50px;
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

function BlockPeriod({ theme, data, loading, fetchBlockPeriods, deleteBlockPeriod, meta }) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false)

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        fetchBlockPeriods(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {

        fetchBlockPeriods(pagination.current, filters);
    }

    return (

        <Container>
            <Banner>
                <h1>Datas bloqueadas</h1>
            </Banner>
            <TableContainer
                data={data}
                loading={loading}
                onDelete={deleteBlockPeriod}
                meta={meta}
                setVisible={setVisible}
                handlePageChange={handlePageChange}
            />
            <FormContainer
                visible={visible}
                handleClose={() => setVisible(false)}
            />
        </Container>


    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBlockPeriods: (page, filters) => dispatch(fetchBlockPeriods(page, filters)),
        deleteBlockPeriod: (id) => dispatch(deleteBlockPeriod(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.blockPeriod.loading,
        data: state.blockPeriod.data,
        meta: state.blockPeriod.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(BlockPeriod));