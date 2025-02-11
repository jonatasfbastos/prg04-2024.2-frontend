import React from 'react';
import '../reporttable/reporttable.css'; // Importe o CSS se necessário

const ReportTable = ({ reports }) => {
  return (
    <table className="report-table">
      <thead>
        <tr>
          <th>Funcionário/ID</th>
          <th>Paciente/ID</th>
          <th>Data e Hora de Início</th>
          <th>Data e Hora de Término</th>
          <th>Tipo de Atendimento</th>
          <th>Total de Atendimentos</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report, index) => (
          <tr key={index}>
            <td>{report.employeeName} ({report.employeeCode})</td>
            <td>{report.patientName} ({report.patientCode})</td>
            <td>{report.startDateTime}</td>
            <td>{report.endDateTime}</td>
            <td>{report.serviceType}</td>
            <td>{report.totalServices}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportTable; // Exportação padrão