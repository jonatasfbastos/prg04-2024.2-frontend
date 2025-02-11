import React, { useState } from 'react';
import Botao from '../../components/button/button.jsx';
import { Modal } from 'react-bootstrap';
import './unidades.css';

const Unidades = () => {
    const [units, setUnits] = useState([
    { id: 1, name: 'Unidade Saúde 1', type: 'hospital', address: 'Rua A, 123', phone: '(11) 1234-5678', schedule: '24 horas', capacity: '100 pacientes/dia', status: 'ativa' },
    { id: 2, name: 'Unidade Saúde 2', type: 'upa', address: 'Rua B, 456', phone: '(11) 9876-5432', schedule: '8h-18h', capacity: '50 pacientes/dia', status: 'inativa' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [unitToDelete, setUnitToDelete] = useState({});
    const [unitToEdit, setUnitToEdit] = useState({});

    // Estado para os dados de adicionar/editar
    const [newUnit, setNewUnit] = useState({
    name: '', type: '', address: '', phone: '', schedule: '', capacity: '', status: ''
    });

    const handleSearch = (event) => setSearchTerm(event.target.value);
    const filteredUnits = units.filter(unit => unit.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Função para atualizar o estado ao digitar nos inputs
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUnit(prev => ({
        ...prev,
        [name]: value
    }));
    };

    // Função para adicionar unidade
    const handleAdd = () => {
    setUnits([...units, { ...newUnit, id: units.length + 1 }]);
    setNewUnit({ name: '', type: '', address: '', phone: '', schedule: '', capacity: '', status: '' });
    setShowAddModal(false);
    };

    // Função para deletar unidade
    const handleDelete = (unit) => {
    setUnitToDelete(unit);
    setShowDeleteModal(true);
    };

    const confirmDelete = () => {
    setUnits(units.filter(unit => unit.id !== unitToDelete.id));
    setShowDeleteModal(false);
    };

    // Função para editar unidade
    const handleEdit = (unit) => {
    setUnitToEdit(unit);
    setNewUnit({ ...unit });
    setShowEditModal(true);
    };

    const handleUpdate = () => {
    setUnits(units.map(u => u.id === unitToEdit.id ? { ...newUnit, id: u.id } : u));
    setShowEditModal(false);
    };

    return (
    <div className="container mt-4">
        {/* Modal para adicionar */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Adicionar Unidade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome</label>
                <input type="text" className="form-control" id="name" name="name" value={newUnit.name} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="type" className="form-label">Tipo</label>
                <select className="form-select" id="type" name="type" value={newUnit.type} onChange={handleInputChange}>
                <option value="">Selecione</option>
                <option value="hospital">Hospital</option>
                <option value="upa">UPA</option>
                <option value="ubs">UBS</option>
                <option value="farmacia">Farmácia</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Endereço</label>
                <input type="text" className="form-control" id="address" name="address" value={newUnit.address} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Telefone</label>
                <input type="text" className="form-control" id="phone" name="phone" value={newUnit.phone} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="schedule" className="form-label">Horário de Funcionamento</label>
                <input type="text" className="form-control" id="schedule" name="schedule" value={newUnit.schedule} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="capacity" className="form-label">Capacidade de Atendimento</label>
                <input type="text" className="form-control" id="capacity" name="capacity" value={newUnit.capacity} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select className="form-select" id="status" name="status" value={newUnit.status} onChange={handleInputChange}>
                <option value="">Selecione</option>
                <option value="ativa">Ativa</option>
                <option value="inativa">Inativa</option>
                <option value="em reforma">Em Reforma</option>
                </select>
            </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Botao texto="Cancelar" onClick={() => setShowAddModal(false)} />
            <Botao texto="Adicionar" onClick={handleAdd} />
        </Modal.Footer>
        </Modal>

        {/* Modal para deletar */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Tem certeza que deseja excluir {unitToDelete.name}?</h5>
            <ul className="list-group">
            <li className="list-group-item"><strong>Nome:</strong> {unitToDelete.name}</li>
            <li className="list-group-item"><strong>Tipo:</strong> {unitToDelete.type}</li>
            <li className="list-group-item"><strong>Endereço:</strong> {unitToDelete.address}</li>
            <li className="list-group-item"><strong>Telefone:</strong> {unitToDelete.phone}</li>
            <li className="list-group-item"><strong>Horário:</strong> {unitToDelete.schedule}</li>
            <li className="list-group-item"><strong>Capacidade:</strong> {unitToDelete.capacity}</li>
            <li className="list-group-item"><strong>Status:</strong> {unitToDelete.status}</li>
            </ul>
        </Modal.Body>
        <Modal.Footer>
            <Botao texto="Cancelar" onClick={() => setShowDeleteModal(false)} />
            <Botao texto="Confirmar" onClick={confirmDelete} />
        </Modal.Footer>
        </Modal>

        {/* Modal para editar */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Unidade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* Inputs para editar uma unidade, com placeholders preenchidos */}
            <div className="mb-3">
              <label htmlFor="nameEdit" className="form-label">Nome</label>
              <input type="text" className="form-control" id="nameEdit" name="name" value={newUnit.name} onChange={handleInputChange} placeholder={unitToEdit.name} />
            </div>
            <div className="mb-3">
              <label htmlFor="typeEdit" className="form-label">Tipo</label>
              <select className="form-select" id="typeEdit" name="type" value={newUnit.type} onChange={handleInputChange}>
                <option value="">Selecione</option>
                <option value="hospital">Hospital</option>
                <option value="upa">UPA</option>
                <option value="ubs">UBS</option>
                <option value="farmacia">Farmácia</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="addressEdit" className="form-label">Endereço</label>
              <input type="text" className="form-control" id="addressEdit" name="address" value={newUnit.address} onChange={handleInputChange} placeholder={unitToEdit.address} />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneEdit" className="form-label">Telefone</label>
              <input type="text" className="form-control" id="phoneEdit" name="phone" value={newUnit.phone} onChange={handleInputChange} placeholder={unitToEdit.phone} />
            </div>
            <div className="mb-3">
              <label htmlFor="scheduleEdit" className="form-label">Horário de Funcionamento</label>
              <input type="text" className="form-control" id="scheduleEdit" name="schedule" value={newUnit.schedule} onChange={handleInputChange} placeholder={unitToEdit.schedule} />
            </div>
            <div className="mb-3">
              <label htmlFor="capacityEdit" className="form-label">Capacidade de Atendimento</label>
              <input type="text" className="form-control" id="capacityEdit" name="capacity" value={newUnit.capacity} onChange={handleInputChange} placeholder={unitToEdit.capacity} />
            </div>
            <div className="mb-3">
              <label htmlFor="statusEdit" className="form-label">Status</label>
              <select className="form-select" id="statusEdit" name="status" value={newUnit.status} onChange={handleInputChange}>
                <option value="">Selecione</option>
                <option value="ativa">Ativa</option>
                <option value="inativa">Inativa</option>
                <option value="em reforma">Em Reforma</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Botao texto="Cancelar" onClick={() => setShowEditModal(false)} />
          <Botao texto="Salvar" onClick={handleUpdate} />
        </Modal.Footer>
      </Modal>

        <div className="row">
        <div className="col-12 mb-3">
            <div className="input-group">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Pesquisar unidade por nome" 
                value={searchTerm} 
                onChange={handleSearch}
            />
            <Botao texto="Adicionar Unidade" onClick={() => setShowAddModal(true)} className="btn btn-primary" />
            </div>
        </div>
        </div>
        <div className="table-responsive">
        <table className="table table-striped table-hover">
            <thead>
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Tipo</th>
                <th scope="col">Endereço</th>
                <th scope="col">Telefone</th>
                <th scope="col">Horário</th>
                <th scope="col">Capacidade</th>
                <th scope="col">Status</th>
                <th scope="col">Ações</th>
            </tr>
            </thead>
            <tbody>
            {filteredUnits.map((unit) => (
                <tr key={unit.id}>
                <td>{unit.name}</td>
                <td>{unit.type}</td>
                <td>{unit.address}</td>
                <td>{unit.phone}</td>
                <td>{unit.schedule}</td>
                <td>{unit.capacity}</td>
                <td>{unit.status}</td>
                <td>
                    <Botao texto="Deletar" onClick={() => handleDelete(unit)} className="btn btn-danger btn-sm" />
                    <Botao texto="Editar" onClick={() => handleEdit(unit)} className="btn btn-warning btn-sm" />
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
    );
};
// Exportando a função Unidades para ser utilizada em outros componentes
export default Unidades;