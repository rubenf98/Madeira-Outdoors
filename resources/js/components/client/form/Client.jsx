import React from 'react'
import styled, { withTheme } from "styled-components";
import { Col, Form, Input, Row } from 'antd';
import TitleContainer from './common/TitleContainer';
import { dimensions } from '../../../helper';
import { TransparentInput } from '../../helpers/style';

const Container = styled.section`
    margin: 50px auto;

    @media (max-width: ${dimensions.md}) {
        padding: 0px;
    }
`;

const rules = {
    name: [{ required: true, message: 'Please input your fullname!' }],
    cc: [{ required: true, message: 'Please input your ID or passport!' }],
    phone: [{ required: true, message: 'Please input your phone number!' }],
    country: [{ required: true, message: 'Please input your origin Country!' }],
    email: [{ required: true, message: 'Please input your Email!' }, { type: "email" }],
};


function Client({ text }) {
    var placeholder = text.placeholder.client;

    return (
        <Container>
            <TitleContainer title={text.titles[3]} />
            <Row type="flex" gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label={placeholder.name} name="name" rules={rules.name}>
                        <TransparentInput size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label={placeholder.email} name="email" rules={rules.email}>
                        <TransparentInput size="large" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                    <Form.Item label={placeholder.cc} name="cc" rules={rules.cc}>
                        <TransparentInput size="large" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                    <Form.Item label={placeholder.phone} name="phone" rules={rules.phone}>
                        <TransparentInput size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={placeholder.country} name="country" rules={rules.country}>
                        <TransparentInput size="large" />
                    </Form.Item>
                </Col>

            </Row>
        </Container>
    )
}

export default withTheme(Client)