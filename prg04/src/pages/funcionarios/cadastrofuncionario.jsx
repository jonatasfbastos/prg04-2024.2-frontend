import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Botao from "../../components/button/button"; // Botão customizado, se necessário
import api from "./services/api"; // Certifique-se de que a instância da API está correta
import './funcionario.css';
const CadastroFuncionario = () => {
  const navigate = useNavigate();
  
  // Configuração do react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Função executada no submit do formulário
  const onSubmit = async (data) => {
    try {
      // Envia os dados para a API
      const response = await api.post('/funcionarios', data);
      console.log('Funcionário cadastrado:', response.data);
      alert('Funcionário cadastrado com sucesso!');
      navigate("/home"); // Navega para a página principal após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      alert('Erro ao cadastrar funcionário.');
    }
  };

  return (
    <div id="cadastroFuncionarioPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="logo">
            <h1 className="titulo-principal" >Cadastrar Funcionário</h1>
              <span className="text-danger sinal-plus">+</span>
          </div>
          <TextField
            id="codigo"
            label="Código"
            variant="filled"
            fullWidth
            margin="normal"
            {...register("codigo", { required: "Código é obrigatório." })}
            error={Boolean(errors.codigo)}
            helperText={errors.codigo?.message}
          />
          
          <TextField
            id="login"
            label="Login"
            variant="filled"
            fullWidth
            margin="normal"
            {...register("login", { required: "Login é obrigatório." })}
            error={Boolean(errors.login)}
            helperText={errors.login?.message}
          />
          
          <TextField
            id="senha"
            label="Senha"
            variant="filled"
            type="password"
            fullWidth
            margin="normal"
            {...register("senha", { required: "Senha é obrigatória." })}
            error={Boolean(errors.senha)}
            helperText={errors.senha?.message}
          />
          
          <TextField
            id="categoria"
            label="Categoria"
            variant="filled"
            fullWidth
            margin="normal"
            {...register("categoria", { required: "Categoria é obrigatória." })}
            error={Boolean(errors.categoria)}
            helperText={errors.categoria?.message}
          />
          
          <TextField
            id="nome"
            label="Nome"
            variant="filled"
            fullWidth
            margin="normal"
            {...register("nome", { required: "Nome é obrigatório." })}
            error={Boolean(errors.nome)}
            helperText={errors.nome?.message}
          />
          
          <TextField
            id="cpf"
            label="CPF"
            variant="filled"
            fullWidth
            margin="normal"
            {...register("cpf", { required: "CPF é obrigatório." })}
            error={Boolean(errors.cpf)}
            helperText={errors.cpf?.message}
          />
          
          <TextField
            id="endereco"
            label="Endereço"
            variant="filled"
            fullWidth
            margin="normal"
            {...register("endereco", { required: "Endereço é obrigatório." })}
            error={Boolean(errors.endereco)}
            helperText={errors.endereco?.message}
          />
          
          <TextField
            id="telefone"
            label="Telefone"
            variant="filled"
            fullWidth
            margin="normal"
            {...register("telefone", { required: "Telefone é obrigatório." })}
            error={Boolean(errors.telefone)}
            helperText={errors.telefone?.message}
          />

          <Botao type="submit" texto="Cadastrar" variant="contained" />
        </form>
      </div>
    </div>
  );
};

export default CadastroFuncionario;
