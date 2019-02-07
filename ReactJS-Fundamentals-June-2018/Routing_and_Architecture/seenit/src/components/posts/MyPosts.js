import React from 'react';
import Menu from './Menu';
import Post from './Post';
import api from '../../utils/api';

class MyPosts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        const username = localStorage.getItem('username');
        api.myPosts(username)
            .then(d => d.json())
            .then(parsedData => {
                this.setState({ posts: parsedData });
            });
    }

    render() {
        return (
            <section id="viewMyPosts">
                <Menu />
                <div className="post post-content">
                    <h1>Your Posts</h1>
                </div>
                <div className="posts">
                    {this.state.posts.map((e, i) => {
                        e.index = i + 1;
                        return <Post key={i} data={e} />
                    })}
                </div>
            </section>
        );
    }
}

export default MyPosts;