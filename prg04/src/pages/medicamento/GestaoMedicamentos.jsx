import React, { useEffect, useState } from "react"
/*Importação de Component já criados */
import Botao from '../../components/button/button.jsx';
import ReportTable from '../../components/reporttable/reporttable.jsx';
import "./style.css"


function GestaoMedicamentos (){
    //Passando o a Endpoint, para utilizar nos métodos
    const url = 'http://localhost:8080/medicamentos'

    /* Ele cria um estado e um modificar de estados, quando realizo uma requisição ele muda o estado do array com os elementos*/
    const [medicamento, setMedicamento] = useState([]);

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

        function Detalhes(){
            alert("Detalhes")
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
                    <button className="header_button_acao">Novo</button>
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
                                    <Botao texto="Editar"/>
                                    <Botao texto="Ver Detalhes" onClick={() => Detalhes()}/>
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
    </main>
    )
}

/*Exportanto O método de Medicamentos */
export default GestaoMedicamentos;