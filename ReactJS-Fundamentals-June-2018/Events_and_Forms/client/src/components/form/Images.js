import React from 'react';

import PokemonField from './formFields/PokemonField';

class Images extends React.Component {
    render() {
        return (
            <div>
                {this.props.images.map((pokemon, i) => {
                    pokemon.id = i;
                    return PokemonField(pokemon)
                })}
            </div>
        );
    }
}

export default Images;
