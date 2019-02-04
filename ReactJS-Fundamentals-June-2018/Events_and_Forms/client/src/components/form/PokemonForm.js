import React from 'react';
import Input from './formFields/Input';

class PokemonFrom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            image: '',
            info: '',
            message: ''
        }
    }

    validateField = (field) => {
        if (field === '') {
            return false;
        }

        return true;
    }

    submitForm = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/pokedex/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pokemonName: this.state.name,
                pokemonImg: this.state.image,
                pokemonInfo: this.state.info
            })
        })
        .then(res => {
            this.setState({
                message: 'Created successful!',
                name: '',
                image: '',
                info: ''
            });

            this.props.getImages().then((images) => {
                this.props.upFunc(images.pokemonColection);
            });
        })
    }

    render() {
        let validObj = {
            name: this.validateField(this.state.name),
            image: this.validateField(this.state.image),
            info: this.validateField(this.state.info)
        }

        return (
            <form onSubmit={this.submitForm}>
                <fieldset className='App'>
                    <p>{this.state.message}</p>
                    <div style={{ display: 'inline-grid' }}>
                        <Input
                            type='text'
                            data='name'
                            name='Name'
                            value={this.state.name}
                            func={(e) => {
                                this.setState({ name: e.target.value, message: '' });
                            }}
                            valid={validObj.name}
                        />

                        <Input
                            type='text'
                            data='image'
                            name='Image'
                            value={this.state.image}
                            func={(e) => {
                                this.setState({ image: e.target.value, message: '' });
                            }}
                            valid={validObj.image}
                        />

                        <Input
                            type='text'
                            data='info'
                            name='Info'
                            value={this.state.info}
                            func={(e) => {
                                this.setState({ info: e.target.value, message: '' });
                            }}
                            valid={validObj.info}
                        />

                        <input
                            style={({ "display": (validObj.name && validObj.image && validObj.info) === true ? '' : 'none' })}
                            type='submit'
                            value='Create Pokemon'
                        />
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default PokemonFrom;
