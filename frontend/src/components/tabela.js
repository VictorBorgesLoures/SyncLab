import { Component } from 'react';
import { Link } from 'react-router-dom';

class TableComponent extends Component {
    constructor(props) {
        super(props);
    }

    renderTableHeader() {
        if (this.props.thead && this.props.thead.length > 0) {
            return this.props.thead.map((item, index) => {
                return (
                    <th key={"thead-" + index}>
                        {item}
                    </th>
                )
            });

        }
    }

    renderTableBody() {
        if (this.props.tbody && this.props.tbody.length > 0) {
            return this.props.tbody.map((item, index) => {
                return (
                    <tr key={"tbody-tr-" + index}>
                        {item.map((td, index) => {
                            return td
                        })}
                    </tr>
                );
            })
        }
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        {this.renderTableHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.renderTableBody()}
                </tbody>
            </table>
        )
    }
}

export default TableComponent;