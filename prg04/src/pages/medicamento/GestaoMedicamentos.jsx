import React from "react"
/*Importação de Component já criados */
import Botao from '../../components/button/button.jsx';
import ReportTable from '../../components/reporttable/reporttable.jsx';
import "./style.css"


function medicamentos (){

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
         <Botao texto="Atualizar" className="delete"/>
        </div>
        <div className="table">
                <table>
                <tbody>
                    
                        <tr >
                            <td><span className="atributo">Codigo </span> </td>
                            <td><span className="atributo">Nome</span></td>
                            <td><span className="atributo">Categoria </span> </td>
                            <td><span className="atributo">Quantidade </span></td>
                            <td>
                                <Botao texto="Excluir" className="delete"/>
                                <Botao texto="Editar" className="delete"/>
                                <Botao texto="Ver Detalhes" className="delete"/>
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
    </section>
    </main>
    )
}

export default medicamentos;