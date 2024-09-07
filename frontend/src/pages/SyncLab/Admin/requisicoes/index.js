import { Component } from "react";
import { Outlet } from "react-router-dom";

class Requisicoes extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }


    render() {
        
        return (
            <Outlet {...this.props}></Outlet>
        )

    }

}

export default Requisicoes;