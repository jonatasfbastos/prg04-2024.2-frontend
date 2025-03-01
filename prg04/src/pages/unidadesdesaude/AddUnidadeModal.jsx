import React, { useState } from 'react';

/**
 * Componente Modal para adicionar uma nova unidade de saúde
 * @param {boolean} show - Controla a visibilidade do modal
 * @param {function} onClose - Função para fechar o modal
 * @param {function} onSubmit - Função para enviar os dados do formulário
 */
const AddUnidadeModal = ({ show, onClose, onSubmit }) => {
  // Estado para armazenar os dados do formulário
  const [data, setData] = useState({
    nome: '',
    tipo: 'HOSPITAL', // Valor padrão definido como HOSPITAL
    telefone: '',
    horario_funcionamento: '',
    capacidade_atendimento: '',
    status: 'ATIVO', // Valor padrão definido como ATIVO
    endereco: {
      rua: '',
      numero: '',
      cep: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
    },
  });

  /**
   * Gerencia alterações nos campos do formulário
   * @param {Event} e - Evento de mudança do campo
   * @param {boolean} isEndereco - Indica se o campo faz parte do objeto endereço
   */
  const handleChange = (e, isEndereco) => {
    const { name, value } = e.target;
    if (isEndereco) {
      // Atualiza o campo dentro do objeto endereço
      setData({
        ...data,
        endereco: {
          ...data.endereco,
          [name]: value,
        },
      });
    } else {
      // Atualiza os campos principais do objeto data
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  /**
   * Converte todos os campos de texto para maiúsculas
   * @param {Object} data - Objeto com os dados do formulário
   * @returns {Object} - Objeto com todos os campos de texto em maiúsculas
   */
  const transformDataToUpperCase = (data) => {
    return {
      ...data,
      nome: data.nome.toUpperCase(),
      tipo: data.tipo.toUpperCase(),
      telefone: data.telefone.toUpperCase(),
      horario_funcionamento: data.horario_funcionamento.toUpperCase(),
      capacidade_atendimento: data.capacidade_atendimento.toUpperCase(),
      status: data.status.toUpperCase(),
      endereco: {
        rua: data.endereco.rua.toUpperCase(),
        numero: data.endereco.numero.toUpperCase(),
        cep: data.endereco.cep.toUpperCase(),
        complemento: data.endereco.complemento.toUpperCase(),
        bairro: data.endereco.bairro.toUpperCase(),
        cidade: data.endereco.cidade.toUpperCase(),
        uf: data.endereco.uf.toUpperCase(),
      },
    };
  };

  /**
   * Verifica se todos os campos obrigatórios foram preenchidos
   * @returns {boolean} - Verdadeiro se todos os campos obrigatórios estiverem preenchidos
   */
  const isValid = () => {
    return (
      data.nome &&
      data.telefone &&
      data.horario_funcionamento &&
      data.capacidade_atendimento &&
      data.endereco.rua &&
      data.endereco.numero &&
      data.endereco.cep &&
      data.endereco.bairro &&
      data.endereco.cidade &&
      data.endereco.uf
    );
  };

  /**
   * Gerencia o envio do formulário
   * Valida os dados, transforma em maiúsculas e envia para o componente pai
   */
  const handleSubmit = () => {
    if (isValid()) {
      // Transforma os dados para maiúsculo antes de enviar
      const transformedData = transformDataToUpperCase(data);
      // Passa os dados para o componente pai
      onSubmit(transformedData);
      // Fecha o modal após o envio bem-sucedido
      onClose();
    } else {
      // Exibe alerta se houver campos obrigatórios não preenchidos
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  // Renderiza o componente modal
  return (
    // A classe 'd-block' ou 'd-none' controla a visibilidade do modal
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Cabeçalho do modal */}
          <div className="modal-header">
            <h5 className="modal-title">Adicionar Unidade de Saúde</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          {/* Corpo do modal com o formulário */}
          <div className="modal-body">
            <form className='w-100'>
              {/* Campos para informações básicas da unidade */}
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input type="text" className="form-control" name="nome" value={data.nome} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select className="form-select" name="tipo" value={data.tipo} onChange={handleChange}>
                  <option value="HOSPITAL">HOSPITAL</option>
                  <option value="FARMACIA">FARMACIA</option>
                  <option value="UPA">UPA</option>
                  <option value="UBS">UBS</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Telefone</label>
                <input type="text" className="form-control" name="telefone" value={data.telefone} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Horário</label>
                <input type="text" className="form-control" name="horario_funcionamento" value={data.horario_funcionamento} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Capacidade</label>
                <input type="text" className="form-control" name="capacidade_atendimento" value={data.capacidade_atendimento} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" name="status" value={data.status} onChange={handleChange}>
                  <option value="ATIVO">ATIVO</option>
                  <option value="INATIVO">INATIVO</option>
                  <option value="EM REFORMA">EM REFORMA</option>
                </select>
              </div>
              
              {/* Seção de campos para o endereço */}
              <h6>Endereço</h6>
              <div className="mb-3">
                <label className="form-label">Rua</label>
                <input type="text" className="form-control" name="rua" value={data.endereco.rua} onChange={(e) => handleChange(e, true)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Número</label>
                <input type="text" className="form-control" name="numero" value={data.endereco.numero} onChange={(e) => handleChange(e, true)} />
              </div>
              <div className="mb-3">
                <label className="form-label">CEP</label>
                <input type="text" className="form-control" name="cep" value={data.endereco.cep} onChange={(e) => handleChange(e, true)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Complemento</label>
                <input type="text" className="form-control" name="complemento" value={data.endereco.complemento} onChange={(e) => handleChange(e, true)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Bairro</label>
                <input type="text" className="form-control" name="bairro" value={data.endereco.bairro} onChange={(e) => handleChange(e, true)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Cidade</label>
                <input type="text" className="form-control" name="cidade" value={data.endereco.cidade} onChange={(e) => handleChange(e, true)} />
              </div>
              <div className="mb-3">
                <label className="form-label">UF</label>
                <input type="text" className="form-control" name="uf" value={data.endereco.uf} onChange={(e) => handleChange(e, true)} />
              </div>
            </form>
          </div>
          
          {/* Rodapé do modal com botões de ação */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUnidadeModal;