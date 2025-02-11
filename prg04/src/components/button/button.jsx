import React from 'react';
import "../button/button.css"

// Função para criar um botão componentizado
const Botao = ({texto, onClick}) => {
  return (
    <button className='btn btn-primary rounded' onClick={onClick}>
      {texto || 'Botão'} {/* Texto padrão: "Botão" */}
    </button>
  );
};

export default Botao;