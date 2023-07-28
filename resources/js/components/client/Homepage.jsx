import React, { useState } from 'react'
import styled from "styled-components";
import { connect } from 'react-redux'
import { setLanguage } from '../../redux/application/actions';
import { fetchBlockDates } from '../../redux/blockDate/actions';
import Navbar from './common/Navbar';
import Menu from './common/Menu';
import { borderRadius, dimensions } from '../../helper';
import { useNavigate } from 'react-router-dom';

const Container = styled.section`
    width: 100%;
    min-height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        color: white;
        font-size: clamp(36px, 5vw, 90px);
        text-align: center;
        margin: auto;
        line-height: 100%;
        margin-bottom: 30px;
    }

    .button-container {
        margin: 5px 0px ;
    }

    @media (max-width: ${dimensions.md}) {
        br {
            width: 70%;
            display: none;
        }
    }

`;

const Background = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    filter: brightness(.7);
`;

const ActivitiesContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    width: 50%;
    margin: auto;

    @media (max-width: ${dimensions.lg}) {
        width: 80%;
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;
        flex-wrap: wrap;
        height: 100%;
    }
`;

const Activity = styled.div`
    padding: 20px;
    box-sizing: border-box;
    width: ${props => props.active ? "50%" : "25%"};
    height: 100%;
    transition: all .3s ease;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: ${borderRadius};
        cursor: pointer;
    }

    .title {
        position: absolute;
        left: 20px;
        bottom: 40px;
        color: white;
        display: ${props => props.active ? "flex" : "none"};
        justify-content: flex-start;
        align-items: center;
        gap: 10px;

        .accent {
            height: 4px;
            width: 40px; 
            background-color: white;
        }

        h3 {
            font-size: clamp(28px, 3vw, 30px);
        }
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;
        height: 200px;

        .title {
            display: flex;
        }
    }
    
`;
const images = ["/images/homepage/flying.jpg", "/images/homepage/land.jpg", "/images/homepage/marine.jpg"]

function Homepage(props) {
    const { text } = require('../../../assets/' + props.language + "/homepage");
    const [active, setActive] = useState(1)
    let navigate = useNavigate();

    return (
        <Container>
            <Background src="/images/homepage/wallpaper_1920.jpg" />

            <Navbar />
            <Menu />

            <ActivitiesContainer>
                {text.activities.map((activity, index) => (
                    <Activity
                        onMouseEnter={() => setActive(activity.id)}
                        onClick={() => navigate(activity.to)}
                        active={active == activity.id ? 1 : 0}
                        key={activity.id}
                    >
                        <img src={images[index]} alt="" />
                        <div className='title'>
                            <div className='accent' />
                            <h3>{activity.name}</h3>
                        </div>
                    </Activity>
                ))}
            </ActivitiesContainer>


        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLanguage: (state) => dispatch(setLanguage(state)),
        fetchBlockDates: (filters) => dispatch(fetchBlockDates(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        language: state.application.language,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);