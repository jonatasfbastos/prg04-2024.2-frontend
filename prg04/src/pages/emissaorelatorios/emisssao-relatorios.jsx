import React, { useEffect, useState } from 'react';
import ReportTable from '../../components/reporttable/reporttable.jsx';
import Botao from '../../components/button/button.jsx';
import './emissao-relatorios.css';

const EmissaoRelatorios = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await getReports();
      setReports(data);
    };

    fetchReports();
  }, []);

  const handleGerarRelatorio = () => {
    alert('Relatório gerado com sucesso!');
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