const initialState = {
    username : '',
    firstname : '',
    lastname : '',
    jwt : '',
    image : ''
}

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN' : 
            return {
                ...state,
                username : action.payload.username,
                jwt : action.payload.token,
            }

        case 'USER' : 
            return{
                ...state,
                firstname : action.payload.firstName,
                lastname : action.payload.lastName,
                image : action.payload.image
            }
    }

    return state
}

export default Reducer