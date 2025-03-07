import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import './VacinaEdit.css';

const VacinaEdit = ({ id, onClose, onUpdate }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  const [formData, setFormData] = useState({
    nomeCientifico: '',
    nomeComum: '',
    nomeLaboratorio: '',
    idadeFoco: '',
    doencaCombatida: '',
    observacao: '',
    metodoAplicacao: '',
    dataVencimento: '',
    loteIds: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (id) {
      console.log(`Carregando vacina com ID: ${id}`);
      setLoading(true);
      axios.get(`${API_URL}/vacinas/findById/${id}`)
        .then(response => {
          console.log('Dados recebidos:', response.data);
          setFormData(response.data);
          setLoading(false);
        })
        .catch(error => {
          const errorMsg = error.response ? error.response.data.message || error.response.statusText : error.message;
          console.error('Erro ao carregar vacina:', errorMsg);
          setErrorMessage(`Erro ao carregar os dados da vacina: ${errorMsg}`);
          setLoading(false);
        });
    }
  }, [id]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'nomeComum':
        if (!value || value.trim() === '') error = 'Nome comum é obrigatório';
        break;
      case 'nomeLaboratorio':
        if (!value || value.trim() === '') error = 'Laboratório é obrigatório';
        break;
      case 'doencaCombatida':
        if (!value || value.trim() === '') error = 'Doença combatida é obrigatória';
        break;
      case 'dataVencimento':
        if (!value) {
          error = 'Data de vencimento é obrigatória';
        } else {
          const selectedDate = new Date(value);
          const currentDate = new Date();
          if (selectedDate < currentDate) {
            error = 'Data de vencimento não pode ser anterior à data atual';
          }
        }
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.nomeComum = validateField('nomeComum', formData.nomeComum);
    newErrors.nomeLaboratorio = validateField('nomeLaboratorio', formData.nomeLaboratorio);
    newErrors.doencaCombatida = validateField('doencaCombatida', formData.doencaCombatida);
    newErrors.dataVencimento = validateField('dataVencimento', formData.dataVencimento);
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.alert('Por favor, corrija os erros antes de salvar.');
      return;
    }

    console.log('Enviando dados para atualização:', formData);
    axios.put(`${API_URL}/vacinas/update/${id}`, formData)
      .then(response => {
        console.log('Resposta da atualização:', response);
        if (response.status === 200 || response.status === 204) {
          window.alert('Vacina atualizada com sucesso!');
          onUpdate();
          onClose();
        } else {
          window.alert(`Erro ao atualizar a vacina. Status: ${response.status}`);
        }
      })
      .catch(error => {
        const errorMsg = error.response ? error.response.data.message || error.response.statusText : error.message;
        console.error('Erro ao atualizar vacina:', errorMsg);
        window.alert(`Erro ao atualizar a vacina: ${errorMsg}`);
      });
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  if (errorMessage) {
    return (
      <Box className="vacina-edit-container">
        <Typography variant="h4" gutterBottom>Editar Vacina</Typography>
        <Typography color="error">{errorMessage}</Typography>
        <Button variant="contained" color="secondary" onClick={onClose}>Fechar</Button>
      </Box>
    );
  }

  return (
    <Box className="vacina-edit-container">
      <Typography variant="h4" gutterBottom>Editar Vacina</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome Científico (Opcional)"
          name="nomeCientifico"
          value={formData.nomeCientifico || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nome Comum"
          name="nomeComum"
          value={formData.nomeComum || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.nomeComum}
          helperText={errors.nomeComum}
          required
        />
        <TextField
          label="Laboratório"
          name="nomeLaboratorio"
          value={formData.nomeLaboratorio || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.nomeLaboratorio}
          helperText={errors.nomeLaboratorio}
          required
        />
        <TextField
          label="Idade Foco (Opcional)"
          name="idadeFoco"
          type="number"
          value={formData.idadeFoco || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Doença Combatida"
          name="doencaCombatida"
          value={formData.doencaCombatida || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.doencaCombatida}
          helperText={errors.doencaCombatida}
          required
        />
        <TextField
          label="Observação"
          name="observacao"
          value={formData.observacao || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Método de Aplicação"
          name="metodoAplicacao"
          value={formData.metodoAplicacao || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Data de Vencimento"
          name="dataVencimento"
          type="date"
          value={formData.dataVencimento || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.dataVencimento}
          helperText={errors.dataVencimento}
          required
        />
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={Object.values(errors).some(error => error !== '')}
          >
            Salvar
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose} style={{ marginLeft: 8 }}>
            Cancelar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default VacinaEdit;