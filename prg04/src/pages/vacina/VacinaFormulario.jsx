import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const VacinaFormulario = ({ formData, onChange, onSubmit, isEditing }) => {
  return (
    <Box className="vacina-formulario-container">
      <Typography variant="h4" gutterBottom>{isEditing ? 'Editar Vacina' : 'Criar Nova Vacina'}</Typography>
      <form onSubmit={onSubmit}>
        <TextField label="Nome Científico (Opcional)" name="nomeCientifico" value={formData.nomeCientifico} onChange={onChange} fullWidth margin="normal" />
        <TextField label="Nome Comum" name="nomeComum" value={formData.nomeComum} onChange={onChange} fullWidth margin="normal" required />
        <TextField label="Laboratório" name="nomeLaboratorio" value={formData.nomeLaboratorio} onChange={onChange} fullWidth margin="normal" required />
        <TextField label="Idade Foco (Opcional)" name="idadeFoco" type="number" value={formData.idadeFoco} onChange={onChange} fullWidth margin="normal" />
        <TextField label="Doença Combatida" name="doencaCombatida" value={formData.doencaCombatida} onChange={onChange} fullWidth margin="normal" required />
        <TextField label="Observação" name="observacao" value={formData.observacao} onChange={onChange} fullWidth margin="normal" required />
        <TextField label="Método de Aplicação" name="metodoAplicacao" value={formData.metodoAplicacao} onChange={onChange} fullWidth margin="normal" required />
        <TextField label="Data de Vencimento" name="dataVencimento" type="date" value={formData.dataVencimento} onChange={onChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        <Button type="submit" variant="contained" color="primary" className="submit-button">
          {isEditing ? 'Atualizar' : 'Criar'} Vacina
        </Button>
      </form>
    </Box>
  );
};

export default VacinaFormulario;