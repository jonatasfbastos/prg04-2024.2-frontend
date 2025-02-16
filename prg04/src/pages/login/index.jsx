import { useForm } from "react-hook-form";
import "./styles.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Botao from "../../components/button/button"; // Certifique-se que este componente repassa as props corretamente

export default function Index() {
    const navigate = useNavigate();

    // Configuração do react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Função executada no submit do formulário
    const onSubmit = (data) => {
        console.log("Dados do formulário:", data);
        navigate("/home");
    };

    return (
        <div id="loginPage">
            <div className="formContainer">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="logo">
                    <h1 className="titulo-principal">
                        Saúde
                        <span className="text-danger sinal-plus">+</span>
                    </h1>
                    </div>
                    <TextField
                        id="email"
                        label="E-mail"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        {
                            ...register(
                                "email", 
                                {
                                    required: "Por favor, insira um e-mail.",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Por favor, insira um e-mail válido.",
                                    },
                                }
                            )
                        }
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                    />
                    <TextField id="senha"
                        label="Senha"
                        variant="filled"
                        type="password"
                        fullWidth
                        margin="normal"
                        {
                            ...register(
                                "senha", 
                                { 
                                    required: "A senha é obrigatória.",
                                    minLength: {
                                        value: 6,
                                        message: "A senha deve conter pelo menos 6 caracteres.",
                                    },
                                }
                            )
                        }
                        error={Boolean(errors.senha)}
                        helperText={errors.senha?.message}
                    />
                    <Botao type="submit" texto="Entrar" variant="contained" />
                </form>
            </div>
        </div>
    );
}
