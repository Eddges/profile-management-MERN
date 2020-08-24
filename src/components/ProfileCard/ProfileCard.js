import React from 'react'
import classes from './ProfileCard.module.css'
import { connect } from 'react-redux'
import axios from 'axios'

class ProfileCard extends React.Component{
    state = {
        username : '',
        firstName : '',
        lastName : '',
        image : '',
        jwt : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQyYTUyZWQ5YzI1ZjFkMjRjNWI1ZjIiLCJpYXQiOjE1OTgyNjk4NTAsImV4cCI6MTU5ODI3NzA1MH0.V6KWAduVPREJUIf5NBtSKs2GCImuSlfpfwLzBdgNgEs'
    }

    componentDidMount() {
        axios.get('http://localhost:5000/upload', {
            headers : {
                'Authorization' : `Bearer ${this.state.jwt}`
            }
        })
        .then(res => {
            console.log(res.data)
            this.setState({
                ...this.state,
                username : res.data.user.username,
                firstName : res.data.user.firstName,
                lastName : res.data.user.lastName,
                jwt : this.props.jwt,
                image : res.data.user.imageLocation
            })
        })
        .then(() => {
            console.log('Component state : ', this.state)
            this.props.userDetails(this.state)
        })
    }

    fileHandler = e => {
        console.log(e.target.files[0])
        e.preventDefault()
        const formData = new FormData()
        // formData.preventDefault
        formData.append("imageFile", e.target.files[0])
        axios.post('http://localhost:5000/upload',formData, {
            headers : {
                'Authorization' : `Bearer ${this.state.jwt}`
            }
        })
        .then(res => {
            console.log('Have a response', res.data)
            this.setState({
                ...this.state,
                image : res.data.user.imageLocation
            })


        })
    }

    render() {

        // const pathname = 'public/images/shekharlol.jpeg'
        // const split = pathname.split('/').slice(1).join('/')
        // console.log('split : ', split)

        return(
            <div className={classes.Container}>

                <div className={classes.Picture}>
                    <img src={this.state.image.split('/').slice(1).join('/')} alt="DP" />
                </div>
                <input type="file" onChange={this.fileHandler} />
                <span className={classes.Username}>Welcome <span className={classes.Highlite}>{this.props.username}</span></span>
                <span className={classes.Name}>{this.props.firstname} {this.props.lastname}</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        firstname : state.firstname,
        lastname : state.lastname,
        jwt : state.jwt,
        username : state.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        userDetails : userDetails => dispatch({
            type : 'USER',
            payload : userDetails
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard)