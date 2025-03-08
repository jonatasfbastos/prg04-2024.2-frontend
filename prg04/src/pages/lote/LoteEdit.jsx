import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const LoteEdit = ({ id, onClose, onUpdate }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  const [formData, setFormData] = useState({
    nome: '',
    dataProducao: '',
    dataVencimento: '',
    quantidadeVacinas: '',
    laboratorio: '',
    vacinaId: '',
  });
  const [errors, setErrors] = useState({});
  const [vacinas, setVacinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/lotes/findById/${id}`),
      axios.get(`${API_URL}/vacinas/findall?page=0&size=100`),
    ])
      .then(([loteResponse, vacinasResponse]) => {
        const loteData = loteResponse.data;
        setFormData({
          nome: loteData.nome,
          dataProducao: loteData.dataProducao,
          dataVencimento: loteData.dataVencimento,
          quantidadeVacinas: loteData.quantidadeVacinas,
          laboratorio: loteData.laboratorio,
          vacinaId: loteData.vacina?.id || '',
        });
        setVacinas(vacinasResponse.data.content || []);
        setLoading(false);
      })
      .catch(error => {
        const errorMsg = error.response ? error.response.data.message || error.response.statusText : error.message;
        console.error('Erro ao carregar dados:', errorMsg);
        setErrorMessage(`Erro ao carregar os dados do lote: ${errorMsg}`);
        setLoading(false);
      });
  }, [id]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'nome':
        if (!value || value.trim() === '') error = 'Nome é obrigatório';
        break;
      case 'dataProducao':
        if (!value) error = 'Data de produção é obrigatória';
        break;
      case 'dataVencimento':
        if (!value) {
          error = 'Data de vencimento é obrigatória';
        } else if (formData.dataProducao && new Date(value) < new Date(formData.dataProducao)) {
          error = 'Data de vencimento não pode ser anterior à data de produção';
        }
        break;
      case 'quantidadeVacinas':
        if (!value) error = 'Quantidade de vacinas é obrigatória';
        else if (value <= 0) error = 'Quantidade deve ser positiva';
        break;
      case 'laboratorio':
        if (!value || value.trim() === '') error = 'Laboratório é obrigatório';
        break;
      case 'vacinaId':
        if (!value) error = 'Vacina é obrigatória';
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validateField(key, formData[key]);
    });
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
    if (validateForm()) {
      const dataToSend = {
        id,
        nome: formData.nome,
        dataProducao: formData.dataProducao,
        dataVencimento: formData.dataVencimento,
        quantidadeVacinas: parseInt(formData.quantidadeVacinas, 10),
        laboratorio: formData.laboratorio,
        vacina: { id: formData.vacinaId },
      };
      axios.put(`${API_URL}/lotes/update/${id}`, dataToSend)
        .then(response => {
          if (response.status === 200 || response.status === 204) {
            window.alert('Lote atualizado com sucesso!');
            onUpdate();
            onClose();
          } else {
            window.alert(`Erro ao atualizar o lote. Status: ${response.status}`);
          }
        })
        .catch(error => {
          const errorMsg = error.response ? error.response.data.message || error.response.statusText : error.message;
          console.error('Erro ao atualizar lote:', errorMsg);
          window.alert(`Erro ao atualizar o lote: ${errorMsg}`);
        });
    }
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  if (errorMessage) {
    return (
      <Box className="lote-edit-container">
        <Typography variant="h4" gutterBottom>Editar Lote</Typography>
        <Typography color="error">{errorMessage}</Typography>
        <Button variant="contained" color="secondary" onClick={onClose}>Fechar</Button>
      </Box>
    );
  }

  return (
    <Box className="lote-edit-container">
      <Typography variant="h4" gutterBottom>Editar Lote</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.nome}
          helperText={errors.nome}
          required
        />
        <TextField
          label="Data de Produção"
          name="dataProducao"
          type="date"
          value={formData.dataProducao}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.dataProducao}
          helperText={errors.dataProducao}
          required
        />
        <TextField
          label="Data de Vencimento"
          name="dataVencimento"
          type="date"
          value={formData.dataVencimento}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.dataVencimento}
          helperText={errors.dataVencimento}
          required
        />
        <TextField
          label="Quantidade de Vacinas"
          name="quantidadeVacinas"
          type="number"
          value={formData.quantidadeVacinas}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.quantidadeVacinas}
          helperText={errors.quantidadeVacinas}
          required
        />
        <TextField
          label="Laboratório"
          name="laboratorio"
          value={formData.laboratorio}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.laboratorio}
          helperText={errors.laboratorio}
          required
        />
        <FormControl fullWidth margin="normal" error={!!errors.vacinaId}>
          <InputLabel id="vacina-label">Vacina</InputLabel>
          <Select
            labelId="vacina-label"
            name="vacinaId"
            value={formData.vacinaId}
            onChange={handleChange}
            label="Vacina"
            required
          >
            <MenuItem value="">Selecione uma vacina</MenuItem>
            {vacinas.map(vacina => (
              <MenuItem key={vacina.id} value={vacina.id}>
                {vacina.nomeComum}
              </MenuItem>
            ))}
          </Select>
          {errors.vacinaId && <Typography color="error" variant="caption">{errors.vacinaId}</Typography>}
        </FormControl>
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

export default LoteEdit;