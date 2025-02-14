import React, { useState, useEffect } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import UnidadeService from './services/api.js';
import AddUnidadeModal from './AddUnidadeModal';
import EditUnidadeModal from './EditUnidadeModal';
import DeleteUnidadeModal from './DeleteUnidadeModal';
import DetailsUnidadeModal from './DetailsUnidadeModal';

const Unidades = () => {
  const [unidades, setUnidades] = useState([]);
  const [filteredUnidades, setFilteredUnidades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUnidade, setSelectedUnidade] = useState(null);

  useEffect(() => {
    fetchUnidades();
  }, []);

  useEffect(() => {
    // Filtra as unidades conforme o termo de busca
    const filtered = unidades.filter((unidade) =>
      unidade.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUnidades(filtered);
  }, [searchTerm, unidades]);

  const fetchUnidades = async () => {
    try {
      const response = await UnidadeService.getAll();
      setUnidades(response.content || []);
      setFilteredUnidades(response.content || []); // Inicializa o estado filtrado
    } catch (error) {
      console.error('Erro ao carregar as unidades', error);
    }
  };

  const handleAddUnidade = async (data) => {
    try {
      const unidadeToSave = {
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
      };

      console.log(JSON.stringify(unidadeToSave));
  
      // Agora chama a API para criar a unidade
      await UnidadeService.create(unidadeToSave);
      // Após adicionar, você pode atualizar o estado ou fazer algo mais
      alert('Unidade adicionada com sucesso!');
      fetchUnidades(); // Atualiza a lista de unidades
    } catch (error) {
      console.error('Erro ao adicionar unidade:', error);
      alert('Erro ao adicionar unidade');
    }
  };
  

  const handleEditUnidade = async (data) => {
    try {
      const unidadeToEdit = {
        nome: data.nome,
        tipo: data.tipo,
        telefone: data.telefone,
        horario_funcionamento: data.horario_funcionamento,
        capacidade_atendimento: data.capacidade_atendimento,
        status: data.status,
      };

      console.log(JSON.stringify(unidadeToEdit));
  
      // Agora chama a API para atualizar a unidade
      await UnidadeService.update(unidadeToEdit); // Passando o ID da unidade que está sendo editada
      alert('Unidade atualizada com sucesso!');
      fetchUnidades(); // Atualiza a lista de unidades
    } catch (error) {
      console.error('Erro ao atualizar unidade:', error);
      alert('Erro ao atualizar unidade');
    }
  };

  const handleDeleteUnidade = async () => {
    try {
      await UnidadeService.delete(selectedUnidade.telefone);
      alert('Unidade excluída com sucesso!');
      fetchUnidades(); // Atualiza a lista de unidades
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Erro ao excluir unidade', error);
    }
  };

  return (
    <div className="container-lg">
      {/* Input de pesquisa e botão de adicionar na mesma linha */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Control
          type="text"
          placeholder="Pesquisar unidade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-50 mt-2"
        />
        <Button onClick={() => setShowAddModal(true)} variant="primary">
          Adicionar Unidade
        </Button>
      </div>

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
                <Button variant="info" onClick={() => setSelectedUnidade(unidade) || setShowDetailsModal(true)}>Detalhes</Button>
                <Button variant="warning" onClick={() => setSelectedUnidade(unidade) || setShowEditModal(true)}>Editar</Button>
                <Button variant="danger" onClick={() => setSelectedUnidade(unidade) || setShowDeleteModal(true)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modals */}
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
