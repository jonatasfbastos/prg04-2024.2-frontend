import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import LoteFormulario from './LoteFormulario';
import './LoteList.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const LoteLista = () => {
  const [lotes, setLotes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [filter, setFilter] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create' ou 'edit'
  const [formData, setFormData] = useState({
    id: null,
    nome: '',
    dataProducao: '',
    dataVencimento: '',
    quantidadeVacinas: '',
    laboratorio: '',
    vacinaId: '',
  });
  const [vacinas, setVacinas] = useState([]);
  const [error, setError] = useState(null);

  // Configurar axios com cabeçalhos (se necessário)
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      // Adicione token aqui se necessário
      // 'Authorization': `Bearer ${token}`,
    },
  });

  // Buscar lotes
  const fetchLotes = async () => {
    try {
      const response = await axiosInstance.get(`/lotes/findall?page=${page}&size=${rowsPerPage}`);
      if (filter) {
        const filteredLotes = response.data.content.filter(lote =>
          lote.nome.toLowerCase().includes(filter.toLowerCase()) ||
          lote.laboratorio.toLowerCase().includes(filter.toLowerCase())
        );
        setLotes(filteredLotes);
        setTotalElements(filteredLotes.length);
      } else {
        setLotes(response.data.content || []);
        setTotalElements(response.data.totalElements || 0);
      }
    } catch (error) {
      console.error('Erro ao buscar lotes:', error.response ? error.response.data : error.message);
      setError('Erro ao carregar os lotes. Verifique o console para detalhes.');
      setLotes([]);
      setTotalElements(0);
    }
  };

  // Buscar vacinas
  const fetchVacinas = async () => {
    try {
      const response = await axiosInstance.get('/vacinas/findall?page=0&size=100');
      setVacinas(response.data.content || []);
    } catch (error) {
      console.error('Erro ao buscar vacinas:', error.response ? error.response.data : error.message);
      setError('Erro ao carregar a lista de vacinas.');
    }
  };

  useEffect(() => {
    fetchLotes();
    fetchVacinas();
  }, [page, rowsPerPage, filter]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosInstance.delete(`/lotes/delete/${selectedId}`);
      if (response.status === 204) {
        window.alert('Lote deletado com sucesso!');
        fetchLotes();
      } else {
        window.alert('Erro ao deletar o lote.');
      }
    } catch (error) {
      console.error('Erro ao deletar lote:', error.response ? error.response.data : error.message);
      window.alert('Erro ao deletar o lote: ' + (error.response ? error.response.data.message : error.message));
    } finally {
      setOpenDeleteDialog(false);
      setSelectedId(null);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setSelectedId(null);
  };

  const handleNewClick = () => {
    setFormMode('create');
    setFormData({
      id: null,
      nome: '',
      dataProducao: '',
      dataVencimento: '',
      quantidadeVacinas: '',
      laboratorio: '',
      vacinaId: '',
    });
    setOpenForm(true);
  };

  const handleEditClick = (lote) => {
    setFormMode('edit');
    setFormData({
      id: lote.id,
      nome: lote.nome,
      dataProducao: lote.dataProducao,
      dataVencimento: lote.dataVencimento,
      quantidadeVacinas: lote.quantidadeVacinas,
      laboratorio: lote.laboratorio,
      vacinaId: lote.vacina?.id || '',
    });
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
  };

  const handleFormSubmit = async (data) => {
    const url = data.id ? `/lotes/update/${data.id}` : '/lotes/save';
    const method = data.id ? 'put' : 'post';
    const payload = {
      nome: data.nome,
      dataProducao: data.dataProducao,
      dataVencimento: data.dataVencimento,
      quantidadeVacinas: parseInt(data.quantidadeVacinas, 10),
      laboratorio: data.laboratorio,
      vacina: { id: data.vacinaId },
    };

    try {
      const response = await axiosInstance[method](url, payload);
      if (response.status === 201 || response.status === 200) {
        window.alert(`Lote ${data.id ? 'atualizado' : 'criado'} com sucesso!`);
        fetchLotes();
        setOpenForm(false);
      } else {
        window.alert('Erro ao salvar o lote.');
      }
    } catch (error) {
      console.error('Erro ao salvar lote:', error.response ? error.response.data : error.message);
      window.alert('Erro ao salvar o lote: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <Paper className="lote-lista-container">
      <Typography variant="h4" gutterBottom>Gestão de Lotes</Typography>

      <Box className="filter-section">
        <TextField
          label="Filtrar por Nome ou Laboratório"
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <Button variant="contained" color="primary" onClick={handleNewClick}>
          Novo Lote
        </Button>
      </Box>

      {error && <Typography color="error" gutterBottom>{error}</Typography>}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Laboratório</TableCell>
            <TableCell>Data de Produção</TableCell>
            <TableCell>Data de Vencimento</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Vacina</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lotes.map(lote => (
            <TableRow key={lote.id}>
              <TableCell>{lote.nome}</TableCell>
              <TableCell>{lote.laboratorio}</TableCell>
              <TableCell>{lote.dataProducao}</TableCell>
              <TableCell>{lote.dataVencimento}</TableCell>
              <TableCell>{lote.quantidadeVacinas}</TableCell>
              <TableCell>{lote.vacina?.nomeComum || 'N/A'}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditClick(lote)}>Editar</Button>
                <Button variant="contained" color="error" onClick={() => handleDeleteClick(lote.id)} style={{ marginLeft: 8 }}>Deletar</Button>
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

      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir o lote com ID {selectedId}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error">Excluir</Button>
        </DialogActions>
      </Dialog>

      <LoteFormulario
        open={openForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={formData}
        vacinas={vacinas}
        mode={formMode}
      />
    </Paper>
  );
};

export default LoteLista;