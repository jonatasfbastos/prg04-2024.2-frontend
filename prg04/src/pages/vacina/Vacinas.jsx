import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, TablePagination, TextField, Button, Box } from '@mui/material';
import VacinaEdit from './VacinaEdit';
import './VacinaFormulario.css';
import './VacinaLista.css';

const Vacinas = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const [vacinas, setVacinas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [filterDoenca, setFilterDoenca] = useState('');
  const [filterData, setFilterData] = useState('');
  const [formData, setFormData] = useState({
    id: null,
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
  const [isCreating, setIsCreating] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchVacinas = () => {
    let url = `${API_URL}/vacinas/findall?page=${page}&size=${rowsPerPage}`;
    if (filterDoenca) url = `${API_URL}/vacinas/findByDoenca/${encodeURIComponent(filterDoenca)}?page=${page}&size=${rowsPerPage}`;
    if (filterData) url = `${API_URL}/vacinas/findByDataVencimento/${filterData}?page=${page}&size=${rowsPerPage}`;

    axios.get(url)
      .then(response => {
        setVacinas(response.data.content || []);
        setTotalElements(response.data.totalElements || 0);
      })
      .catch(error => {
        console.error('Erro ao buscar vacinas:', error.response ? error.response.data : error.message);
        window.alert('Erro ao carregar a lista de vacinas. Verifique o console para detalhes.');
      });
  };

  useEffect(() => {
    fetchVacinas();
  }, [page, rowsPerPage, filterDoenca, filterData]);

  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilter = (type, value) => {
    if (type === 'doenca') setFilterDoenca(value);
    if (type === 'data') setFilterData(value);
    if (type === 'apply') fetchVacinas();
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta vacina?')) {
      axios.delete(`${API_URL}/vacinas/delete/${id}`)
        .then(response => {
          if (response.status === 200 || response.status === 204) {
            fetchVacinas();
            window.alert('Vacina deletada com sucesso!');
          } else {
            window.alert('Erro ao deletar a vacina. Status: ' + response.status);
          }
        })
        .catch(error => {
          console.error('Erro ao deletar vacina:', error.response ? error.response.data : error.message);
          window.alert('Erro ao deletar a vacina. Verifique o console para detalhes.');
        });
    }
  };

  const handleEdit = (id) => {
    console.log(`Iniciando edição da vacina com ID: ${id}`);
    setEditId(id);
  };

  const handleCloseEdit = () => {
    setEditId(null);
  };

  const handleUpdate = () => {
    fetchVacinas();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/vacinas/save`, formData)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          window.alert('Vacina criada com sucesso!');
          fetchVacinas();
          setFormData({
            id: null,
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
          setIsCreating(false);
        } else {
          window.alert('Erro ao criar a vacina. Status: ' + response.status);
        }
      })
      .catch(error => {
        console.error('Erro ao criar vacina:', error.response ? error.response.data : error.message);
        window.alert('Erro ao criar a vacina. Verifique o console para detalhes.');
      });
  };

  return (
    <Paper className="vacinas-container">
      <Typography variant="h4" gutterBottom>Gestão de Vacinas</Typography>

      <Box className="filter-section">
        <TextField
          label="Filtrar por Doença"
          value={filterDoenca}
          onChange={(e) => handleFilter('doenca', e.target.value)}
          className="filter-input"
        />
        <TextField
          label="Filtrar por Data de Vencimento"
          type="date"
          value={filterData}
          onChange={(e) => handleFilter('data', e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="filter-input"
        />
        <Button variant="contained" onClick={() => handleFilter('apply')} className="filter-button">Filtrar</Button>
        <Button variant="contained" onClick={() => setIsCreating(true)} className="new-button">Nova Vacina</Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome Comum</TableCell>
            <TableCell>Laboratório</TableCell>
            <TableCell>Doença Combatida</TableCell>
            <TableCell>Data de Vencimento</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vacinas.map(vacina => (
            <TableRow key={vacina.id}>
              <TableCell>{vacina.nomeComum}</TableCell>
              <TableCell>{vacina.nomeLaboratorio}</TableCell>
              <TableCell>{vacina.doencaCombatida}</TableCell>
              <TableCell>{vacina.dataVencimento}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEdit(vacina.id)}>Editar</Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(vacina.id)} style={{ marginLeft: 8 }}>Deletar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {isCreating && (
        <Box className="vacina-form-container">
          <Typography variant="h4" gutterBottom>Criar Nova Vacina</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nome Científico (Opcional)"
              name="nomeCientifico"
              value={formData.nomeCientifico}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nome Comum"
              name="nomeComum"
              value={formData.nomeComum}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Laboratório"
              name="nomeLaboratorio"
              value={formData.nomeLaboratorio}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Idade Foco (Opcional)"
              name="idadeFoco"
              type="number"
              value={formData.idadeFoco}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Doença Combatida"
              name="doencaCombatida"
              value={formData.doencaCombatida}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Observação"
              name="observacao"
              value={formData.observacao}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Método de Aplicação"
              name="metodoAplicacao"
              value={formData.metodoAplicacao}
              onChange={handleChange}
              fullWidth
              margin="normal"
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
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">Criar Vacina</Button>
              <Button variant="contained" color="secondary" onClick={() => setIsCreating(false)} style={{ marginLeft: 8 }}>Cancelar</Button>
            </Box>
          </form>
        </Box>
      )}

      {editId && (
        <VacinaEdit
          id={editId}
          onClose={handleCloseEdit}
          onUpdate={handleUpdate}
        />
      )}
    </Paper>
  );
};

export default Vacinas;