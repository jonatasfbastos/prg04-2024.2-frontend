import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';

const LoteFormulario = ({ open, onClose, onSubmit, initialData, vacinas, mode }) => {
  const [formData, setFormData] = React.useState(initialData);

  React.useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{mode === 'edit' ? 'Editar Lote' : 'Novo Lote'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          fullWidth
          margin="normal"
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
          required
        />
        <TextField
          label="Laboratório"
          name="laboratorio"
          value={formData.laboratorio}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label="Vacina"
          name="vacinaId"
          value={formData.vacinaId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="">Selecione uma vacina</MenuItem>
          {vacinas.map(vacina => (
            <MenuItem key={vacina.id} value={vacina.id}>
              {vacina.nomeComum}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoteFormulario;