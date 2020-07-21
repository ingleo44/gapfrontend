import React from 'react';
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { logout } from '../../actions';

class Header extends React.Component {
    state = {}


    logout = (e, { name }) =>{
        this.setState({ activeItem: name });
        this.props.logout();

    }


    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    render() {
        const token = localStorage.getItem('token') || '';
        const isloggedIn = token !== '';
        const { activeItem } = this.state
        return (
            <div>
                <Menu>
                    <Menu.Item header>Appointments app</Menu.Item>
                    {
                        isloggedIn ?
                            <Menu.Menu position='right' style={{ paddingRight: "10px" }}  >
                                <Menu.Item
                                    name='logout'
                                    active={activeItem === 'logout'}
                                    onClick={this.logout}
                                />
                            </Menu.Menu>
                            :
                            ''
                    }

                </Menu>
            </div>

        );
    }

}



const mapStateToProps = (state) => {
    return {
        authentication: state.authentication
    }
};

export default connect(mapStateToProps, { logout })(Header);