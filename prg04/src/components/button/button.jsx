import React from 'react';
import "../button/button.css"

// Função para criar um botão componentizado
const Botao = ({texto}) => {
  return (
    <button className='btn bg-secundary rounded text-dark me-5'>
      {texto || 'Botão'} {/* Texto padrão: "Botão" */}
    </button>
  );
};

export default Botao;