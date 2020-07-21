import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';
import { Message } from 'semantic-ui-react'


class Login extends React.Component {
    constructor(props) {
        // Required step: always call the parent class' constructor
        super(props);

        // Set the state directly. Use props if necessary.
        this.state = {
            username: "",
            password: ""

            // Note: think carefully before initializing
            // state based on props!
        }
    }



    handleInputChange = (event) => {
        const target = event.target;
        const value = target.name === 'isGoing' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }



    login = () => {

        var credentials = {
            userName: this.state.username,
            password: this.state.password
        }
        this.props.login(credentials);
        console.log("login attemp");
    }


    render() {
        const errors = this.props.errors;
        return (
            <div>

                <div className="ui container">
                    <form className="ui form">
                        <div className="field">
                            <label>username</label>
                            <input type="text" id="username" name="username" value={this.state.username} autoComplete="off" onChange={this.handleInputChange} required />
                        </div>
                        <div className="field">
                            <label>password</label>
                            <input type="password" id="password" name="password" onChange={this.handleInputChange}
                                value={this.state.password} required />
                        </div>
                        {
                            errors.data ?
                                <Message negative>
                                    <Message.Header>Authentication Error</Message.Header>
                                    <p>{errors.data.message}</p>
                                </Message>
                                : ''
                        }
                        <button className="ui button primary" type="button" onClick={this.login}>Login</button>
                    </form>
                </div>
            </div>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        authentication: Object.values(state.authentication), errors: state.errors
    }
};

export default connect(mapStateToProps, { login })(Login);