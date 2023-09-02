import React, { useEffect, useState } from 'react'
import Header from './common/Header'
import styled from "styled-components";
import { fetchActivities } from '../../redux/activity/actions'
import { connect } from 'react-redux'
import { Pagination } from 'antd';
import { Link, useParams } from 'react-router-dom';

const ActivityList = styled.section`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    max-width: 1200px;
    width: 100%;
    margin: 100px auto 20px auto;

    .activity {
        width: 33%;
        padding: 20px;
        box-sizing: border-box;
        text-decoration: none;
        img {
            width: 100%;
        }
    }

    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        color: black;

        .title {
            flex: 1;

            h3 {
                margin: 0px;
            }

            p {
                margin: 0px;
                opacity:.8 ;
            }
        }

        .price {
            font-size: clamp(30px, 3.5vw, 50px);
            font-weight: bold;
            margin: 0px;
            text-decoration: none;
        }
    }
`;

const PageSelector = styled(Pagination)`
    display: flex;
    margin: 0px auto 50px auto;
    justify-content: center;
`;

function Activities(props) {
    const [filters, setFilters] = useState({})
    const { category } = useParams();
    const { text } = require('../../../assets/' + props.language + "/activities");

    useEffect(() => {
        setFilters({ ...filters, category: category });
    }, [category])


    useEffect(() => {
        if (Object.values(filters).length) {
            props.fetchActivities(filters.page, filters);
        }

    }, [filters])

    const handlePageChange = (e) => {
        console.log(e)
        setFilters({ ...filters, page: e });
    }

    return (
        <div>
            <Header text={text[filters.category]} />

            <ActivityList>
                {props.activities.map((aActivity) => (

                    <Link to={"/activity/" + aActivity.id} className='activity' key={aActivity.id}>
                        <img src={aActivity.image} alt="" />
                        <div className='flex'>
                            <div className='title'>
                                <h3>{aActivity.name[props.language]}</h3>
                                <p>{aActivity.duration[props.language]}</p>
                            </div>
                            <p className='price'>{aActivity.price}€</p>
                        </div>
                    </Link>
                ))}
            </ActivityList>

            {props.meta?.current_page &&
                <PageSelector
                    onChange={handlePageChange}
                    pageSize={props.meta?.per_page}
                    current={props.meta?.current_page}
                    total={props.meta?.total}
                />
            }
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchActivities: (page, filters) => dispatch(fetchActivities(page, filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        language: state.application.language,
        activities: state.activity.data,
        loading: state.activity.loading,
        meta: state.activity.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);