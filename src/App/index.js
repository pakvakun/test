import React from 'react';
import logo from '../media/logo.svg';
import './App.scss';

//components
import AuthForm from './Components/Auth/AuthForm'
import ProductsList from './Components/ProductsList/ProductsList'

//controller
import { getItemLS, setItemLS, removeItemLS } from './Controller/localStorEvents';
import auth from './Controller/auth';

class App extends React.Component {
  constructor(props){
    super(props);
    this.initState = {}
    this.state = this.initState
  }
  authCredentials = (login, pass) => {
    this.setState({loading: true})
    auth(login, pass)
      .catch(err => alert(err))
      .finally( () => {
        setItemLS('authUser', login)
        this.setState({
          user: login,
          loading: false
        })
      })
  }
  getUser = (login) => {
    const user = getItemLS('authUser')
    if (!!user) {
      this.setState({user})
    }else{
      // this.setState({user: login})
    }
  }
  exit = (e) => {
    e.preventDefault()
    removeItemLS('authUser')
    this.setState({user: false})
  }
  componentDidMount(){
    this.getUser()
  }
  render() {
    
    return (
      <div className="App">
        <header className="App__header">
          <img src={logo} className={this.state.loading ? "App__header_logo rotate" : "App__header_logo"} alt="logo" />
          <div className='App__header_title'>
            React product App
          </div>
          <div className='App__header_user'>
            {
              this.state.user &&
                <>
                  <div>{this.state.user}</div>
                  <input onClick={this.exit} type='button' value='exit'/>
                </>
              }
          </div>
        </header>
        {
          this.state.user 
            ? <ProductsList />
            : <AuthForm authCredentials={this.authCredentials} />
        }
        
      </div>
    );
  }
}

export default App;
