import React from "react";
import styled from "styled-components";
import Table from "../common/CommonTable";
import { Tag } from 'antd';
import dayjs from "dayjs";
import { borderRadius } from "../../../helper";

const Container = styled.div`
    width: 50%;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: white;

    .ant-empty {
        margin: 0px !important;
    }

    .title {
        h2 {
            display: inline-block;
            font-weight: bold;
        }

        span {
            border: 1px solid #00000040;
            border-radius: 6px;
            font-size: 18px;
            margin-left: 5px;
            padding: 0px 5px;
        }
    }

    th {
        font-weight: bold !important;
        opacity: .6;
    }
`;


function TableContainer({ title, loading, data, meta, handlePageChange, handleRowClick }) {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <Tag color="blue">#{id}</Tag>,
        },
        {
            title: 'ATIVIDADE',
            dataIndex: 'activity',
            render: (activity) => activity.name.pt,
        },
        {
            title: 'DATA',
            dataIndex: 'date',
            render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
        },
        {
            title: 'ESTADO',
            dataIndex: 'status',
            render: (status) => <Tag color={status == "pendente" ? "warning" : status == "confirmado" ? "success" : "error"}>{status}</Tag>,
        },

    ];

    return (
        <Container>
            <div className="title">
                <h2>{title} </h2><span>{data ? data.length : 0}</span>
            </div>
            <Table
                loading={loading}
                data={data}
                meta={meta}
                columns={columns}
                handlePageChange={handlePageChange}
                onRow={(record) => ({
                    onClick: () => {
                        handleRowClick(record);
                    },
                })}
            />
        </Container>
    )
}

export default TableContainer;
