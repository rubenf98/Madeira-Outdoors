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
    const { currentId, drawerState, data } = props;

    useEffect(() => {
        if (currentId && drawerState) {
            props.fetchReservation(currentId);
        }
    }, [currentId, drawerState])


    const FieldContainer = ({ name, value, width }) => (
        <Field className='field-width' width={width}>
            <p><span className='name'>{name}:</span> <span className='value'>{value}</span></p>
        </Field>
    )



    function EmptyField(field) {
        return field ? field : "N/A"
    }
    console.log(data);

    return (
        <Drawer destroyOnClose closable={false} width={720} open={drawerState} onClose={() => props.setDrawerState(0)}>
            <Row type="flex" dire>
                <Col xs={24}>

                    <Section><h3>Informação geral</h3> <div className='underline' /></Section>

                    <FieldsContainer width="50%">
                        <FieldContainer name="Identificador" value={"#" + data.id} />
                        <FieldContainer name="Número de confirmação" value={data.token} />
                        <FieldContainer name="Estado da reserva" value={<Tag color={data.status == "confirmado" ? "success" : data.status == "pendente" ? "warning" : "error"}>{data.status}</Tag>} />

                        <FieldContainer name="Data da reserva" value={dayjs(data.created_at).format('DD-MM-YYYY HH:mm')} />
                        <FieldContainer name="Data da atividade" value={dayjs(data.date).format('DD-MM-YYYY HH:mm')} />
                        <FieldContainer name="Estado atual" value={data.status} />

                        <FieldContainer name="Método de pagamento" value={EmptyField(data.payment_method)} />

                        <Field className='field-width' >
                            <p>
                                <span className='name'>Atividiade:</span> <span className='value'>{data.activity?.name?.pt}</span> <Url to={"/painel/atividades/" + data.activity?.id}><img src='/icon/dashboard/link.svg' /></Url>
                            </p>

                        </Field>


                        <FieldContainer name="Pagamento" value={<Tag color={data.payed_at ? "success" : "warning"}>{data.payed_at ? "Pago" : "Pendente"}</Tag>} />
                        <FieldContainer name="Total" value={data.price + "€"} />

                        <FieldContainer width="100%" name="Notas" value={EmptyField(data.notes)} />

                    </FieldsContainer>
                </Col>

                <Col xs={24}>
                    <Section><h3>Cliente <Url to={"/painel/clientes/" + data.client?.id}><img src='/icon/dashboard/link.svg' /></Url></h3> <div className='underline' /></Section>
                    <FieldsContainer width="50%">
                        <FieldContainer name="Nome" value={data.client?.name} />
                        <FieldContainer name="Telefone" value={data.client?.phone} />

                        <FieldContainer name="Email" value={data.client?.email} />
                        <FieldContainer name="ID/Passporte" value={EmptyField(data.client?.cc)} />

                        <FieldContainer name="País" value={EmptyField(data.client?.country)} />
                    </FieldsContainer>
                </Col>





                <ButtonContainer>


                    <Row type="flex" justify='end' gutter={16}>
                        {/* <SecundaryButton>
                            <Download primary={false} onClick={() => props.downloadContract(data.token)}><p>Contrato</p></Download>
                        </SecundaryButton> */}
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