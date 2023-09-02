import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col, InputNumber, Select, Upload } from 'antd';
import { connect } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import { updateActivity, createActivity } from "../../../redux/activity/actions";
import CategoryRemoteSelectContainer from "../category/CategoryRemoteSelectContainer";


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

const ImageContainer = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin: 5px 0px;
    img {
        width: 60px;
    }
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

const timeOptions = [
    { label: "00:00", value: "00:00" },
    { label: "00:30", value: "00:30" },
    { label: "01:00", value: "01:00" },
    { label: "01:30", value: "01:30" },
    { label: "02:00", value: "02:00" },
    { label: "02:30", value: "02:30" },
    { label: "03:00", value: "03:00" },
    { label: "03:30", value: "03:30" },
    { label: "04:00", value: "04:00" },
    { label: "04:30", value: "04:30" },
    { label: "05:00", value: "05:00" },
    { label: "05:30", value: "05:30" },
    { label: "06:00", value: "06:00" },
    { label: "06:30", value: "06:30" },
    { label: "07:00", value: "07:00" },
    { label: "07:30", value: "07:30" },
    { label: "08:00", value: "08:00" },
    { label: "08:30", value: "08:30" },
    { label: "09:00", value: "09:00" },
    { label: "09:30", value: "09:30" },
    { label: "10:00", value: "10:00" },
    { label: "10:30", value: "10:30" },
    { label: "11:00", value: "11:00" },
    { label: "11:30", value: "11:30" },
    { label: "12:00", value: "12:00" },
    { label: "12:30", value: "12:30" },
    { label: "13:00", value: "13:00" },
    { label: "13:30", value: "13:30" },
    { label: "14:00", value: "14:00" },
    { label: "14:30", value: "14:30" },
    { label: "15:00", value: "15:00" },
    { label: "15:30", value: "15:30" },
    { label: "16:00", value: "16:00" },
    { label: "16:30", value: "16:30" },
    { label: "17:00", value: "17:00" },
    { label: "17:30", value: "17:30" },
    { label: "18:00", value: "18:00" },
    { label: "18:30", value: "18:30" },
    { label: "19:00", value: "19:00" },
    { label: "19:30", value: "19:30" },
    { label: "20:00", value: "20:00" },
    { label: "20:30", value: "20:30" },
    { label: "21:00", value: "21:00" },
    { label: "21:30", value: "21:30" },
    { label: "22:00", value: "22:00" },
    { label: "22:30", value: "22:30" },
    { label: "23:00", value: "23:00" },
    { label: "23:30", value: "23:30" },
];

function FormContainer({ loading, edit, handleClose, updateActivity, visible, current, createActivity }) {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [banner, setBanner] = useState(undefined);
    const [uploading, setUploading] = useState(false);
    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const createFormData = (values) => {
        var formData = new FormData();
        if (banner) {
            formData.append('banner', banner);
        }

        formData.append('name_pt', values.name_pt);
        formData.append('name_en', values.name_en);
        formData.append('category_id', values.category_id);
        formData.append('price', values.price);
        formData.append('limit', values.limit);
        formData.append('duration', values.duration);
        formData.append('description1_pt', values.description1_pt);
        formData.append('description1_en', values.description1_en);
        formData.append('description2_pt', values.description2_pt);
        formData.append('description2_en', values.description2_en);
        formData.append('included_pt', values.included_pt);
        formData.append('included_en', values.included_en);
        formData.append('material_pt', values.material_pt);
        formData.append('material_en', values.material_en);

        for (var i = 0; i < values.hours.length; i++) {
            formData.append('hours[]', values.hours[i]);
        }
        for (var i = 0; i < values.days.length; i++) {
            formData.append('days[]', values.days[i]);
        }
        if (fileList.length) {
            for (var i = 0; i < fileList.length; i++) {
                formData.append('images[]', fileList[i]);
            }
        }


        return formData
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            if (edit) {
                var formData = createFormData(values);
                formData.append('_method', 'PUT');
                updateActivity(current.id, formData);
            } else {
                var formData = createFormData(values);
                createActivity(formData);
            }

            handleModalClose();
        })
    };

    useEffect(() => {
        if (visible && edit) {
            if (edit) {
                var initHours = [];
                var initDays = [];
                current.hours.map((hour) => {
                    initHours.push(hour.hour)
                })

                if (current.days) {
                    let days = new Array(7);
                    days.fill(0)

                    days.map((_, index) => {
                        if (current.days[index]) {
                            initDays.push(index)
                        }
                    })
                }


                form.setFieldsValue({
                    name_pt: current?.name?.pt,
                    name_en: current?.name?.en,
                    category_id: current?.category?.id,
                    price: current.price,
                    limit: current.limit,
                    duration: current.duration?.pt,
                    description1_pt: current?.description1?.pt,
                    description1_en: current?.description1?.en,
                    description2_pt: current?.description2?.pt,
                    description2_en: current?.description2?.en,
                    included_pt: current?.included?.pt,
                    included_en: current?.included?.en,
                    material_pt: current?.material?.pt,
                    material_en: current?.material?.en,
                    hours: initHours,
                    days: initDays
                })
            } else {
                form.setFieldsValue({
                    name_pt: undefined,
                    name_en: undefined,
                    category_id: undefined,
                    price: undefined,
                    limit: undefined,
                    duration: undefined,
                    description1_pt: undefined,
                    description1_en: undefined,
                    description2_pt: undefined,
                    description2_en: undefined,
                    included_pt: undefined,
                    included_en: undefined,
                    material_pt: undefined,
                    material_en: undefined,
                    hours: undefined,
                    days: undefined
                })
            }

        }
    }, [visible])
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

                            <Col span={12}>
                                <Form.Item rules={rules.registration} name="name_pt" label="Nome (PT)">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.registration} name="name_en" label="Nome (EN)">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.category} label="Categoria" name="category_id">
                                    <CategoryRemoteSelectContainer />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item rules={rules.people} name="price" label="Preço">
                                    <InputNumber style={{ width: "100%" }} addonAfter="€" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.people} name="duration" label="Duração">
                                    <Select style={{ width: "100%" }}
                                        options={[
                                            {
                                                value: 'Meio dia',
                                                label: 'Meio dia',
                                            },
                                            {
                                                value: 'Dia completo',
                                                label: 'Dia completo',
                                            },
                                        ]} />

                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.registration} name="days" label="Disponibilidade semanal">
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        options={[
                                            {
                                                label: "Domingo",
                                                value: 0,
                                            },
                                            {
                                                label: "Segunda",
                                                value: 1,
                                            },
                                            {
                                                label: "Terça",
                                                value: 2,
                                            },
                                            {
                                                label: "Quarta",
                                                value: 3,
                                            },
                                            {
                                                label: "Quinta",
                                                value: 4,
                                            },
                                            {
                                                label: "Sexta",
                                                value: 5,
                                            },
                                            {
                                                label: "Sábado",
                                                value: 6,
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.registration} name="hours" label="Disponibilidade horária">
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        options={timeOptions}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.people} name="limit" label="Capacidade de participantes">
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.registration} name="description1_pt" label="Sobre (PT)">
                                    <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.registration} name="description1_en" label="Sobre (EN)">
                                    <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item rules={rules.registration} name="description2_pt" label="Descrição (PT)">
                                    <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.registration} name="description2_en" label="Descrição (EN)">
                                    <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item rules={rules.registration} name="included_pt" label="Incluído (PT - separado por vírgulas)">
                                    <TextArea placeholder="e.g., Wind breaker,Camera,Bathing suit,Beach towel,Sun cream,Personal insurance" autoSize={{ minRows: 2, maxRows: 2 }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.registration} name="included_en" label="Incluído (EN - separado por vírgulas)">
                                    <TextArea placeholder="e.g., Wind breaker,Camera,Bathing suit,Beach towel,Sun cream,Personal insurance" autoSize={{ minRows: 2, maxRows: 2 }} />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item rules={rules.registration} name="material_pt" label="Material (PT - separado por vírgulas)">
                                    <TextArea placeholder="e.g., Bathing suit,Beach towel,Sun cream" autoSize={{ minRows: 2, maxRows: 2 }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.registration} name="material_en" label="Material (EN - separado por vírgulas)">
                                    <TextArea placeholder="e.g., Bathing suit,Beach towel,Sun cream" autoSize={{ minRows: 2, maxRows: 2 }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <p>Imagem de capa (1)</p>
                                <Upload
                                    maxCount={1}
                                    onRemove={() => setBanner(undefined)}
                                    beforeUpload={(file) => {
                                        const isLt5M = file.size / 1024 / 1024 < 5;
                                        if (isLt5M) {
                                            setBanner(file);
                                        }
                                        return false;
                                    }}
                                >
                                    <button type="button">Upload</button>
                                </Upload>
                                <ImageContainer>
                                    {(edit && !banner) && <img className="img-upload" src={current.image} />}
                                </ImageContainer>
                                <p className="ant-upload-hint">
                                    Suporte para uma imagem jpeg que irá ser utilizada na capa da atividade (max 5Mb).
                                </p>
                            </Col>

                            <Col span={12}>
                                <p>Fotografias (max. 9)</p>
                                <Upload
                                    maxCount={9}
                                    multiple
                                    onRemove={(file) => {
                                        const index = fileList.indexOf(file);
                                        const newFileList = fileList.slice();
                                        newFileList.splice(index, 1);
                                        setFileList(newFileList);
                                    }}
                                    beforeUpload={(file, aFileList) => {
                                        if (file == aFileList[0]) {
                                            var validatedFileList = [];
                                            aFileList.map((currentFile) => {
                                                const isLt1M = currentFile.size / 1024 / 1024 < 1;
                                                if (isLt1M) {
                                                    validatedFileList.push(currentFile);
                                                }
                                            })
                                            setFileList(validatedFileList);
                                        }
                                        return false;
                                    }}
                                >
                                    <button type="button">Upload</button>

                                </Upload>
                                <ImageContainer>
                                    {(edit && fileList.length == 0) && current.images.map((image) => (<img className="img-upload" src={image.path} />))}
                                </ImageContainer>
                                <p className="ant-upload-hint"> Suporta entre 1 a 9 ficheiros jpeg com 1Mb de tamanho máximo para cada fotografia. </p>
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
        loading: state.activity.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateActivity: (id, data) => dispatch(updateActivity(id, data)),
        createActivity: (data) => dispatch(createActivity(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);