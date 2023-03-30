// const redux = require("redux");
// const reduxThunk = require("redux-thunk");
// const axios = require("axios");
// const thunkMiddleware = reduxThunk.default;
// const applyMiddleware = redux.applyMiddleware;
// const createStore = redux.legacy_createStore;
// const initialState = {
//   loading: false,
//   users: [],
//   error: "",
// };

// const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
// const FETCH_USERS_SUCCEDED = "FETCH_USERS_SUCCEDED";
// const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

// function fetchUsersRequest() {
//   return {
//     type: FETCH_USERS_REQUESTED,
//   };
// }

// function fetchUsersSuccess(users) {
//   return {
//     type: FETCH_USERS_SUCCEDED,
//     payload: users,
//   };
// }

// function fetchUsersFailure(error) {
//   return {
//     type: FETCH_USERS_FAILED,
//     payload: error,
//   };
// }

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_USERS_REQUESTED:
//       return {
//         ...state,
//         loading: true,
//       };
//     case FETCH_USERS_SUCCEDED:
//       return {
//         ...state,
//         loading: false,
//         users: action.payload,
//       };
//     case FETCH_USERS_FAILED:
//       return {
//         ...state,
//         loading:false,
//         error: action.payload,
//       };
//   }
// };

// const fetchUsers = () => {
//   return function (dispatch) {
//     dispatch(fetchUsersRequest())
//     axios
//       .get("https://jsonplaceholder.typicode.com/users")
//       .then((response) => {
//         const users = response.data.map((user) => {
//            return user.name
//         })
//         dispatch(fetchUsersSuccess(users))
//       })
//       .catch((err) => {
//         dispatch(fetchUsersFailure(err.message))
//       });
//   };
// };

// const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// store.subscribe(()=> {
//     console.log(store.getState())
// })

// store.dispatch(fetchUsers())

const redux = require('redux')
const reduxThunk = require('redux-thunk')
const axios = require('axios')
const thunkMiddleware = reduxThunk.default
const createStore = redux.legacy_createStore
const applyMiddleware = redux.applyMiddleware

const initialState = {
    loading:false,
    users:[],
    error:''
}

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEDED = "FETCH_USERS_SUCCEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

function fetchUsersRequest() {
    return {
        type:FETCH_USERS_REQUESTED
    }
}

function fetchUsersSuccess(users) {
    return {
        type:FETCH_USERS_SUCCEDED,
        payload:users
    }
}

function fetchUsersFailure(err) {
    return {
        type:FETCH_USERS_FAILED,
        payload:err
    }
}


const reducer = (state=initialState,action)=> {
    switch(action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading:true
            }
        case FETCH_USERS_SUCCEDED:
            return {
                ...state,
                users:action.payload
            }
        case FETCH_USERS_FAILED:
            return {
                ...state,
                error:action.payload
            }
    }
}

const fetchUsers = ()=> {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').
        then((response)=> {
            const users = response.data.map((user)=> user.name)
            dispatch(fetchUsersSuccess(users))
        }).
        catch((err)=> {
            dispatch(fetchUsersFailure(err.message))
        })
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddleware))

store.subscribe(()=> {
    console.log(store.getState())
})

store.dispatch(fetchUsers())