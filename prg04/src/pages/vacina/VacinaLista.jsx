import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, TablePagination, TextField, Button, Box } from '@mui/material';
import './VacinaLista.css';

const VacinaLista = ({ vacinas, page, rowsPerPage, totalElements, filterDoenca, filterData, onPageChange, onRowsPerPageChange, onFilter, onDelete, onEdit }) => {
  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <Paper className="vacina-lista-container">
      <Typography variant="h4" gutterBottom>Lista de Vacinas</Typography>
      
      <Box className="filter-section">
        <TextField
          label="Filtrar por Doença"
          value={filterDoenca}
          onChange={(e) => onFilter('doenca', e.target.value)}
          className="filter-input"
        />
        <TextField
          label="Filtrar por Data de Vencimento"
          type="date"
          value={filterData}
          onChange={(e) => onFilter('data', e.target.value)}
          InputLabelProps={{ shrink: true }}
          className="filter-input"
        />
        <Button variant="contained" onClick={() => onFilter('apply')} className="filter-button">Filtrar</Button>
        <Button variant="contained" onClick={() => onEdit(null)} className="new-button">Nova Vacina</Button>
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
                <Button onClick={() => onEdit(vacina.id)} color="primary">Editar</Button>
                <Button onClick={() => handleDelete(vacina.id)} color="error">Deletar</Button>
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
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

export default VacinaLista;