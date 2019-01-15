import React from 'react';

// const Clock = () => <h1> React is cool </h1>

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString('pt-Br'),
        };
        console.log('Passou no construtor');
    }

    componentWillMount() {
        console.log('Componente vai montar');
    }

    render() {
        console.log('Componente rendenizou');
        const name = this.props.name;
        const { phrase } = this.props;
        const time = this.state.time;
        return (
            <div>
                <h1>{name}</h1>
                <h2>{phrase}</h2>
                <h3>{time}</h3>
            </div>
        )
    }

    componentDidMount() {
        console.log('Componente montou');
        //melhor lugar para realizar requisições web, aqui é garantido que o componente montou com sucesso

        setInterval(() => {
            this.setState({
                time: new Date().toLocaleString('pt-Br'),
            });
        }, 1000);
    }

    shouldComponentUpdate(value) {
        console.log('Componente deve atualizar');
        return value;
    }

    componentWillUpdate() {
        console.log('Componente vai atualizar');
    }

    componentDidUpdate() {
        console.log('Componente atualizou');
    }
}

export default Clock;