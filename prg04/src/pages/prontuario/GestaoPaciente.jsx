//import React from 'react'
import { useNavigate } from "react-router-dom";

const GestaoPaciente = () => {

    const navigate = useNavigate();

    const goToCriarPaciente = () => {
        navigate("/criar-paciente")
    }

    const gotToDetalhesPaciente = () => {
        navigate("/detalhes-paciente")
    }

  return (
    <>
      <div>
        <button onClick={goToCriarPaciente} >Criar Paciente</button>
        <button onClick={gotToDetalhesPaciente} >Detalhes Paciente</button>
      </div>
    </>
  );
};

export default GestaoPaciente;
