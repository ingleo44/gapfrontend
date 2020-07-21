import React ,{ Component }from 'react';
import { Router ,Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import PatientCreate from './components/patients/PatientCreate';
import PatientList from './components/patients/PatientList';
import { connect } from 'react-redux';
import PatientEdit from './components/patients/PatientEdit';
import patientShow from './components/patients/patientShow';
import Login from './components/authentication/login';
import history from './history';
import Header from './components/main/Header';



const PrivateRoute = ({ isLoggedIn, ...props }) =>
    isLoggedIn
      ? <div>
      <Route { ...props } />
      </div>
      : <Redirect to="/login" />

const LoginPage = ({ isLoggedIn, ...props }) =>
      !isLoggedIn
        ? <div>
            <Route { ...props } />
            </div>
        : <Redirect to="/" />

class App extends Component {
    render() {   
        const token = localStorage.getItem('token') || '';
        const isloggedIn = token !=='';

        return (
            
            <Router history={history}>
                 <div>
                 <Header/>
                    <Switch>    
                        <PrivateRoute isLoggedIn={ isloggedIn } path="/" exact component={PatientList} />
                        <PrivateRoute isLoggedIn={ isloggedIn } path="/patients/create" exact component={PatientCreate} />
                        <PrivateRoute isLoggedIn={ isloggedIn } path="/patients/edit/:id" exact component={PatientEdit} />
                        <PrivateRoute isLoggedIn={ isloggedIn } path="/patients/show/:id" exact component={patientShow} />
                        <LoginPage isLoggedIn={ isloggedIn } path="/login" exact component={Login} />
                    </Switch>
                </div>
            </Router>
        );
    }


}
const mapStateToProps = (state, props) => {
    return {
        authentication: state.authentication
    };
};

export default connect(mapStateToProps)(App);


