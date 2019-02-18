import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../common/Input';
import { createFurnitureAction } from '../../actions/furnitureAction';
import validationCreate from '../../validations/createFurniture';
import toastr from 'toastr';

export class CreatePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            make: '',
            model: '',
            year: '',
            description: '',
            price: '',
            image: '',
            material: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toastr.warning('First you must login.');
            this.props.history.push('/login');
        }
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const { make, model, year, description, price, image, material } = this.state;
        this.props.create({ make, model, year, description, price, image, material })
            .then((json) => {
                if (json.success) {
                    this.props.history.push('/');
                }
            });
    }

    render() {
        const { make, model, year, description, price, image, material } = this.state;
        const validations = validationCreate(make, model, year, description, price, image);

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Create New Furniture</h1>
                        <p>Please fill all fields.</p>
                    </div>
                </div>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="row space-top">
                        <div className="col-md-4">
                            <div className="form-group">
                                <Input
                                    name="make"
                                    value={make}
                                    onChange={this.onChangeHandler}
                                    label="Make"
                                    validation={validations['make']}
                                />
                            </div>
                            <div className="form-group has-success">
                                <Input
                                    name="model"
                                    value={model}
                                    onChange={this.onChangeHandler}
                                    label="Model"
                                    validation={validations['model']}
                                />
                            </div>
                            <div className="form-group has-danger">
                                <Input
                                    name="year"
                                    type="number"
                                    value={year}
                                    onChange={this.onChangeHandler}
                                    label="Year"
                                    validation={validations['year']}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    name="description"
                                    value={description}
                                    onChange={this.onChangeHandler}
                                    label="Description"
                                    validation={validations['description']}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <Input
                                    name="price"
                                    type="number"
                                    value={price}
                                    onChange={this.onChangeHandler}
                                    label="Price"
                                    validation={validations['price']}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    name="image"
                                    value={image}
                                    onChange={this.onChangeHandler}
                                    label="Image"
                                    validation={validations['image']}
                                />
                            </div>
                            <div className="form-group">
                                <Input
                                    name="material"
                                    value={material}
                                    onChange={this.onChangeHandler}
                                    label="Material"
                                    validation={''}
                                />
                            </div>
                            <input type="submit" className="btn btn-primary" value="Create" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        create: (data) => dispatch(createFurnitureAction(data)),
    };
}

export default withRouter(connect((state) => state, mapDispatchToProps)(CreatePage));