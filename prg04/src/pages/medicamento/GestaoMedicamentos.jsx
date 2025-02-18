import React, { useEffect, useState } from "react"
/*Importação de Component já criados */
import Botao from '../../components/button/button.jsx';
import "./style.css"
import {useNavigate} from 'react-router-dom';// Importar o hook useNavigate


function GestaoMedicamentos (){
    //Passando o a Endpoint, para utilizar nos métodos
    const url = 'http://localhost:8080/medicamentos'
    const navigate = useNavigate();  // Instanciando o hook useNavigate
    
    /* Ele cria um estado e um modificar de estados, quando realizo uma requisição ele muda o estado do array com os elementos*/
    const [medicamento, setMedicamento] = useState([]);
    const [medicamentoSelecionado, setMedicamentoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [modalAbertoUpdate, setModalAbertoUpdate] = useState(false);
    

     // Função para buscar medicamentos
     function getMedicamentos() {
        fetch(url + "/findall", {
            method: "GET",
            headers: {
                'content-Type': 'application/json',
            },
        })
        .then(Response => Response.json())
        .then(data => {
            /*Pegando os dados dentro da paginação */
            setMedicamento(data.content);
        })
        .catch(error => alert('Erro ao buscar medicamentos:', error));
    }

        /* Pegando o "id" Código futuramento  e nome, o id para enviar para requisição e o nome para informar ao usuário */
        function deleteMedicamento(id, nome){
            if(confirm("Deseja Excluir Medicamento: " + nome + "?")){
                fetch(url + "/delete/" + id, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(response => {
                    if (response.ok) {
                        alert("Medicamento Excluido");
                        /*Atualizando a tabela*/
                        getMedicamentos();
                    } else {
                        alert("Erro ao excluir medicamento");
                    }
                })
                .catch(error => console.log(error))
            }
            
        }

         // Estado para armazenar os dados do medicamento
            const [medicamentoSelecionadoUpdate, setMedicamentoSelecionadoUpdate] = useState({
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
                setMedicamentoSelecionadoUpdate({ ...medicamento, [e.target.name]: e.target.value });
            };

        const atualizarDados = async () => {
            const response = await fetch(url + "/Update/" + medicamentoSelecionadoUpdate.id , {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    medicamentoSelecionadoUpdate,
                    quantidade: parseInt(medicamentoSelecionadoUpdate.quantidade), // Converte quantidade para número inteiro
                    registroAnvisa: parseFloat(medicamentoSelecionadoUpdate.registroAnvisa) // Converte registroAnvisa para número decimal
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

        function abrirUpdate(med){
            setMedicamentoSelecionadoUpdate(med);
            setModalAbertoUpdate(true);
        }

        /*Colocar os dados no medicamentos selecionados */
        function abrirDetalhes(med){
           setMedicamentoSelecionado(med)
           /* Abre a tela do Modal e Carregar os dados de Medicamentos */
           setModalAberto(true);
        }

        /* Fecha a tela do Modal e Elimina os dados carregado */
        function fecharModal(){
            setModalAberto(false);
            setMedicamentoSelecionado(null);
        }

        function fecharModalUpdate(){
            if (confirm("Cancelar a alteração?")) {
                setModalAbertoUpdate(false);
            }
            
        }

        function goToMedicamento(){
            navigate("/CriarMedicamento");
        }

        function formatarDataParaInput(dataString) {
            if (!dataString) return "";
            const data = new Date(dataString);
            return data.toISOString().split("T")[0]; // Retorna no formato YYYY-MM-DD
        }
        

    // UseEffect para buscar os dados apenas na montagem do componente
    useEffect(() => {
        getMedicamentos();
    }, []); // Array de dependências vazio para rodar apenas na montagem do componente

    /* Transformando Objetos em Array utilizando a propriedade do JS, verificar ser é um array caso não transforma em um*/
    const listaMedicamento = Array.isArray(medicamento) ? medicamento : [medicamento];
    

    /*Page*/
    return (
    <main>
    <header>

       <div className="header_medicamentos">
            <h1>Medicamentos</h1>
            <div className="header_medicamentos-acao">
                <div className="header-pesquisar_input">
                    <input type="text" name="pesquisar" id="pesquisar" placeholder="Digite o medicamento ..."/>
                </div>
                <div className="header_button">
                    <button className="header_button_acao">Pesquisar</button>
                    <button className="header_button_acao" onClick={goToMedicamento}>Novo</button>
                </div>
            </div>
            
       </div> 
       
    </header>
    <section>
        <div className="section_botao-atualizar">
         <Botao texto="Atualizar" className="delete" onClick={getMedicamentos}/>
        </div>
        
        <div className="table">
                <table>
                <thead>
                    
                        <tr >
                            <td>Codigo</td>
                            <td>Nome</td>
                            <td>Categoria </td>
                            <td>Quantidade</td>
                            
                        </tr>
                </thead>
                <tbody> 
                    {/* Criar uma tabela com base no seu elementos adicionando um index para ser o chave e seus elementos*/}
                {medicamento.length > 0 ? (
                        medicamento.map((med, index) => (
                            <tr key={index}>
                                <td>{med.id}</td>
                                <td>{med.nome}</td>
                                <td>{med.categoria}</td>
                                <td>{med.quantidade}</td>
                                <td>
                                    <Botao texto="Excluir" onClick={() => deleteMedicamento(med.id, med.nome)}/>
                                    <Botao texto="Editar" onClick={() => abrirUpdate(med)}/>
                                    <Botao texto="Ver Detalhes" onClick={() => abrirDetalhes(med)}/>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Nenhum medicamento encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </section>

    {/* Carregar um Modal para aparecer todas os dados pegando pelo Código*/}
    {modalAberto && medicamentoSelecionado && (
        <div class className="modal_medicamento">
            <div className="modal_medicamento-content">
                <span className="close" onClick={fecharModal}>&times;</span>
                    <h2>Detalhes do Medicamento</h2>
                    <p><strong>Nome:</strong> {medicamentoSelecionado.nome}</p>
                    <p><strong>Categoria:</strong> {medicamentoSelecionado.categoria}</p>
                    {/* Realizando a conversão de número para data e convertendo para data pt-BR */}
                    <p><strong>Data De Fabricacao:</strong> {formatarDataParaInput(medicamentoSelecionado.dataDeFabricacao)}</p>
                    <p><strong>Data De Validade:</strong> {formatarDataParaInput(medicamentoSelecionado.dataDeValidade)}</p>
                    <p><strong>Quantidade:</strong> {medicamentoSelecionado.quantidade}</p>
                    <p><strong>Instrucao de Armazenamento:</strong> {medicamentoSelecionado.instrucaoArmazenamento}</p>
                    <p><strong>registro da Anvisa:</strong> {medicamentoSelecionado.registroAnvisa}</p>
                    <p><strong>Tipo de Receita:</strong> {medicamentoSelecionado.tipoReceita}</p>
                    <p><strong>Descrição:</strong> {medicamentoSelecionado.descricao || "Sem descrição"}</p>
            </div>
        </div>
    )}


    {modalAbertoUpdate && medicamentoSelecionadoUpdate && (
        <div class className="modal_medicamento-update">
            <div className="modal_medicamento-content-update">
                <span className="close" onClick={fecharModalUpdate}>&times;</span>
        
                <h2>Atualizar Medicamentos</h2>

            <form onSubmit={(e) => { e.preventDefault(); atualizarDados(); }}>
                
                {/* Campos do formulário */}
                <label htmlFor="nome">Nome do Medicamento <span className="required">*</span></label>
                <input type="text" name="nome" value={medicamentoSelecionadoUpdate.nome}  placeholder="Digite o nome" id="nome" required/>

                <label htmlFor="categoria">Categoria <span className="required">*</span></label>
                <input type="text" name="categoria" value={medicamentoSelecionadoUpdate.categoria}  placeholder="Analgésico" id="categoria" required/>

                <label htmlFor="fornecedor">Fornecedor <span className="required">*</span></label>
                <input type="text" name="fornecedor" value={medicamentoSelecionadoUpdate.fornecedor}  placeholder="Farmacêutica XYZ" id="fornecedor" required/>

                <label htmlFor="dataDeFabricacao">Data de Fabricação <span className="required">*</span></label>
                <input type="date" name="dataDeFabricacao" value={new Date(medicamentoSelecionadoUpdate.dataDeFabricacao).toLocaleDateString('pt-BR')}  id="dataDeFabricacao" required/>

                <label htmlFor="dataDeValidade">Data de Validade <span className="required">*</span></label>
                <input type="date" name="dataDeValidade" value={new Date(medicamentoSelecionadoUpdate.dataDeValidade).toLocaleDateString('pt-BR')}  id="dataDeValidade" required/>

                <label htmlFor="quantidade">Quantidade <span className="required">*</span></label>
                <input type="number" name="quantidade" value={medicamentoSelecionadoUpdate.quantidade}  placeholder="100" id="quantidade" required/>

                <label htmlFor="lote">Lote <span className="required">*</span></label>
                <input type="number" name="lote" value={medicamentoSelecionadoUpdate.lote}  placeholder="12345" id="lote" required/>

                <label htmlFor="instrucaoArmazenamento">Instrução de Armazenamento <span className="required">*</span></label>
                <input type="text" name="instrucaoArmazenamento" value={medicamentoSelecionadoUpdate.instrucaoArmazenamento}  placeholder="Armazenar em local seco e arejado" id="instrucaoArmazenamento" required/>

                <label htmlFor="registroAnvisa">Registro ANVISA <span className="required">*</span></label>
                <input type="number" name="registroAnvisa" value={medicamentoSelecionadoUpdate.registroAnvisa}  placeholder="987654321" id="registroAnvisa" required/>

                <label htmlFor="tipoReceita">Tipo de Receita <span className="required">*</span></label>
                <input type="text" name="tipoReceita" value={medicamentoSelecionadoUpdate.tipoReceita}  placeholder="Médio" id="tipoReceita" required/>

                <label htmlFor="descricao">Descrição</label>
                <textarea name="descricao" value={medicamentoSelecionadoUpdate.descricao}  placeholder="Medicamento utilizado para alívio de dores leves a moderadas." id="descricao"></textarea>

                <button onClick={() => AtualizandoDados()}>Salvar</button>
            </form>
        </div>
        </div>
    )}
    </main>
    )
}

/*Exportanto O método de Medicamentos */
export default GestaoMedicamentos;

