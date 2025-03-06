import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VacinaLista from './VacinaLista';
import VacinaFormulario from './VacinaFormulario';
import './VacinaLista.css';
import './VacinaFormulario.css';

const Vacinas = () => {
  const [vacinas, setVacinas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [filterDoenca, setFilterDoenca] = useState('');
  const [filterData, setFilterData] = useState('');
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
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchVacinas = () => {
    let url = `http://localhost:8080/vacinas/findall?page=${page}&size=${rowsPerPage}`;
    if (filterDoenca) url = `http://localhost:8080/vacinas/findByDoenca/${encodeURIComponent(filterDoenca)}?page=${page}&size=${rowsPerPage}`;
    if (filterData) url = `http://localhost:8080/vacinas/findByDataVencimento/${filterData}?page=${page}&size=${rowsPerPage}`;

    axios.get(url)
      .then(response => {
        setVacinas(response.data.content);
        setTotalElements(response.data.totalElements);
      })
      .catch(error => console.error('Erro ao buscar vacinas:', error));
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
    axios.delete(`http://localhost:8080/vacinas/delete/${id}`)
      .then(() => fetchVacinas())
      .catch(error => console.error('Erro ao deletar vacina:', error));
  };

  const handleEdit = (id) => {
    if (id === null) {
      // Nova vacina
      setFormData({
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
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Editar vacina existente
      axios.get(`http://localhost:8080/vacinas/findById/${id}`)
        .then(response => {
          setFormData(response.data);
          setIsEditing(true);
          setEditingId(id);
        })
        .catch(error => console.error('Erro ao buscar vacina:', error));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = isEditing
      ? axios.put(`http://localhost:8080/vacinas/update/${editingId}`, formData)
      : axios.post('http://localhost:8080/vacinas/save', formData);

    request
      .then(() => {
        console.log(isEditing ? 'Vacina atualizada' : 'Vacina criada');
        fetchVacinas();
        setIsEditing(false);
        setEditingId(null);
        setFormData({
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
      })
      .catch(error => console.error('Erro ao salvar vacina:', error));
  };

  return (
    <div className="vacinas-page">
      <VacinaLista
        vacinas={vacinas}
        page={page}
        rowsPerPage={rowsPerPage}
        totalElements={totalElements}
        filterDoenca={filterDoenca}
        filterData={filterData}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onFilter={handleFilter}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <VacinaFormulario
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Vacinas;