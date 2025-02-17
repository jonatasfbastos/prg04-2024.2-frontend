import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

import '../prontuario/gestao-paciente.css'; // Arquivo CSS para personalização

const GestaoPaciente = () => {
  const navigate = useNavigate();

  const goToCriarPaciente = () => {
    navigate("/criar-paciente");
  };

  const goToDetalhesPaciente = () => {
    navigate("/detalhes-paciente");
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Gestão de Pacientes</h2>
              <p className="text-center mb-4">
                "Cuidando de cada paciente com atenção, carinho e dedicação."
              </p>
              <div className="text-center">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100 mb-3 custom-button"
                  onClick={goToCriarPaciente}
                >
                  Criar Novo Paciente
                </Button>
                <Button
                  variant="outline-secondary"
                  size="lg"
                  className="w-100 custom-button"
                  onClick={goToDetalhesPaciente}
                >
                  Ver Detalhes do Paciente
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GestaoPaciente;
