import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col, InputNumber, Select, Upload, DatePicker } from 'antd';
import { connect } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { updateReservation, createReservation } from "../../../redux/reservation/actions";
import ActivityRemoteSelectContainer from "../activity/ActivityRemoteSelectContainer";
import dayjs from "dayjs";

const ButtonContainer = styled(Row)`
    padding: 30px 0px 10px 0;
`;

const Container = styled.div`
    background: white;
    border-radius: 5px;
    width: 100%;
`;

const Instruction = styled.h2`
    font-weight: bold;
    margin-top: 50px;
`;

const rules = {
    price: [
        {
            required: true,
            message: 'O preço é obrigatório',
        },
    ],
    name: [
        {
            required: true,
            message: 'O título do extra é obrigatório',
        },
    ],
    type: [
        {
            required: true,
            message: 'A tipologia de valor é obrigatória',
        },
    ],
};

function FormContainer({ loading, edit, handleClose, updateReservation, visible, current, createReservation }) {
    const [form] = Form.useForm();
    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            if (edit) {
                updateReservation(current.id, values);
            } else {
                createReservation(values);
            }

            handleModalClose();
        })
    };

    useEffect(() => {
        if (visible && edit) {
            if (edit) {
                form.setFieldsValue({
                    date: dayjs(current.date),
                    activity_id: current.activity.id,
                    payment_method: current.payment_method,
                    price: current.price,
                    status: current.status,
                    notes: current.notes,
                    participants: current.participants,
                    name: current?.client?.name,
                    email: current?.client?.email,
                    phone: current?.client?.phone,
                    country: current?.client?.country,
                })
            } else {
                form.setFieldsValue({
                    date: undefined,
                    activity_id: undefined,
                    payment_method: undefined,
                    price: undefined,
                    status: undefined,
                    notes: undefined,
                    participants: undefined,
                    name: undefined,
                    email: undefined,
                    phone: undefined,
                    country: undefined,
                })
            }

        }
    }, [visible])

    console.log(current)
    return (
        <Container>
            <div>
                <Modal
                    width={1200}
                    onCancel={handleModalClose}
                    open={visible}
                    footer={null}
                >
                    <Form
                        form={form}
                        name="extra"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Instruction>{edit ? "Edite os campos da atividade" : "Introduza uma nova atividade na plataforma"}</Instruction>
                        <Row gutter={16}>
                            <Col span={24}><h3>Dados da reserva</h3></Col>
                            <Col span={8}>
                                <Form.Item rules={rules.category} label="Atividade" name="activity_id">
                                    <ActivityRemoteSelectContainer />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.registration} name="date" label="Data">
                                    <DatePicker style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.registration} name="participants" label="Nº de participantes">
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item rules={rules.registration} name="payment_method" label="Método de pagamento">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.people} name="price" label="Preço">
                                    <InputNumber style={{ width: "100%" }} addonAfter="€" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.people} name="status" label="Estado">
                                    <Select style={{ width: "100%" }}
                                        options={[
                                            {
                                                value: 'pendente',
                                                label: 'Pendente',
                                            },
                                            {
                                                value: 'confirmado',
                                                label: 'Confirmado',
                                            },
                                            {
                                                value: 'cancelado',
                                                label: 'Cancelado',
                                            },
                                        ]} />

                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item rules={rules.registration} name="notes" label="Notas">
                                    <TextArea style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>

                            <Col span={24}><h3>Dados do cliente</h3></Col>
                            <Col span={6}>
                                <Form.Item rules={rules.registration} name="name" label="Nome">
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item rules={rules.registration} name="email" label="Email">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.registration} name="phone" label="Contacto">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.registration} name="country" label="País">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <ButtonContainer type="flex" justify="end">
                            <Button disabled={loading} loading={loading} size="large" width="150px" type="primary" htmlType="submit">
                                Submeter
                            </Button>
                        </ButtonContainer>
                    </Form>

                </Modal>
            </div>
        </Container >
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateReservation: (id, data) => dispatch(updateReservation(id, data)),
        createReservation: (data) => dispatch(createReservation(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);