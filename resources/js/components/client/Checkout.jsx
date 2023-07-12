import { Form, Radio, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { borderRadius, dimensions } from '../../helper';
import Addons from './form/Addons';
import Client from './form/Client';
import Driver from './form/Driver';
// import GeneralInfo from './form/GeneralInfo';
import { useNavigate, useSearchParams } from 'react-router-dom'

import { connect } from "react-redux";
import dayjs from "dayjs";
import { fetchAvailableCar } from "../../redux/carCategory/actions";
import { createReservation, setCurrentErrors, setCurrentReservation } from "../../redux/reservation/actions";
import { fetchExtras } from '../../redux/extra/actions';
import { getCarPrice, getPriceRounded, getDaysDifference } from './form/functions';
import AlertContainer from './form/common/AlertContainer';
import Navbar from './form/Navbar';
import { PrimaryButton } from '../helpers/style';
import GeneralInfo from './form/GeneralInfo';


const Container = styled.section`
    width: 100%;
    margin: auto;
    
    @media (max-width: ${dimensions.md}) {
        box-sizing: border-box;
        padding: 0px 20px;
    }

    @media (max-width: ${dimensions.md}) {
        margin: 100px 0px;
    }

`;

const FormContainer = styled(Form)`
    width: 60%;
    padding: 0px 50px 0px 0px;
    box-sizing: border-box;
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

const ButtonContainer = styled.div`
    //
`;

const Details = styled.div`
    position: sticky;
    top: 150px;
    margin-top: 180px;
    width: 40%;
    position: -webkit-sticky;
    background-color: #fff;
    border-radius: ${borderRadius};
    padding: 0 30px;

    img {
        position: absolute;
        top: -180px;
        right: 0;
        width: 70%;
    }


    h3 {
        text-transform: uppercase;
        font-size: 24px;
        font-weight: 400;
        margin-top: 150px;
        margin-bottom: 0px;

        span {
            color: ${({ theme }) => theme.primary};
        }
    }

    

    h4 {
        color: ${({ theme }) => theme.primary};
        margin: 0px;
        flex: 1;
    }

   
    .subtotal-container {
        display: flex;
        align-items: center;
        margin: 20px 0px;

        .field {
        color: black;
        font-weight: 400;
    }

        .subtotal-title {
            font-weight: bold;
        }
    }
    .separator {
        height: 2px;
        width: 100%;
        background-color: #cecece;
        margin: 30px 0px;
    }

    p {
        margin-top: 0px;
        font-weight: 400;
        font-size: 16px;
        opacity: .8;
    }

    .small {
        font-size: 12px;
        margin-bottom: 0px;
    }
    .price {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 36px;
        margin-bottom: 0px;
    }

    @media (max-width: ${dimensions.lg}) {

        h3 {
            font-size: 18px;
        }

        .price {
            font-size: 36px;
        }
    }
`;

const PaymentContainer = styled.section`

    margin: 120px auto;

    @media (max-width: ${dimensions.md}) {
        padding: 0px;
    }
`;


const Payment = styled.li`
    display: flex;
    align-items: center;
    font-size: 16px;
    text-align: center;
    flex: 1;
    box-sizing: border-box;
    margin: 0px;
    

    img {
        width: 40px;
    } 

`;

function Checkout(props) {
    const { language, fetchAvailableCar, extrasData, currentReservation, currentErrors, currentCar, loadingCar, createReservation, setCurrentErrors } = props;
    const { text } = require('../../../assets/' + props.language + "/checkout");
    const [dates, setDates] = useState([undefined, undefined]);
    const [form] = Form.useForm();

    const [extras, setExtras] = useState([])
    const [extraPrice, setExtraPrice] = useState(0)

    const [activeInsurance, setActiveInsurance] = useState({ id: 1, price: 0, name: { pt: "Básico", en: "Basic" } })
    const [activePayment, setActivePayment] = useState(1)

    const [price, setPrice] = useState(0)
    const [days, setDays] = useState(1)

    let navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        var from = searchParams.get("from");
        var to = searchParams.get("to");

        if (from && to) {
            handleDate(dayjs(from + " 09:00", 'DD-MM-YYYY HH:mm'), dayjs(to + " 12:00", 'DD-MM-YYYY HH:mm'), true);
            fetchAvailableCar({ car_category_id: 1, date: [from, to] });

        } else {
            navigate("/");
        }
        // if (!Object.values(currentCar).length) {
        //     navigate("/");
        // } else {
        //     if (currentReservation.date) {
        //         handleReturn();
        //     }
        // }
    }, [])

    const handleReturn = () => {
        if (currentReservation.date) {
            if (currentReservation.date.length == 2) {
                var newExtras = [], newExtraPrice = 0;

                currentReservation.extras.map((element) => {
                    var extra = extrasData.find((currentExtra) => currentExtra.id == element);

                    newExtras.push(extra.id);
                    newExtraPrice += extra.price;
                });


                setActivePayment(currentReservation.payment_method);
                handleDate(dayjs(currentReservation.date[0]), dayjs(currentReservation.date[1]));

                var difference = getDaysDifference(currentReservation.date[0], currentReservation.date[1]);
                setExtras(newExtras);
                setExtraPrice(newExtraPrice * difference);
            }
        }
    };

    useEffect(() => {
        if (dates[0] && dates[1]) {
            handleDate(dates[0], dates[1], false);
            getDaysDifference(dates[0], dates[1]);
        } else {
            if (price != 0) {
                setPrice(0);
            }
        }
    }, [dates])

    useEffect(() => {
        if (currentCar.id) {
            var value = getCarPrice(currentCar.prices, days);
            setPrice(value);
        }

    }, [currentCar])


    const handleDate = (from, to, initDate) => {
        var difference = getDaysDifference(from, to);
        console.log(difference)
        // var factors = getPromotions(promotions, from, difference, currentCar.level.id);

        if (initDate) {
            setDates([from, to])
        }
        setDays(difference);


    };


    const onFinish = () => {
        form.validateFields().then((values) => {
            var formData = {
                ...values,
                extras: extras,
                date: [dayjs(dates[0]).format('YYYY-MM-DD'), dayjs(dates[1]).format('YYYY-MM-DD')],
                payment_method: activePayment,
                insurance_id: activeInsurance.id,
                car_category_id: currentCar.id
            };

            createReservation(formData).then((response) => {
                if (response.action.payload.data.transactionStatus == "Success") {
                    window.location.href = response.action.payload.data.redirectUrl;
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

    const SubtotalContainer = ({ title, field, price }) => (
        <div className='subtotal-container'>
            {title ? <h4>{title}</h4> : <h4 className='field'>{field}</h4>}
            {title ? <div className='subtotal-title'>subtotal</div> : <div>{price}€</div>}

        </div>
    )
    console.log(activePayment)
    return (
        <Container>
            <Navbar />
            <Content>

                <FormContainer
                    form={form}
                    scrollToFirstError
                    name="reservation"
                    layout="vertical"
                    requiredMark={false}
                    initialValues={currentReservation}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <AlertContainer
                        currentErrors={currentErrors}
                        title={text.error}
                        onClose={() => props.setCurrentErrors([])}
                    />
                    <GeneralInfo
                        text={text}
                        dates={dates} setDates={setDates}
                    />
                    <Addons
                        text={text}
                        days={days}
                        extras={extras} setExtras={setExtras}
                        extraPrice={extraPrice} setExtraPrice={setExtraPrice}
                        activeInsurance={activeInsurance} setActiveInsurance={setActiveInsurance}
                    />
                    <Client text={text} />
                    <Driver text={text} />

                    <PaymentContainer>
                        <Radio.Group onChange={(e) => setActivePayment(e.target.value)} value={activePayment}>
                            <Space direction="vertical">
                                {text.payments.map((payment) => (
                                    <Radio key={payment.id} value={payment.id}>
                                        <img src={payment.image} alt="" />
                                        <span>{payment.name}</span>

                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    </PaymentContainer>
                    <ButtonContainer>
                        <PrimaryButton>{text.button}</PrimaryButton>
                    </ButtonContainer>
                </FormContainer>
                <Details visible={price}>
                    <img src={currentCar.image} alt="" />

                    <h3>cost for <span>{days} days</span></h3>
                    <div>{dayjs(dates[0]).format('DD MMM YYYY HH:mm')} - {dayjs(dates[1]).format('DD MMM YYYY HH:mm')}</div>

                    <div className='separator' />

                    <h4>Pickup & drop off locations</h4>
                    <p>{text.notice}</p>

                    <div className='separator' />

                    <SubtotalContainer title="Campervan" />
                    <SubtotalContainer field="Model A" price={price} />

                    <div className='separator' />

                    <SubtotalContainer title="Insurance" />
                    <SubtotalContainer field={activeInsurance.name[props.language] + " package"} price={activeInsurance.price * days} />

                    <div className='separator' />

                    {extras.length ?
                        <>
                            <SubtotalContainer title="Extras" />
                            {extras.map((currentExtra) => {
                                const hasData = extrasData.find(({ id }) => {
                                    return id === currentExtra;
                                })
                                if (hasData) {
                                    return <SubtotalContainer key={hasData.id} field={hasData.name[language]} price={hasData.type === "day" ? hasData.price * days : hasData.price} />
                                }
                            })}

                            <div className='separator' />
                        </>
                        : <></>}

                    <SubtotalContainer field="TOTAL" price={getPriceRounded(price + extraPrice + (activeInsurance.price * days))} />

                </Details>
            </Content>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentReservation: (data) => dispatch(setCurrentReservation(data)),
        fetchExtras: () => dispatch(fetchExtras()),
        setCurrentErrors: (data) => dispatch(setCurrentErrors(data)),
        fetchAvailableCar: (filters) => dispatch(fetchAvailableCar(filters)),
        createReservation: (data) => dispatch(createReservation(data)),
        setCurrentErrors: (data) => dispatch(setCurrentErrors(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        currentCar: state.carCategory.currentCar,
        loadingCar: state.carCategory.loadingCar,
        extrasData: state.extra.data,
        loadingExtras: state.extra.loading,
        language: state.application.language,
        currentReservation: state.reservation.current,
        currentErrors: state.reservation.errors,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);