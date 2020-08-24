import React from 'react'
import classes from './Signup.module.css'

class Signup extends React.Component{
    state = {
        username : 'shekharlol',
        firstName : 'Shivam',
        lastName : 'Shekhar',
        image : '/images/shekharlol',
        jwt : ''
    }

    render() {
        return(
            <div className={classes.Container}>
                Signup
            </div>
        )
    }
}

export default Signup