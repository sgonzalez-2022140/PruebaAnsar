import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    max-height: 90%;
    overflow-y: auto;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 28px;
    font-weight: bold;
`;

const CloseButton = styled.button`
    border: none;
    cursor: pointer;
    width: 30px; 
    height: 30px; 
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #EB3324;
    color: white; 
`;

const Modal = ({ isOpen, onClose, title, icon: Icon, children }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>                        
                        <ModalTitle>
                            {Icon && <Icon style={{ marginRight: '10px', color: '#0B8AD9' }} />} {/* Renderiza el ícono si está disponible */}
                            {title}
                        </ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;
