import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Col, Drawer, Input, Row, Tag } from 'antd';
import { connect } from 'react-redux';
import {
    downloadContract, fetchReservation, downloadInvoice, fetchCard,
    getCard, setCard
} from '../../../redux/reservation/actions';
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import { PrimaryButton, SecundaryButton } from '../../helpers/style';

const Section = styled.div`
    margin-top: 30px;

    h3 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 0px;
    }
    
    .underline {
        width: 60px;
        height: 4px;
        background-color: ${({ theme }) => theme.primary} ;
        margin-bottom: 30px;
    }
`;

const Field = styled.div`
    padding: 5px 5px 5px 0px;
    box-sizing: border-box;
    display: inline;
    width: ${props => props.width && props.width + " !important"};

    p {
        margin: 0px;
    }

    .value {
        opacity: .7;
    }

    .name {
        
    }
`;

const FieldsContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 35px;
    box-sizing: border-box;

    .field-width {
        width: ${props => props.width};
    }
`;

const Download = styled.div`
    font-weight: bold;
    display: flex;
    justify-content: center;
    gap: 5px;
    align-items: center;
    font-size: 16px;
    box-sizing: border-box;

    svg {
        width: 16px;
        fill: ${props => props.primary ? "#fff" : "#7b2cbf"} ;
    }

    p {
        margin: 0px;
        color: ${props => props.primary ? "#fff" : "#7b2cbf"} ;
    }

    &:hover {
        p {
            color: ${props => props.primary ? "#fff" : "#7b2cbf"} ;
        }  
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    gap: 15px;
    width: 100%;

    
`;

const Url = styled(Link)`
    img {
        width: 15px;
        height: 15px;
    }
    
`;

function DrawerContainer(props) {
    const { currentId, drawerState, data, card } = props;
    const [hasClickedCard, setHasClickedCard] = useState(false)

    useEffect(() => {
        if (currentId && drawerState) {
            setHasClickedCard(false);
            props.setCard({});
            props.fetchReservation(currentId);
        }
    }, [currentId, drawerState])


    const FieldContainer = ({ name, value, width }) => (
        <Field className='field-width' width={width}>
            <p>
                <span className='name'>{name}:</span> <span className='value'>{value}</span>
            </p>

        </Field>
    )

    const handleGetCard = (id) => {
        props.getCard(id);
        setHasClickedCard(true);
    }



    function EmptyField(field) {
        return field ? field : "N/A"
    }


    return (
        <Drawer destroyOnClose closable={false} width={"60%"} open={drawerState} onClose={() => props.setDrawerState(0)}>
            <Row type="flex" dire>
                <Col xs={24}>

                    <Section><h3>Informação geral</h3> <div className='underline' /></Section>

                    <FieldsContainer width="25%">
                        <FieldContainer name="Identificador" value={"#" + data.id} />
                        <FieldContainer name="Número de confirmação" value={data.token} />
                        <FieldContainer width="50%" name="Estado da reserva" value={<Tag color={data.status == "confirmado" ? "success" : data.status == "pendente" ? "warning" : "error"}>{data.status}</Tag>} />

                        <FieldContainer name="Data da reserva" value={dayjs(data.created_at).format('DD-MM-YYYY HH:mm')} />
                        <FieldContainer name="Levantamento" value={dayjs(data.pickup_date).format('DD-MM-YYYY HH:mm')} />
                        <FieldContainer name="Entrega" value={dayjs(data.return_date).format('DD-MM-YYYY HH:mm')} />
                        <FieldContainer name="Número de dias" value={data.days} />

                        <FieldContainer name="Estado atual" value={data.current_status} />
                        <FieldContainer name="Método de pagamento" value={EmptyField(data.payment_method)} />


                        <Field className='field-width' >
                            <p>
                                <span className='name'>Viatura:</span> <span className='value'>{data.car?.category?.title + " (" + data.car?.registration + ")"}</span> <Url to={"/painel/carros/" + data.car?.id}><img src='/icon/dashboard/link.svg' /></Url>
                            </p>

                        </Field>


                        <FieldContainer name="Pagamento" value={<Tag color={data.payed_at ? "success" : "warning"}>{data.payed_at ? "Pago" : "Pendente"}</Tag>} />
                        <FieldContainer name="Seguro" value={data?.insurance?.name?.pt} />

                        <FieldContainer width="100%" name="Notas" value={EmptyField(data.notes)} />

                    </FieldsContainer>
                </Col>
                <Col xs={12}>
                    <Section><h3>Preçário</h3> <div className='underline' /></Section>
                    <FieldsContainer width="50%">
                        <FieldContainer name="Valor aluguer" value={data.car_price + "€"} />
                        <FieldContainer name="Preço unitário" value={data.car_price_per_day + "€"} />
                        <FieldContainer name="Valor extras/seguro" value={(Math.round((data.price - data.car_price) * 100 + Number.EPSILON) / 100) + "€"} />
                        <FieldContainer name="Total" value={data.price + "€"} />
                    </FieldsContainer>
                </Col>

                <Col xs={24}>
                    <Section><h3>Cliente <Url to={"/painel/clientes/" + data.client?.id}><img src='/icon/dashboard/link.svg' /></Url></h3> <div className='underline' /></Section>
                    <FieldsContainer width="25%">
                        <FieldContainer name="Nome" value={data.client?.name} />
                        <FieldContainer name="Telefone" value={data.client?.phone} />
                        <FieldContainer name="Email" value={data.client?.email} />

                        <FieldContainer name="ID/Passporte" value={EmptyField(data.client?.cc)} />
                        <FieldContainer name="País" value={EmptyField(data.client?.country)} />
                    </FieldsContainer>
                </Col>

                {/* <Col span={24}>
                    <Section><h3>Condutor(es)</h3> <div className='underline' /></Section>
                    <Row type="flex" dire>

                        {data.drivers && data.drivers.map((driver, index) => (
                            <Col key={"driver-" + index} span={12}>
                                <h2>{index == 0 ? "Principal" : "Adicional"}</h2>
                                <FieldsContainer width="50%">
                                    <FieldContainer name="Nome" value={EmptyField(driver.name)} />
                                    <FieldContainer name="Data de nascimento" value={EmptyField(driver.birthday)} />
                                    <FieldContainer name="Número carta de condução" value={EmptyField(driver.license)} />
                                </FieldsContainer>
                            </Col>
                        ))}
                    </Row>
                </Col> */}

                <Col style={{ marginBottom: "50px" }} span={24}>
                    <Section><h3>Extras e/ou taxas</h3> <div className='underline' /></Section>
                    {data.extras && data.extras.length ?
                        <ul>
                            {data.extras.map((extra, index) => (
                                <li key={"extra-" + index} >
                                    {extra.name.pt}
                                </li>
                            ))}
                        </ul>
                        : <p>N/A</p>
                    }
                </Col>

                {/* {(hasClickedCard && card.number) &&
                    <Col xs={24}>
                        <Section>Cartão</Section>
                        <FieldsContainer width="25%">
                            <FieldContainer name="Nº cartão" value={card.number} />
                            <FieldContainer name="Validade" value={card.validity} />
                            <FieldContainer name="CVV" value={card.cvv} />
                        </FieldsContainer>
                    </Col>
                } */}

                <ButtonContainer>

                    {hasClickedCard ?
                        <Input.Search size="large" style={{ maxWidth: "350px" }} onSearch={(e) => props.fetchCard(e)} placeholder="PIN" />
                        : <SecundaryButton><Download primary={false} onClick={() => handleGetCard(data.card_id)}><p>Obter dados do cartão</p></Download></SecundaryButton>
                    }

                    <Row type="flex" justify='end' gutter={16}>
                        <SecundaryButton>
                            <Download primary={false} onClick={() => props.downloadContract(data.token)}><p>Contrato</p></Download>
                        </SecundaryButton>
                        <PrimaryButton>
                            <Download primary={true} onClick={() => props.downloadInvoice(data.token)}><p>Resumo</p></Download>
                        </PrimaryButton>
                    </Row>
                </ButtonContainer>


            </Row>
        </Drawer >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        downloadInvoice: (token) => dispatch(downloadInvoice(token)),
        downloadContract: (token) => dispatch(downloadContract(token)),
        fetchReservation: (id) => dispatch(fetchReservation(id)),
        fetchCard: (token) => dispatch(fetchCard(token)),
        getCard: (id) => dispatch(getCard(id)),
        setCard: (data) => dispatch(setCard(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        loadingDownload: state.reservation.loadingDownload,
        loading: state.reservation.loading,
        data: state.reservation.current,
        card: state.reservation.card,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);