import { Modal } from 'antd'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from "styled-components";
import { setCookiesVisibility } from '../../../redux/application/actions';
import { PrimaryButton, SecundaryButton } from '../../helpers/style';
import { borderRadius, getCookie } from '../../../helper';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 20px 0px;

`;

const CustomModal = styled(Modal)`
    button {
        font-size: 18px !important;
    }
    .ant-modal-content {
        border-radius: ${borderRadius};
    }
`;

function CookiesModal(props) {
    useEffect(() => {
        var hasCookies = getCookie("hasCookies") === "1";

        if (!hasCookies) {
            props.setCookiesVisibility(true);
        }
    }, [])

    const handleCancel = () => {
        props.setCookiesVisibility(false);
    }

    const handleCookie = (value) => {
        document.cookie = "hasCookies=" + value + "; expires=Thu, 01 Dec 2033 12:00:00 UTC";
        props.setCookiesVisibility(false);
    }


    return (
        <CustomModal
            title={null}
            open={props.cookiesVisibility}
            onCancel={handleCancel}
            footer={null}
            centered
            closable={false}
        >
            <h1>Cookies consent</h1>
            <p style={{ fontSize: "18px" }}>This website uses cookies to help you have a greater experience and more admissable browsing experience on the website.</p>
            <ButtonContainer>
                <PrimaryButton onClick={() => handleCookie(1)}>accept</PrimaryButton>
                <SecundaryButton onClick={() => handleCookie(0)}>decline</SecundaryButton>
            </ButtonContainer>
        </CustomModal>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCookiesVisibility: (state) => dispatch(setCookiesVisibility(state)),
    };
};

const mapStateToProps = (state) => {
    return {
        cookiesVisibility: state.application.cookiesVisibility,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CookiesModal);