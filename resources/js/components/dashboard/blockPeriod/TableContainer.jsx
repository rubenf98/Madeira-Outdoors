import React from "react";
import styled, { withTheme } from "styled-components";
import Table from "../common/TableContainer";
import RowOperation from "../common/RowOperation";
import StopPropagation from "../common/StopPropagation"
import { PrimaryButton } from "../../helpers/style";

const Container = styled.section`
    width: 100%;
    padding: 50px;
    box-sizing: border-box;
`;

const ActionButton = styled.div`

        width: 80px;
        height: 40px;
        flex: 1;
        float: right;
        background: ${props => props.background};
        cursor: pointer;
        padding: 10px;

        &:hover {
        }

        img {
            height: 100%;
            margin: auto;
            display: block;
        }
    
    
`;


function TableContainer({ theme, loading, meta, data, onDelete, setVisible, handlePageChange }) {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 100,
            fixed: 'left',
        },
        {
            title: 'DESDE',
            dataIndex: 'from',
        },
        {
            title: 'ATÉ',
            dataIndex: 'to',
        },
        {
            title: 'ATIVIDADES',
            dataIndex: 'activities',
            render: (activities) => activities.map((activity) => (
                <span>{activity.id}, </span>
            ))
        },
        {
            title: 'NOTAS',
            dataIndex: 'notes',
        },
        {
            title: 'Ações',
            dataIndex: 'id',
            render: (text, row) => (
                <StopPropagation>
                    <RowOperation
                        onDeleteConfirm={() => onDelete(row.id)}
                    />
                </StopPropagation>
            ),
        },
    ];

    return (
        <Container>

            <PrimaryButton
                onClick={() => setVisible(true)}
                style={{ float: "right", marginBottom: "10px" }} type="primary"
                loading={loading}
            >
                Adicionar
            </PrimaryButton>

            <Table
                loading={loading}
                data={data}
                meta={meta}
                columns={columns}
                handlePageChange={handlePageChange}
            />
        </Container>
    )
}

export default withTheme(TableContainer);
