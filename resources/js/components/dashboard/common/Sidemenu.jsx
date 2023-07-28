import { Menu } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Logo = styled.img`
    width: 150px;
    margin: auto;
    display: block;
`;

const Container = styled.div`
    min-height: 100vh;
    width: 100px;

    .ant-menu {
        height: 100%;
        width: 100px;

        .ant-menu-item {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .icon {
            width: 22px;
            height: auto;
            margin: auto;
            display: block;
        }
    }

   

    .ant-menu-item:nth-child(1) {
        margin-bottom: 30px !important;
        margin-top: 20px !important;
        height: 60px;
        pointer-events: none;
        cursor: default;

    }

    .ant-menu.ant-menu-dark {
        background-color: ${({ theme }) => theme.dashboardBackground};
        color: black;
    }

    .ant-menu-item-selected {
        background-color: ${({ theme }) => theme.dashboardBackground + " !important"};

        span {
            padding: 10px;
            box-sizing: border-box;
            background-color: #fff !important;
        }
        
    }
    
    
`;

function Sidemenu() {

    const items = [
        {
            label: <Logo src="/image/logo_navbar.png" alt="logo" />,
        },
        {
            label: <Link to="/painel/"><img className='icon' src="/icon/dashboard/dashboard.svg" /></Link>,
            key: '',
        },
        {
            label: <Link to="/painel/reservas"><img className='icon' src="/icon/dashboard/reservations.svg" /></Link>,
            key: 'reservas',
        },
        {
            label: <Link to="/painel/datas"><img className='icon' src="/icon/dashboard/blocked.svg" /></Link>,
            key: 'datas',
        },
        {
            label: <Link to="/painel/atividades"><img className='icon' src="/icon/dashboard/car.svg" /></Link>,
            key: 'carros',
        },
        {
            label: <Link to="/painel/precos">
                <img className='icon' src="/icon/dashboard/price.svg" />
            </Link>,
            key: 'precos',
        },
        {
            label:
                <Link to="/painel/clientes">
                    <img className='icon' src="/icon/dashboard/client.svg" />
                </Link>,
            key: 'clientes',
        },
        {
            label: <Link to="/painel/configuracao">
                <img className='icon' src="/icon/dashboard/config.svg" />
            </Link>,
            key: 'configuracao',
        },
        {
            label: <Link to="/painel/logs">
                <img className='icon' src="/icon/dashboard/config.svg" />
            </Link>,
            key: 'logs',
        },


    ];

    return (
        <Container>
            <Menu
                theme="dark"
                defaultSelectedKeys={['']}
                mode="vertical"
                items={items}
            />
        </Container>
    )
}

export default Sidemenu