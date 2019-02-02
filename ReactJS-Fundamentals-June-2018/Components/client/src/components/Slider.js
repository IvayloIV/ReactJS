import React from 'react';
import left from '../images/left.png';
import right from '../images/right.png';

class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedImg: ''
        };

        this.promisfyState = obj => {
            return new Promise(res => {
                this.setState(obj, res);
            }).catch(e => {
                console.log(e);
            });
        };
    }

    componentWillReceiveProps(nextProps) {
        fetch('http://localhost:5000/episodePreview/' + Number(nextProps.focusedEp))
        .then(data => {
            return data.json();
        })
        .then(parseDate => {
            this.promisfyState({ selectedImg: parseDate.url }).then(() => {
                console.log('loaded new state');
            });
        });
    }

    componentDidMount() {
        fetch('http://localhost:5000/episodePreview/' + this.props.focusedEp)
        .then(data => {
            return data.json();
        })
        .then(parseDate => {
            this.promisfyState({ selectedImg: parseDate.url }).then(() => {
                console.log('mount');
            });
        });
    }

    render() {
        return (
            <div>
                <div className="warper">
                    <img 
                        alt="none"
                        src={left}
                        className='slider-elem slider-button case-left'
                        onClick={() => {
                            this.props.updateFunc(
                                Number(this.props.focusedEp) - 1 < 0 ? 0 : Number(this.props.focusedEp) - 1
                            )
                        }}
                    />
                    <img 
                        alt="sliderImg slider-elem"
                        src={this.state.selectedImg}
                        className='sliderImg slider-elem'
                    />
                    <img 
                        alt="none"
                        src={right}
                        className='slider-elem slider-button case-right'
                        onClick={() => {
                            this.props.updateFunc(
                                Number(this.props.focusedEp) + 1 > 2 ? 2 : Number(this.props.focusedEp) + 1
                            )
                        }}
                    />
                </div>
            </div>
        );
    };
}

export default Slider;