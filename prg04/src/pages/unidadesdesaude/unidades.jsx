import React, { useState, useEffect } from 'react';
import UnidadeService from './services/api.js';
import AddUnidadeModal from './AddUnidadeModal';
import EditUnidadeModal from './EditUnidadeModal';
import DeleteUnidadeModal from './DeleteUnidadeModal';
import DetailsUnidadeModal from './DetailsUnidadeModal';
import '../unidadesdesaude/css/unidades.css';

// Componente principal para gerenciar unidades de saúde
const Unidades = () => {
  // Estados para armazenar e gerenciar as unidades
  const [unidades, setUnidades] = useState([]); // Lista completa de unidades
  const [filteredUnidades, setFilteredUnidades] = useState([]); // Lista filtrada que será exibida
  const [searchTerm, setSearchTerm] = useState(''); // Termo de busca para filtrar por nome
  const [tipoFilter, setTipoFilter] = useState(''); // Filtro para o tipo de unidade (hospital, UPA, etc.)
  
  // Estados para controlar a exibição dos modais
  const [showAddModal, setShowAddModal] = useState(false); // Modal de adicionar
  const [showEditModal, setShowEditModal] = useState(false); // Modal de edição
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal de exclusão
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Modal de detalhes
  
  // Estado para armazenar a unidade selecionada para ações (editar/excluir/ver detalhes)
  const [selectedUnidade, setSelectedUnidade] = useState(null);

  // Efeito que carrega as unidades quando o componente é montado
  useEffect(() => {
    fetchUnidades();
    console.log("Unidades carregadas:", unidades);
  }, []);

  // Efeito que atualiza as unidades filtradas quando há alterações nos filtros ou na lista de unidades
  useEffect(() => {
    // Filtra as unidades conforme o termo de busca e o tipo selecionado
    let filtered = unidades;

    // Aplica filtro por nome (se houver termo de busca)
    if (searchTerm) {
      filtered = filtered.filter((unidade) =>
        unidade.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplica filtro por tipo (se houver tipo selecionado)
    if (tipoFilter) {
      filtered = filtered.filter((unidade) => unidade.tipo === tipoFilter);
    }

    // Atualiza o estado das unidades filtradas
    setFilteredUnidades(filtered);
  }, [searchTerm, tipoFilter, unidades]);

  // Função para buscar todas as unidades da API
  const fetchUnidades = async () => {
    try {
      const response = await UnidadeService.getAll();
      console.log("Dados recebidos:", response);
      // Trata diferentes formatos de resposta possíveis
      setUnidades(response.content || response || []);
      setFilteredUnidades(response.content || response || []);
    } catch (error) {
      console.error("Erro ao carregar unidades", error);
    }
  };

  // Função para adicionar uma nova unidade
  const handleAddUnidade = async (data) => {
    try {
      // Prepara o objeto unidade no formato esperado pela API
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
      // Envia a requisição para a API
      await UnidadeService.create(unidadeToSave);
      alert('Unidade adicionada com sucesso!');
      // Recarrega a lista de unidades
      fetchUnidades();
    } catch (error) {
      console.error('Erro ao adicionar unidade:', error);
      alert('Erro ao adicionar unidade');
    }
  };

  // Função para editar uma unidade existente
  const handleEditUnidade = async (data) => {
    try {
      // Prepara o objeto com os dados atualizados
      const unidadeToEdit = {
        nome: data.nome,
        tipo: data.tipo,
        telefone: data.telefone,
        horario_funcionamento: data.horario_funcionamento,
        capacidade_atendimento: data.capacidade_atendimento,
        status: data.status,
      };

      console.log(JSON.stringify(unidadeToEdit));
      // Envia a requisição para a API
      await UnidadeService.update(unidadeToEdit);
      alert('Unidade atualizada com sucesso!');
      // Recarrega a lista de unidades
      fetchUnidades();
    } catch (error) {
      console.error('Erro ao atualizar unidade:', error);
      alert('Erro ao atualizar unidade');
    }
  };

  // Função para excluir uma unidade
  const handleDeleteUnidade = async () => {
    try {
      // Usa o telefone como identificador para exclusão
      await UnidadeService.delete(selectedUnidade.telefone);
      alert('Unidade excluída com sucesso!');
      // Recarrega a lista e fecha o modal
      fetchUnidades();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Erro ao excluir unidade', error);
    }
  };

  // Renderização do componente
  return (
    <div className="container-lg">
      {/* Barra superior com filtros e botão de adicionar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Campo de pesquisa por nome */}
        <input
          type="text"
          className="form-control w-25 mt-2 me-2"
          placeholder="Pesquisar unidade..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Seletor de filtro por tipo de unidade */}
        <select
          className="form-select w-25 mt-2 me-2"
          value={tipoFilter}
          onChange={(e) => setTipoFilter(e.target.value)}
        >
          <option value="">Todos os tipos</option>
          <option value="HOSPITAL">Hospital</option>
          <option value="FARMACIA">Farmácia</option>
          <option value="UPA">UPA</option>
          <option value="UBS">UBS</option>
        </select>
        {/* Botão para abrir o modal de adicionar unidade */}
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          Adicionar Unidade
        </button>
      </div>

      {/* Tabela de listagem de unidades */}
      <table className="table table-striped table-bordered table-hover table-responsive">
        <thead id='cabecalho'>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Horário de Funcionamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeia e renderiza cada unidade da lista filtrada */}
          {filteredUnidades.map((unidade, index) => (
            <tr key={unidade.id || index}>
              <td>{unidade.nome}</td>
              <td>{`${unidade.endereco.id.rua}, ${unidade.endereco.id.numero}, ${unidade.endereco.bairro}, ${unidade.endereco.cidade} - ${unidade.endereco.uf}`}</td>
              <td>{unidade.telefone}</td>
              <td>{unidade.horario_funcionamento}</td>
              <td>
                {/* Botões de ação para cada unidade */}
                <button className="btn btn-info" onClick={() => setSelectedUnidade(unidade) || setShowDetailsModal(true)}>Detalhes</button>
                <button className="btn btn-warning" onClick={() => setSelectedUnidade(unidade) || setShowEditModal(true)}>Editar</button>
                <button className="btn btn-danger" onClick={() => setSelectedUnidade(unidade) || setShowDeleteModal(true)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modais para as diferentes operações */}
      {/* Modal para adicionar nova unidade */}
      <AddUnidadeModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddUnidade}
      />
      {/* Modal para editar unidade existente */}
      <EditUnidadeModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditUnidade}
        data={selectedUnidade}
      />
      {/* Modal para confirmar exclusão de unidade */}
      <DeleteUnidadeModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteUnidade}
        unidade={selectedUnidade}
      />
      {/* Modal para visualizar detalhes da unidade */}
      <DetailsUnidadeModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        data={selectedUnidade}
      />
    </div>
  );
};

export default Unidades;