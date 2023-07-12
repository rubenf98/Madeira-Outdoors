import { DatePicker, Input } from "antd";
import styled, { css } from "styled-components";
import { borderRadius } from "../../helper";

export const UnderlineTitle = styled.div`
    width: 100%;
    
    h2 {
        font-size: clamp(26px, 3vw, 50px);
        
        span {
            position: relative;

            &::before {
                content: "";
                position: absolute;
                width: 100%;
                height: 18px;
                background-color: ${({ theme }) => theme.secundary};
                bottom: 5px;
                z-index: -1;
            }
        }
    }
`;

export const TransparentDatePicker = styled(DatePicker)`
    background-color: transparent;
    border-radius: ${borderRadius};
    border-width: 2px;
    border-color: #cecece;
    width: 100%;
`;

export const TransparentInput = styled(Input)`
    background-color: transparent;
    border-radius: ${borderRadius};
    border-width: 2px;
    border-color: #cecece;
`;


export const PrimaryButton = styled.button`
    cursor: pointer;
    color: white;
    font-weight: bold;
    font-size: 16px;
    padding: 12px 22px;
    border-radius: ${borderRadius};
    background-color: ${({ theme }) => theme.primary};
    border: 2px solid;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0px;
    transition: all .3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.primaryHover};
        border-color: ${({ theme }) => theme.primaryHover};
    }
`;

export const SecundaryButton = styled(PrimaryButton)`
    color: ${({ theme }) => theme.primary};
    background-color: transparent;
    border-color: ${({ theme }) => theme.primary};

    &:hover {
        background-color: transparent;
        border-color: ${({ theme }) => theme.primaryHover};
        color: ${({ theme }) => theme.primaryHover};
    }
`;