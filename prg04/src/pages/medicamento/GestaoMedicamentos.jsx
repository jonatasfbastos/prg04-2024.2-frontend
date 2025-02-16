import React, { useEffect, useState } from "react"
/*Importação de Component já criados */
import Botao from '../../components/button/button.jsx';
import ReportTable from '../../components/reporttable/reporttable.jsx';
import "./style.css"


function GestaoMedicamentos (){
    const url = 'http://localhost:8080/medicamentos'
    const [medicamento, setMedicamento] = useState([])

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
            setMedicamento(data.content);
        })
        .catch(error => console.error('Erro ao buscar medicamentos:', error));
    }



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

    const listaMedicamento = Array.isArray(medicamento) ? medicamento : [medicamento];
    

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

export default GestaoMedicamentos;