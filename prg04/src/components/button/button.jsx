import React from 'react';
import "../button/button.css";
import { Button } from '@mui/material';

const Botao = ({ texto, onClick, ...props }) => {
  return (
    <div className='buttonComponent'>
      <Button
        className='btn btn-primary rounded'
        onClick={onClick}
        {...props} // repassa todas as outras props, como type="submit"
      >
        {texto || 'Botão'}
      </Button>
    </div>
  );
};

export default Botao;
