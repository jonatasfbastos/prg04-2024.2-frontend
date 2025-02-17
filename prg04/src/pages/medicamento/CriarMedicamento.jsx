import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function CriarMedicamento() {
    const navigate = useNavigate(); // Hook para navegação entre páginas
    const url = 'http://localhost:8080/medicamentos'; // URL da API para requisições

    // Estado para armazenar os dados do medicamento
    const [medicamento, setMedicamento] = useState({
        nome: "",
        categoria: "",
        fornecedor: "",
        dataDeFabricacao: "",
        dataDeValidade: "",
        quantidade: "",
        lote: "",
        instrucaoArmazenamento: "",
        registroAnvisa: "",
        tipoReceita: "",
        descricao: ""
    });

    // Função para atualizar o estado conforme o usuário digita
    const handleChange = (e) => {
        setMedicamento({ ...medicamento, [e.target.name]: e.target.value });
    };

    // Função para enviar os dados do medicamento para a API
    const postMedicamento = async () => {
        const response = await fetch(url + "/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...medicamento,
                quantidade: parseInt(medicamento.quantidade), // Converte quantidade para número inteiro
                registroAnvisa: parseFloat(medicamento.registroAnvisa) // Converte registroAnvisa para número decimal
            })
        })
        .then(response => {
            if (response.ok) {
                alert("Medicamento Salvo");
                // Reseta o estado para limpar os campos do formulário após salvar
                setMedicamento({
                    nome: "",
                    categoria: "",
                    fornecedor: "",
                    dataDeFabricacao: "",
                    dataDeValidade: "",
                    quantidade: "",
                    lote: "",
                    instrucaoArmazenamento: "",
                    registroAnvisa: "",
                    tipoReceita: "",
                    descricao: ""
                });
            } else {
                alert("Erro ao salvar medicamento");
            }
        })
        .catch(error => console.error("Erro na requisição:", error));
    }

    // Função para cancelar a operação e voltar para a página anterior
    function cancelar() {
        navigate(-1);
    }
   
    return (
        <div className="criar-termo-container">
            <h1>Criar Medicamento</h1>
            <form onSubmit={(e) => { e.preventDefault(); postMedicamento(); }}>
                {/* Campos do formulário */}
                <label htmlFor="nome">Nome do Medicamento <span className="required">*</span></label>
                <input type="text" name="nome" value={medicamento.nome} onChange={handleChange} placeholder="Digite o nome" id="nome" required/>

                <label htmlFor="categoria">Categoria <span className="required">*</span></label>
                <input type="text" name="categoria" value={medicamento.categoria} onChange={handleChange} placeholder="Analgésico" id="categoria" required/>

                <label htmlFor="fornecedor">Fornecedor <span className="required">*</span></label>
                <input type="text" name="fornecedor" value={medicamento.fornecedor} onChange={handleChange} placeholder="Farmacêutica XYZ" id="fornecedor" required/>

                <label htmlFor="dataDeFabricacao">Data de Fabricação <span className="required">*</span></label>
                <input type="date" name="dataDeFabricacao" value={medicamento.dataDeFabricacao} onChange={handleChange} id="dataDeFabricacao" required/>

                <label htmlFor="dataDeValidade">Data de Validade <span className="required">*</span></label>
                <input type="date" name="dataDeValidade" value={medicamento.dataDeValidade} onChange={handleChange} id="dataDeValidade" required/>

                <label htmlFor="quantidade">Quantidade <span className="required">*</span></label>
                <input type="number" name="quantidade" value={medicamento.quantidade} onChange={handleChange} placeholder="100" id="quantidade" required/>

                <label htmlFor="lote">Lote <span className="required">*</span></label>
                <input type="number" name="lote" value={medicamento.lote} onChange={handleChange} placeholder="12345" id="lote" required/>

                <label htmlFor="instrucaoArmazenamento">Instrução de Armazenamento <span className="required">*</span></label>
                <input type="text" name="instrucaoArmazenamento" value={medicamento.instrucaoArmazenamento} onChange={handleChange} placeholder="Armazenar em local seco e arejado" id="instrucaoArmazenamento" required/>

                <label htmlFor="registroAnvisa">Registro ANVISA <span className="required">*</span></label>
                <input type="number" name="registroAnvisa" value={medicamento.registroAnvisa} onChange={handleChange} placeholder="987654321" id="registroAnvisa" required/>

                <label htmlFor="tipoReceita">Tipo de Receita <span className="required">*</span></label>
                <input type="text" name="tipoReceita" value={medicamento.tipoReceita} onChange={handleChange} placeholder="Médio" id="tipoReceita" required/>

                <label htmlFor="descricao">Descrição</label>
                <textarea name="descricao" value={medicamento.descricao} onChange={handleChange} placeholder="Medicamento utilizado para alívio de dores leves a moderadas." id="descricao"></textarea>

                <button type="submit">Salvar</button>
            </form>
            <button className="form_cancelar" onClick={cancelar}>Cancelar</button>
        </div>
    )
}

export default CriarMedicamento;
