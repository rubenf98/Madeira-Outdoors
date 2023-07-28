import React, { useEffect, useState } from 'react'
import Header from './common/Header'
import { fetchActivity } from '../../redux/activity/actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import { Col, DatePicker, Form, Input, InputNumber, Row, Select, TimePicker } from 'antd';
import { borderRadius, dimensions } from '../../helper';
import TextArea from 'antd/es/input/TextArea';
import { createReservation } from '../../redux/reservation/actions';
import dayjs from 'dayjs';

const FormContainer = styled(Form)`
    
    position: sticky;
    top: 50px;
    margin-top: -150px;
    width: 40%;
    position: -webkit-sticky;
    background-color: #fff;
    border-radius: ${borderRadius};

    .price {
        height: 150px;
        background-color: ${({ theme }) => theme.primary};
        color: white;
        border-top-left-radius: ${borderRadius};
        border-top-right-radius: ${borderRadius};
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        text-transform: uppercase;

        div {
            .value {
                font-size: clamp(30px, 3vw, 65px);
                font-weight: bold;
            }
        }
        
        
    }

    .form {
        padding: 30px;
        box-sizing: border-box;
        border: 1px solid black;
        border-top: 0px;
        border-bottom-left-radius: ${borderRadius};
        border-bottom-right-radius: ${borderRadius};
    }
`;

const Content = styled.div`
    width: 100%;
    max-width: 1440px;
    margin: auto;
    display: flex;
    align-items: start;
    overflow: visible;
    margin-bottom: 100px;
    
    @media (max-width: ${dimensions.md}) {
        box-sizing: border-box;
        padding: 0px 20px;
    }

    @media (max-width: ${dimensions.md}) {
        margin: 100px 0px;
    }

`;

const Button = styled.button`
    cursor: pointer;
    background-color: ${({ theme }) => theme.primary};
    border: 0px;
    color: white;
    width: 100%;
    border: 0px;
    padding: 30px 0px;
    box-sizing: border-box;
    border-radius: ${borderRadius};
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 20px;
`;

const Details = styled.div`
    
    width: 60%;
    padding: 0px 50px 0px 0px;
    box-sizing: border-box;

    .galery {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 50px 0px;
        gap: 50px;

        img {
            box-sizing: border-box;
            width: calc(33% - 35px);
            border-radius: ${borderRadius};
        }
    }

    .flex {
        display: flex;
        justify-content: space-between;

        .container {
            width: 50%;

            h2 {
                font-size: 20px;
            }
        }
    }

    p, ul {
        margin: 50px 0px;
        font-size: 18px;
    }

    h1 {
        font-size: clamp(30px, 3vw, 40px);
        margin: 50px 0px 30px 0px;
    }
    
`;
const requiredField =
{
    en: [
        {
            required: true,
            message: 'Please fill all required fields',
        }
    ],
    pt: [
        {
            required: true,
            message: 'Preeencha todos os campos obrigatórios',
        }
    ],
};

function Activity(props) {
    const { activityId } = useParams();
    const [form] = Form.useForm();
    const [price, setPrice] = useState(undefined)

    useEffect(() => {
        props.fetchActivity(activityId);
    }, [])

    const onFinish = () => {
        form.validateFields().then((values) => {
            console.log(values);
            // var formData = {
            //     ...values,
            //     extras: extras,
            //     date: [dayjs(dates[0]).format('YYYY-MM-DD'), dayjs(dates[1]).format('YYYY-MM-DD')],
            //     payment_method: activePayment,
            //     insurance_id: activeInsurance.id,
            //     car_category_id: currentCar.id
            // };

            props.createReservation({
                ...values,
                activity_id: activityId,
                date: dayjs(values.date).format('YYYY-MM-DD'),
                payment_method: 1
            }).then((response) => {
                if (response.action.payload.data.transactionStatus == "Success") {
                    //window.location.href = response.action.payload.data.redirectUrl;
                } else {
                    // navigate("/error");
                }
            }).catch((errors) => {
                // setCurrentErrors(errors.response.data.errors);
            });
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    console.log(price)
    return (
        <div>
            <Header />
            <Content>


                {props.current.id &&
                    <Details >
                        <h1>{props.current.name[props.language]}</h1>
                        <p>{props.current.description1[props.language]}</p>
                        <p>{props.current.description2[props.language]}</p>

                        <div className='galery'>
                            {props.current.images.map((image) => (
                                <img key={image.id} src={image.path} alt="" />
                            ))}
                        </div>

                        <div className='flex'>
                            <div className='container'>
                                <h2>Na atividade está incluído</h2>
                                <ul>
                                    {props.current.included[props.language].split(",").map((included, index) => (
                                        <li key={index}>{included}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className='container'>
                                <h2>Material necessário</h2>
                                <ul>
                                    {props.current.material[props.language].split(",").map((material, index) => (
                                        <li key={index}>{material}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <p>Não sabe se esta atividade é para si? Quer saber mais sobre isso? Envie-nos uma mensagem no Whatsapp para +351 911 111 111 ou contacte-nos através do email info@madeiraoutdoors.com</p>
                    </Details>
                }
                <FormContainer
                    form={form}
                    scrollToFirstError
                    name="reservation"
                    layout="vertical"
                    requiredMark={false}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ activity_id: activityId }}
                >

                    <div className='price'>
                        <div>
                            {price
                                ? <span className='value'>{price}€</span>
                                : <><span>desde</span><span className='value'>{props.current.price}€</span></>
                            }

                        </div>
                    </div>
                    <div className='form'>
                        <Row gutter={16}>
                            <Col span={24}>
                                <h2>Contact information</h2>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={requiredField[props.language]} label="Name" name="name">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={requiredField[props.language]} label="Email" name="email">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={requiredField[props.language]} label="Phone" name="phone">
                                    <Input placeholder='' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={requiredField[props.language]} label="Country" name="country">
                                    <Input placeholder='' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <h2>Reservation details</h2>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={requiredField[props.language]} label="Date" name="date">
                                    <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" placeholder='DD-MM-YYYY' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={requiredField[props.language]} label="Participants (>12 years old)" name="participants">
                                    <Select
                                        onChange={(e) => setPrice(props.current.price * e)}
                                        options={[
                                            { value: 1, label: 1 },
                                            { value: 2, label: 2 },
                                            { value: 3, label: 3 },
                                            { value: 4, label: 4 },
                                            { value: 5, label: 5 },
                                            { value: 6, label: 6 },
                                            { value: 7, label: 7 },
                                            { value: 8, label: 8 },
                                            { value: 9, label: 9 },
                                            { value: 10, label: 10 },
                                            { value: 11, label: 11 },
                                            { value: 12, label: 12 },
                                            { value: 13, label: 13 },
                                            { value: 14, label: 14 },
                                            { value: 15, label: 15 },
                                            { value: 16, label: 16 },
                                            { value: 17, label: 17 },
                                            { value: 18, label: 18 },
                                            { value: 19, label: 19 },
                                            { value: 20, label: 20 },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="Additional Notes" name="description">
                                    <TextArea autoSize={{ minRows: 4, maxRows: 4 }} showCount maxLength={180} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button>
                            book now
                        </Button>
                    </div>
                </FormContainer>
            </Content>
        </div >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchActivity: (id) => dispatch(fetchActivity(id)),
        createReservation: (data) => dispatch(createReservation(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        language: state.application.language,
        current: state.activity.current,
        loading: state.activity.loading,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Activity);