import { Select } from 'antd';
import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchCategorySelector } from '../../../redux/category/actions';

function CategoryRemoteSelectContainer({ fetchCategorySelector, data, loading, value, onChange }) {
    useEffect(() => {
        fetchCategorySelector()
    }, [])

    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            showSearch
            placeholder="Categorias"
            optionFilterProp="name"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
            {data.map((element) => (
                <Select.Option key={element.id} value={element.id}>{element.name.pt}</Select.Option>
            ))}
        </Select>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategorySelector: (filters) => dispatch(fetchCategorySelector(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.category.selector,
        loading: state.category.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryRemoteSelectContainer);