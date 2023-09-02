import { Select } from 'antd';
import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchActivitySelector } from '../../../redux/activity/actions';

function ActivityRemoteSelectContainer({ fetchActivitySelector, data, loading, value, onChange }) {
    useEffect(() => {
        fetchActivitySelector()
    }, [])
    console.log(data)
    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            showSearch
            mode="multiple"
        >
            {data.map((element) => (
                <Select.Option key={element.id} value={element.id}>{element.name.pt}</Select.Option>
            ))}
        </Select>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchActivitySelector: (filters) => dispatch(fetchActivitySelector(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.activity.selector,
        loading: state.activity.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityRemoteSelectContainer);