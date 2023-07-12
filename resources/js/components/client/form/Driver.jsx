import React, { useState } from 'react'
import styled, { withTheme } from "styled-components";

import { Col, DatePicker, Form, Input, Row } from 'antd';
import TitleContainer from './common/TitleContainer';
import dayjs from "dayjs";
import { dimensions } from '../../../helper';
import { TransparentInput, TransparentDatePicker } from '../../helpers/style';

const Container = styled.section`
    @media (max-width: ${dimensions.md}) {
        padding: 0px;
    }
`;

const Section = styled.div`
    margin: 50px auto 40px auto;
`;



const rules = {
    name: [{ required: true, message: 'Please input your fullname!' }],
    birthday: [{ required: true, message: 'Please input your birthday!' }],
    license_id: [{ required: true, message: 'Please input your driver license id!' }],
};

function Driver({ text, drivers }) {
    const [same, setSame] = useState(true)
    var placeholder = text.placeholder.driver;

    return (
        <Section>
            <TitleContainer same={same} setSame={setSame} visibleOptions title={text.titles[4]} />
            <Row type="flex" gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label={placeholder.name} name={same ? "name" : "driver_name"} rules={rules.name}>
                        <TransparentInput disabled={same} size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={placeholder.birthday} name="driver_birthday" rules={rules.birthday}>
                        <TransparentDatePicker format="DD-MM-YYYY" size="large" maxDate={dayjs().subtract(21, "years")} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={placeholder.license} name="driver_license" rules={rules.license_id}>
                        <TransparentInput size="large" />
                    </Form.Item>
                </Col>
            </Row>
        </ Section>
    )
}

export default withTheme(Driver)