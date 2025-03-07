import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import UnidadeService from './services/api.js';
import AddUnidadeModal from './AddUnidadeModal';
import EditUnidadeModal from './EditUnidadeModal';
import DeleteUnidadeModal from './DeleteUnidadeModal';
import DetailsUnidadeModal from './DetailsUnidadeModal';

// Componente principal para gerenciar unidades
const Unidades = () => {
  // Estados do componente
  const [unidades, setUnidades] = useState([]); // Lista completa de unidades
  const [filteredUnidades, setFilteredUnidades] = useState([]); // Lista filtrada de unidades
  const [searchTerm, setSearchTerm] = useState(''); // Termo de pesquisa por nome
  const [filterType, setFilterType] = useState(''); // Filtro por tipo de unidade
  const [showAddModal, setShowAddModal] = useState(false); // Controle do modal de adição
  const [showEditModal, setShowEditModal] = useState(false); // Controle do modal de edição
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Controle do modal de exclusão
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Controle do modal de detalhes
  const [selectedUnidade, setSelectedUnidade] = useState(null); // Unidade selecionada para ações

  // Efeito para carregar as unidades ao montar o componente
  useEffect(() => {
    fetchUnidades();
  }, []);

  // Efeito para filtrar unidades quando searchTerm ou filterType mudam
  useEffect(() => {
    // Filtra primeiro pelo nome
    let filtered = unidades.filter((unidade) =>
      unidade.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Se houver um tipo selecionado, aplica o filtro por tipo
    if (filterType) {
      filtered = filtered.filter((unidade) => 
        unidade.tipo.toUpperCase() === filterType
      );
    }
    
    // Atualiza a lista filtrada
    setFilteredUnidades(filtered);
  }, [searchTerm, filterType, unidades]);

  // Função para buscar unidades da API
  const fetchUnidades = async () => {
    try {
      const response = await UnidadeService.getAll();
      // Define os estados com os dados retornados ou array vazio se não houver conteúdo
      setUnidades(response.content || []);
      setFilteredUnidades(response.content || []);
    } catch (error) {
      console.error('Erro ao carregar as unidades', error);
    }
  };

  // Função para adicionar uma nova unidade
  const handleAddUnidade = async (data) => {
    try {
      // Estrutura os dados no formato esperado pela API
      const unidadeToSave = {
        unidade: {
          nome: data.nome,
          tipo: data.tipo,
          endereco: {
            id: {
              rua: data.endereco.rua,
              numero: data.endereco.numero,
              cep: data.endereco.cep,
            },
            complemento: data.endereco.complemento || '',
            bairro: data.endereco.bairro,
            cidade: data.endereco.cidade,
            uf: data.endereco.uf,
          },
          telefone: data.telefone,
          horario_funcionamento: data.horarioFuncionamento,
          capacidade_atendimento: data.capacidadeAtendimento,
          status: data.status,
        }
      };

      console.log(JSON.stringify(unidadeToSave));
  
      // Chama a API para criar a unidade
      await UnidadeService.create(unidadeToSave);
      alert('Unidade adicionada com sucesso!');
      fetchUnidades(); // Atualiza a lista após adição
    } catch (error) {
      console.error('Erro ao adicionar unidade:', error.response?.data || error.message);
      alert('Erro ao adicionar unidade');
    }
  };
  
  // Função para editar uma unidade existente
  const handleEditUnidade = async (data) => {
    try {
      // Estrutura os dados para atualização
      const unidadeToEdit = {
        unidade: {
          nome: data.nome,
          tipo: data.tipo,
          telefone: data.telefone,
          horario_funcionamento: data.horario_funcionamento,
          capacidade_atendimento: data.capacidade_atendimento,
          status: data.status,
        }
      };

      console.log(JSON.stringify(unidadeToEdit));
  
      // Chama a API para atualizar a unidade
      await UnidadeService.update(unidadeToEdit, selectedUnidade.tipo);
      alert('Unidade atualizada com sucesso!');
      fetchUnidades(); // Atualiza a lista após edição
    } catch (error) {
      console.error('Erro ao atualizar unidade:', error);
      alert('Erro ao atualizar unidade');
    }
  };

  // Função para excluir uma unidade
  const handleDeleteUnidade = async () => {
    try {
      // Chama a API para excluir usando o telefone como identificador
      await UnidadeService.delete(selectedUnidade.telefone);
      alert('Unidade excluída com sucesso!');
      fetchUnidades(); // Atualiza a lista após exclusão
      setShowDeleteModal(false); // Fecha o modal
    } catch (error) {
      console.error('Erro ao excluir unidade', error);
    }
  };

  // Renderização do componente
  return (
    <div className="container-lg">
      {/* Seção de pesquisa, filtro e botão de adicionar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Campo de pesquisa por nome */}
        <Form.Control
          type="text"
          placeholder="Pesquisar unidade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-25 mt-2 me-2"
        />
        {/* Filtro por tipo de unidade */}
        <Form.Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-25 mt-2 me-2"
        >
          <option value="">Todos os tipos</option>
          <option value="HOSPITAL">Hospital</option>
          <option value="FARMACIA">Farmácia</option>
          <option value="UBS">UBS</option>
          <option value="UPA">UPA</option>
        </Form.Select>
        {/* Botão para abrir modal de adição */}
        <Button onClick={() => setShowAddModal(true)} variant="primary">
          Adicionar Unidade
        </Button>
      </div>

      {/* Tabela de unidades */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Horário de Funcionamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUnidades.map((unidade) => (
            <tr key={unidade.id}>
              <td>{unidade.nome}</td>
              <td>{`${unidade.endereco.id.rua}, ${unidade.endereco.id.numero}, ${unidade.endereco.bairro}, ${unidade.endereco.cidade} - ${unidade.endereco.uf}`}</td>
              <td>{unidade.telefone}</td>
              <td>{unidade.horario_funcionamento}</td>
              <td>
                {/* Botões de ação para cada unidade */}
                <Button variant="info" onClick={() => setSelectedUnidade(unidade) || setShowDetailsModal(true)}>Detalhes</Button>
                <Button variant="warning" onClick={() => setSelectedUnidade(unidade) || setShowEditModal(true)}>Editar</Button>
                <Button variant="danger" onClick={() => setSelectedUnidade(unidade) || setShowDeleteModal(true)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modais para operações CRUD */}
      <AddUnidadeModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddUnidade}
      />
      <EditUnidadeModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditUnidade}
        data={selectedUnidade}
      />
      <DeleteUnidadeModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteUnidade}
        unidade={selectedUnidade}
      />
      <DetailsUnidadeModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        data={selectedUnidade}
      />
    </div>
  );
};

export default Unidades;