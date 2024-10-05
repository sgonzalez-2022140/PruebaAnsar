import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { useAddMedicine } from '../../Shared/Hooks/MEDICINE/useAddMedicine';
import { useGetSaldoPrincipal } from '../../Shared/Hooks/Saldo/useGetSaldoPrincipal';
import { useGetReservations } from '../../Shared/Hooks/Saldo/useGetReservations';

// ------- Estilos para cada propiedad
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2),
                    10px 0 10px rgba(0, 0, 0, 0.5); /* sombra más pronunciada a la derecha */
    border-bottom: 3px solid #0B8AD9;
    border-right: 3px solid #0B8AD9;
    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const FormField = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    width: 100%;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const FormLabel = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
    &:after {
        content: '*';
        color: red;
        margin-left: 5px;
    }
`;

const FormDate = styled.div`
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    max-width: 400px;

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

const FormInputDate = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: white;
    color: black;
    text-align: center;
    outline: none;
    transition: border-bottom 0.2s ease-in-out;
    &:focus {
        outline: none;
        border-bottom: 2px solid #0CC8F2;
    }
    border: 1px solid ${({ invalid }) => (invalid ? 'red' : 'white')};
`;

const FormSelect = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid ${({ invalid }) => (invalid ? 'red' : '#ccc')};
    border-radius: 5px;
    background-color: white;
    color: black;
`;

const DisabledFormSelect = styled(FormSelect)`
    background-color: #f0f0f0;
    color: #999;
    pointer-events: none;
    opacity: 0.6;
`;

const FormButton = styled.button`
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #0B8AD9;
    color: white;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #007bff;
    }

    &:active {
        transform: scale(0.95);
    }

    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center; /* Centra el botón */
    width: 100%;
`;

const ImagePreview = styled.img`
    width: 100px;
    height: 100px;
    margin-top: 10px;
    object-fit: cover;
    border-radius: 5px;
`;

const SaldoContainer = styled.div`
    font-weight: bold;
    color: #0B8AD9;
    margin-bottom: 20px;
`;

const FormAdvertency = styled.label`
    display: block;
    margin-bottom: 5px;
    color: black;
    font-weight: bold;
    font-size: 0.8em; 
`;

const RedAsterisk = styled.span`
    color: red;
`;

const FormInput = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${({ invalid }) => (invalid ? 'red' : '#ccc')};
    width: 100%;
    max-width: 400px;
    transition: border-bottom 0.2s ease-in-out;
    &:focus {
        outline: none;
        border-bottom: 2px solid #0CC8F2;
    }
    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

const FormInputNumber = styled.input.attrs({ type: 'number' })`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${({ invalid }) => (invalid ? 'red' : '#ccc')};
    width: 100%;
    max-width: 400px;
    transition: border-bottom 0.2s ease-in-out;
    &:focus {
        outline: none;
        border-bottom: 2px solid #0CC8F2;
    }
    @media (max-width: 768px) {
        max-width: 100%;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    -moz-appearance: textfield;
`;

export const AddMedicinaForm = ({ onBack, onSuccess }) => {
    const tiposMedicina = [
        "Gástricas",
        "Gripe y resfriado",
        "Analgésicos",
        "Antiinflamatorios",
        "Antibióticos",
        "Antihistamínicos",
        "Cardiovasculares",
        "Antidepresivos",
        "Antidiabéticos",
        "Broncodilatadores",
        "Antifúngicos",
        "Antivirales",
        "Laxantes",
        "Antiepilépticos",
        "Diuréticos",
        "Corticosteroides",
        "Inmunosupresores",
        "Otro"
    ];
    
    const { saldo, loading: saldoLoading, error: saldoError, refetch: refetchSaldo } = useGetSaldoPrincipal();
    const { reservations, loading: reservationsLoading, error: reservationsError } = useGetReservations();

    const reservaPrincipalId = reservations?.[0]?._id || '';
    const {
        medicine,
        handleChange,
        handleImageChange,
        handleSubmit,
        loading,
        error,
        success,
    } = useAddMedicine(onSuccess, reservaPrincipalId);

    const [invalidFields, setInvalidFields] = useState({});
    const [preview, setPreview] = useState(null);
    const [isOtroSelected, setIsOtroSelected] = useState(false);

    const ddRef = useRef(null);
    const mmRef = useRef(null);
    const yyyyRef = useRef(null);

    useEffect(() => {
        // Selecciona todos los inputs de tipo número
        const inputs = document.querySelectorAll('input[type=number]');

        inputs.forEach(input => {
            // Añade un evento 'wheel' para deshabilitar el scroll
            const handleWheel = e => {
                e.preventDefault();
                input.blur();  // Quita el foco temporalmente
                setTimeout(() => input.focus(), 0);  // Lo devuelve
            };
            input.addEventListener('wheel', handleWheel);

            // Limpieza al desmontar el componente
            return () => input.removeEventListener('wheel', handleWheel);
        });
    }, []);

    const handleKeyUp = (e, maxLength, nextRef) => {
        if (e.target.value.length === maxLength) {
            nextRef.current.focus();
        }
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        handleChange(e);
        validateField(name, value);
    };

    const validateField = (name, value) => {
        setInvalidFields((prev) => ({
            ...prev,
            [name]: !value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newInvalidFields = {};
        const requiredFields = [
            'nombre', 'unidades', 'DD', 'MM', 'YYYY',
            'precio_unitario', 'precio_neto', 'proveedor', 'tipo_medicina', 'image'
        ];

        requiredFields.forEach((field) => {
            if (!medicine[field]) {
                newInvalidFields[field] = true;
            }
        });

        setInvalidFields(newInvalidFields);

        if (Object.values(newInvalidFields).some((value) => value)) {
            toast.error('Por favor, complete todos los campos obligatorios.');
            return;
        }

        handleSubmit(e);

        // Mostrar notificación del nuevo saldo
        toast.success(`Nuevo saldo: ${saldo - medicine.precio_neto}`);
        refetchSaldo();
    };

    const handleImagePreview = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        handleImageChange(event);
    };

    const handleTipoMedicinaChange = (e) => {
        const { value } = e.target;
        setIsOtroSelected(value === 'Otro');
        handleChange(e);
    };

    return (
        <FormContainer>
            {!saldoLoading && !saldoError && (
                <SaldoContainer>Saldo Principal: {saldo}</SaldoContainer>
            )}
            <form onSubmit={handleFormSubmit}>
                <FormAdvertency>
                    El <RedAsterisk>*</RedAsterisk> significa que los campos son obligatorios, debe llenarlos todos.
                </FormAdvertency>
                <FormField>
                    <FormLabel>Nombre</FormLabel>
                    <FormInput
                        type="text"
                        name="nombre"
                        value={medicine.nombre}
                        onChange={handleFieldChange}
                        invalid={invalidFields.nombre}
                    />
                </FormField>
                <FormField>
                    <FormLabel>Unidades</FormLabel>
                    <FormInputNumber
                        name="unidades"
                        value={medicine.unidades}
                        onChange={handleFieldChange}
                        invalid={invalidFields.unidades}
                    />
                </FormField>
                <FormField>
                    <FormLabel>Vencimiento</FormLabel>
                    <FormDate>
                        <FormInputDate
                            type="text"
                            name="DD"
                            value={medicine.DD}
                            onChange={handleFieldChange}
                            onKeyUp={(e) => handleKeyUp(e, 2, mmRef)}
                            placeholder="DD"
                            maxLength={2}
                            ref={ddRef}
                            invalid={invalidFields.DD}
                        />
                        <span>/</span>
                        <FormInputDate
                            type="text"
                            name="MM"
                            value={medicine.MM}
                            onChange={handleFieldChange}
                            onKeyUp={(e) => handleKeyUp(e, 2, yyyyRef)}
                            placeholder="MM"
                            maxLength={2}
                            ref={mmRef}
                            invalid={invalidFields.MM}
                        />
                        <span>/</span>
                        <FormInputDate
                            type="text"
                            name="YYYY"
                            value={medicine.YYYY}
                            onChange={handleFieldChange}
                            placeholder="YYYY"
                            maxLength={4}
                            ref={yyyyRef}
                            invalid={invalidFields.YYYY}
                        />
                    </FormDate>
                </FormField>
                <FormField>
                    <FormLabel>Precio Unitario</FormLabel>
                    <FormInputNumber
                        name="precio_unitario"
                        value={medicine.precio_unitario}
                        onChange={handleFieldChange}
                        invalid={invalidFields.precio_unitario}
                    />
                </FormField>
                <FormField>
                    <FormLabel>Precio Neto (costo total)</FormLabel>
                    <FormInputNumber
                        name="precio_neto"
                        value={medicine.precio_neto}
                        onChange={handleFieldChange}
                        invalid={invalidFields.precio_neto}
                    />
                </FormField>
                <FormField>
                    <FormLabel>Proveedor</FormLabel>
                    <FormInput
                        type="text"
                        name="proveedor"
                        value={medicine.proveedor}
                        onChange={handleFieldChange}
                        invalid={invalidFields.proveedor}
                    />
                </FormField>
                <FormField>
                    <FormLabel>Tipo de Medicina</FormLabel>
                    <FormSelect
                        name="tipo_medicina"
                        value={medicine.tipo_medicina}
                        onChange={handleTipoMedicinaChange}
                        invalid={invalidFields.tipo_medicina}
                    >
                        <option value="">Selecciona un tipo de medicina</option>
                        {tiposMedicina.map((tipo, index) => (
                            <option key={index} value={tipo}>{tipo}</option>
                        ))}
                    </FormSelect>
                    {isOtroSelected && (
                        <FormInput
                            type="text"
                            name="tipo_medicina_otro"
                            placeholder="Especifique el tipo de medicina"
                            value={medicine.tipo_medicina_otro || ''}
                            onChange={handleFieldChange}
                            invalid={invalidFields.tipo_medicina_otro}
                        />
                    )}
                </FormField>
                <FormField>
                    <FormLabel>Imagen</FormLabel>
                    <FormInput
                        type="file"
                        name="image"
                        onChange={handleImagePreview}
                        invalid={invalidFields.image}
                    />
                    {preview && <ImagePreview src={preview} alt="Vista previa" />}
                </FormField>

                <FormField>
                    <FormLabel>Reserva (seleccionada por defecto)</FormLabel>
                    <DisabledFormSelect
                        name="reserva"
                        value={medicine.reserva}
                        onChange={handleFieldChange}
                        invalid={invalidFields.reserva}
                    >
                        <option value="">Selecciona una reserva</option>
                        {reservations && reservations.map((reserva) => (
                            <option key={reserva._id} value={reserva._id}>
                                {reserva.nombre || reserva._id}
                            </option>
                        ))}
                    </DisabledFormSelect>
                </FormField>

                <ButtonContainer>
                    <FormButton type="submit" disabled={loading || saldoLoading}>
                        {loading ? 'Guardando...' : 'Guardar'}
                    </FormButton>
                </ButtonContainer>
            </form>
        </FormContainer>
    );
};