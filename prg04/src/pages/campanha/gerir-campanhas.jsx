import React, { useEffect, useState } from 'react';
import CampanhaTable from '../../components/campanhatable/campanhatable.jsx';
import Botao from '../../components/button/button.jsx';
import './gerir-campanhas.css';

const GerirCampanha = () => {
  const [campanhas, setCampanhas] = useState([]); // Estado para armazenar as campanhas
  const [formData, setFormData] = useState({ // Estado para o formulário
    nomec: '',
    vacina: '',
    publicoAlvo: '',
    dataInicio: '',
    dataFim: '',
  });
  const [editando, setEditando] = useState(false); // Estado para controlar se está editando

  // Busca as campanhas ao carregar o componente
  useEffect(() => {
    const fetchCampanhas = async () => {
      try {
        const response = await fetch('http://localhost:8080/campanha/findall');
        const data = await response.json();
        setCampanhas(data.campanhas); // Ajuste conforme a estrutura da resposta
      } catch (error) {
        console.error('Erro ao buscar campanhas:', error);
      }
    };

    fetchCampanhas();
  }, []);

  // Função para adicionar ou editar uma campanha
  const handleSalvarCampanha = async (e) => {
    e.preventDefault();

    const url = editando 
      ? `http://localhost:8080/campanha/update` 
      : `http://localhost:8080/campanha/save`;

    const method = editando ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (editando) {
          // Atualiza a campanha na lista
          setCampanhas(campanhas.map(campanha => 
            campanha.id === data.id ? data : campanha
          ));
          alert('Campanha atualizada com sucesso!');
        } else {
          // Adiciona a nova campanha à lista
          setCampanhas([...campanhas, data]);
          alert('Campanha adicionada com sucesso!');
        }
        setFormData({ // Limpa o formulário
          nomec: '',
          vacina: '',
          publicoAlvo: '',
          dataInicio: '',
          dataFim: '',
        });
        setEditando(false); // Sai do modo de edição
      } else {
        alert('Erro ao salvar campanha.');
      }
    } catch (error) {
      console.error('Erro ao salvar campanha:', error);
    }
  };

  // Função para excluir uma campanha
  const handleExcluirCampanha = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/campanha/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCampanhas(campanhas.filter(campanha => campanha.id !== id)); // Remove a campanha da lista
        alert('Campanha excluída com sucesso!');
      } else {
        alert('Erro ao excluir campanha.');
      }
    } catch (error) {
      console.error('Erro ao excluir campanha:', error);
    }
  };

  // Função para preencher o formulário ao editar uma campanha
  const handleEditarCampanha = (campanha) => {
    setFormData(campanha); // Preenche o formulário com os dados da campanha
    setEditando(true); // Entra no modo de edição
  };

  // Função para limpar o formulário
  const handleCancelarEdicao = () => {
    setFormData({
      nomec: '',
      vacina: '',
      publicoAlvo: '',
      dataInicio: '',
      dataFim: '',
    });
    setEditando(false); // Sai do modo de edição
  };

  return (
    <div className="gerir-campanha-container">
      <h1>Gerir Campanhas</h1>

      {/* Formulário para adicionar/editar campanha */}
      <form onSubmit={handleSalvarCampanha}>
        <input
          type="text"
          name="nomec"
          placeholder="Nome da Campanha"
          value={formData.nomec}
          onChange={(e) => setFormData({ ...formData, nomec: e.target.value })}
          required
        />
        <input
          type="text"
          name="vacina"
          placeholder="Vacina"
          value={formData.vacina}
          onChange={(e) => setFormData({ ...formData, vacina: e.target.value })}
          required
        />
        <input
          type="text"
          name="publicoAlvo"
          placeholder="Público Alvo"
          value={formData.publicoAlvo}
          onChange={(e) => setFormData({ ...formData, publicoAlvo: e.target.value })}
          required
        />
        <input
          type="date"
          name="dataInicio"
          placeholder="Data de Início"
          value={formData.dataInicio}
          onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
          required
        />
        <input
          type="date"
          name="dataFim"
          placeholder="Data de Fim"
          value={formData.dataFim}
          onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
          required
        />
        <button type="submit">{editando ? 'Atualizar' : 'Adicionar'}</button>
        {editando && (
          <button type="button" onClick={handleCancelarEdicao}>Cancelar</button>
        )}
      </form>

      {/* Tabela de campanhas */}
      <CampanhaTable
        campanhas={campanhas}
        onEditar={handleEditarCampanha}
        onExcluir={handleExcluirCampanha}
      />
    </div>
  );
};

export default GerirCampanha;