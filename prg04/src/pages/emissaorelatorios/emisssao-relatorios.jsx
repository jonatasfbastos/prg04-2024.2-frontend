import React, { useEffect, useState } from 'react';
import ReportTable from '../../components/reporttable/reporttable.jsx';
import Botao from '../../components/button/button.jsx';
import api from '../emissaorelatorios/services/api.js'; // Importando o Axios configurado
import './emissao-relatorios.css';

const EmissaoRelatorios = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/atendimentos/relatorios'); // Altere a rota conforme seu backend
        setReports(response.data);
      } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
      }
    };

    fetchReports();
  }, []);

  const handleGerarRelatorio = async () => {
    try {
      const response = await api.post('/atendimentos/gerar-relatorio');
      alert('Relatório gerado com sucesso!');
      setReports(response.data);
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      alert('Erro ao gerar relatório.');
    }
  };

  return (
    <div className="emissao-relatorios-container">
      <h1>Emissão de Relatórios de Atendimento</h1>
      <div className="actions">
        <Botao
          texto="Gerar Relatório"
          onClick={handleGerarRelatorio}
          disabled={!reports.length}
        />
      </div>
      <ReportTable reports={reports} />
    </div>
  );
};

export default EmissaoRelatorios;
