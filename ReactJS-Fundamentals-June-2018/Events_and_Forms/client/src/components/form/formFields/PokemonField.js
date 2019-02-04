import React from 'react'

let PokemonField = (props) => {
  return (
    <div key={props.id} style={({ display: "inline-block", "width": "200px", "height": "200px", border: "2px solid orange" })}>
      <h1>{props.pokemonName}</h1>
      <h1>{props.pokemonInfo}</h1>
      <img style={({ "width": "100px" })} alt='pokemon' src={props.pokemonImg} />

    </div>
  )
}

export default PokemonField
