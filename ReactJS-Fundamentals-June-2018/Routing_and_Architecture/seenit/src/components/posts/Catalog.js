import React from 'react';

import Post from './Post';
import Menu from './Menu';
import api from '../../utils/api';
import observer from '../../utils/observer';
import history from '../../history';

class Catalog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };

        observer.addFunc('updateCatalog', this.updatePosts);
    }

    componentDidMount() {
        api.getPosts()
        .then(d => d.json())
            .then(parsedData => {
                this.setState({ posts: parsedData });
            });
    }

    updatePosts = () => {
        api.getPosts()
        .then(d => d.json())
            .then(parsedData => {
                this.setState({ posts: parsedData });
                history.push('/catalog');
            });
    }

    render() {
        return (
            <div>
                <Menu />
                <section id="viewCatalog">
                    <div className="posts">
                        {this.state.posts.map((a, i) => {
                            a.index = i + 1;
                            return <Post key={i} data={a} />
                        })}
                    </div>
                </section>
            </div>
        );
    }
}

export default Catalog;