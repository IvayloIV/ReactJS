import React from 'react';
import Furniture from './Furniture';;

function FurnitureList(props) {
    return (
        <div className="row space-top">
            {props.furniture.map((f, i) => {
                return <Furniture 
                    image={f.image}
                    description={f.description}
                    model={f.model}
                    make={f.make}
                    deleteHandler={props.deleteHandler}
                    id={f.id}
                    key={f.id}
                />
            })}
        </div>
    )
}

export default FurnitureList;
