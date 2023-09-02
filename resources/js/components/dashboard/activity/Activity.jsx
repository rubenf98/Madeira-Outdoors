import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import TableContainer from './TableContainer';
import { connect } from 'react-redux';
import { fetchActivities, deleteActivity, setCurrentActivity, setActivityStatus } from "../../../redux/activity/actions";
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


function Activity(props) {
    const [filters, setFilters] = useState({});
    const [edit, setEdit] = useState(false);
    const [visible, setVisible] = useState(false);
    const { loading, data, meta, current } = props

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });
    }

    useEffect(() => {
        props.fetchActivities(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {
        props.fetchActivities(pagination.current, filters);
    }

    const handleUpdateClick = (row) => {
        setVisible(true);
        setEdit(true);
        props.setCurrentActivity(row);

    }

    const handleCreateClick = () => {
        setVisible(true);
        setEdit(false);
        props.setCurrentActivity({});

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
                onDelete={props.deleteActivity}
                handlePageChange={handlePageChange}
                handleUpdateClick={handleUpdateClick}
                handleCreateClick={handleCreateClick}
                setCarStatus={props.setActivityStatus}
                handleFilters={handleFilters}
            />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchActivities: (page, filters) => dispatch(fetchActivities(page, filters)),
        deleteActivity: (id) => dispatch(deleteActivity(id)),
        setCurrentActivity: (activity) => dispatch(setCurrentActivity(activity)),
        setActivityStatus: (id, status) => dispatch(setActivityStatus(id, status)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.activity.loading,
        data: state.activity.data,
        meta: state.activity.meta,
        current: state.activity.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activity);