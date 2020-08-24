import React from 'react'
import classes from './Login.module.css'
import axios from 'axios'
import {connect} from 'react-redux'
// import { response } from 'express'

class Login extends React.Component{
    state = {
        username : '',
        password : '',
        token : ''
    }

    componentDidMount() {

    }

    setUsername = (e) => {
        this.setState({
            ...this.state,
            username : e.target.value
        })
    }

    setPassword = (e) => {
        this.setState({
            ...this.state,
            password : e.target.value
        })
    }

    handleSubmit = () => {
        axios.post('http://localhost:5000/user/login', {
            username : this.state.username,
            password : this.state.password
        })
        .then(res => {
            console.log(res.data)
            if(res.data.success) {
                console.log('Success')
                this.setState({
                    ...this.state,
                    token : res.data.token
                })
                this.props.login(this.state)
            }
        })
        .then(res => {
            if(this.props.userToken) {
                this.props.history.push('/')
            }
        })
        .catch(err => {
            console.log('User not present')
        })
    }

    render() {
        return(
            <div className={classes.Container}>
                <span className={classes.Title}>LogIn</span>
                <input type="text" placeholder="Username" onChange={(e) => this.setUsername(e)} />
                <input type="password" placeholder="Password" onChange = {(e) => this.setPassword(e)} />
                <button className={classes.Submit} onClick={this.handleSubmit} >Login</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        userToken : state.jwt
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login : (state) => dispatch({
            type : 'LOGIN',
            payload : state
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)