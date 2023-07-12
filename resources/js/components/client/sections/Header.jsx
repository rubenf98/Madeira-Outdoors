import React, { useState } from 'react'
import styled from "styled-components";
import { borderRadius, buttonPadding, dimensions } from '../../../helper';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { connect } from 'react-redux';




function Header({ text, language, setLanguage, disabledDates }) {
    let navigate = useNavigate();



    return (
        <div></div>
    )
}

const mapStateToProps = (state) => {
    return {
        disabledDates: state.blockDate.data,
    };
};

export default connect(mapStateToProps, null)(Header);