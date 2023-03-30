// const redux = require('redux')
// const createStore = redux.legacy_createStore

// const CAKE_ORDERED = "CAKE_ORDERED"

// function orderCake() {
//     return {
//         type:CAKE_ORDERED,
//         quantity:1
//     }
// }

// const initialState = {
//     numOfCakes:10
// }

// const reducer = (state=initialState,action)=> {
//     switch(action.type) {
//         case CAKE_ORDERED:
//             return {
//                 numOfCakes:state.numOfCakes-1
//             }
//         default:
//             return state
//     }
// }

// const store = createStore(reducer)
// console.log("Initial State", store.getState());

// const unsubscribe = store.subscribe(()=> {
//     console.log("Updated state",store.getState())
// })

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())

// unsubscribe()

const redux = require('redux')
const reduxLogger = require('redux-logger')
const createStore = redux.legacy_createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED '

function orderCake() {
    return {
        type:CAKE_ORDERED,
        payload:1
    }
}

function restockCake(qty=1) {
    return {
        type:CAKE_RESTOCKED,
        payload:qty
    }
}

function orderIcecream() {
    return {
        type:ICECREAM_ORDERED,
        payload:1

    }
}

function restockIcecream(qty=1) {
    return {
        type:ICECREAM_RESTOCKED,
        payload:qty
    }
}

// const initialState = {
//     numOfCakes:10,
//     numOfIcecream:20
// }

// Splitting the initial states for cake and icecream

const initialStateCake = {
    numOfCakes:10
}

const initialStateIceCream = {
    numOfIcecream:20
}

const cakeReducer = (state=initialStateCake,action)=> {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes:state.numOfCakes-1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes:state.numOfCakes+action.payload
            }
        default:
            return state;
    }
}

const iceCreamReducer = (state=initialStateIceCream,action)=> {
    switch(action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIcecream:state.numOfIcecream-1
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIcecream:state.numOfIcecream+action.payload
            }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})

//Creating a Store
const store = createStore(rootReducer,applyMiddleware(logger));
console.log("Initial State", store.getState())

const unsubscribe = store.subscribe(()=> {
    // console.log("Updated state!", store.getState())
})

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

const action = bindActionCreators({orderCake,restockCake,orderIcecream,restockIcecream},store.dispatch)
action.orderCake()
action.orderCake()
action.orderCake()
action.restockCake(3)
action.orderIcecream()
action.orderIcecream()
action.orderIcecream()
action.restockIcecream(3)

unsubscribe()