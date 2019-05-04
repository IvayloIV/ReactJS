import React from 'react';

function EmptyList() {
    return (
        <React.Fragment>
            <h1 className="text-center">Our Recipes</h1>
            <div id='foodNotFound'>
                <img src="https://t4.ftcdn.net/jpg/00/62/17/31/240_F_62173114_ozantkVtkPgzL0fxssAkTqKX1FHPr0UW.jpg" />
                <h3>Food not found...</h3>
            </div>
        </React.Fragment>
    )
}

export default EmptyList;
