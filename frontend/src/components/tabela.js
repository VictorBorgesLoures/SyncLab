import {Component} from 'react';
import { Link } from 'react-router-dom';

class TableComponent extends Component {
    constructor(props) {
        super(props);
        let data = {
            id: 5,
            nome: "Oktoplus",
            tutor: "Anderson",
            dtCriacao: "23/04/1998",
            gerenciar: (id) => this.nagivates(id),
            monitorar: (id) => this.nagivates(id)
        }
        this.state={
            header: [
                "Nome", "Tutor", "Data Criação", "Gerenciar", "Monitorar"
            ],
            body: [
                [
                data.nome, data.tutor, data.dtCriacao, data.gerenciar(data.id), data.monitorar(data.id)
                ]
            ]
        }
    }

    nagivates(id) {
        console.log(id);
        return <Link to={this.props.locate.pathname+"/" + id}>{id}</Link>
    }
  
      

    renderTableHeader(tableHead) {
        return tableHead.map((item, index) => {
          return (
            <th key={"thead-"+index}>
              {item}
            </th>
          )
        });
    }

    renderTableBody(tableBody) {
        return tableBody.map((item,index) => {
            return (
                <tr key={"tbody-tr-" + index}>
                    {item.map((dado,index) => {
                        return (
                            <td key={"tbody-tr-td-" + index}>
                                {dado}
                            </td>
                        );
                    })}
                </tr>
            );
        })
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                    {this.renderTableHeader(this.state.header)}
                    </tr>
                </thead>
                <tbody>
                    {this.renderTableBody(this.state.body)}
                </tbody>
            </table>
        )
    }
}

export default TableComponent;