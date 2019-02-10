import React from 'react';
import WithWarning from './WithWarning';

const TitleBase = (props) => {
    return (
        <article>
            <header><span className="title">Article Title</span></header>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet magni labore voluptatibus. Vel sunt voluptate fugiat et ducimus voluptates doloremque, eum illo exercitationem dignissimos sequi cum, id molestiae debitis atque.</p>
        </article>
    )
}

const Title = WithWarning(TitleBase);

export default Title;