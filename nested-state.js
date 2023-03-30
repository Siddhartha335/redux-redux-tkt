const redux = require('redux')
const immer = require('immer')
const produce = immer.produce
const createStore = redux.legacy_createStore

const initialState = {
    name:"Sid",
    address:{
        street:"Machhindrabahal",
        city:"Patan",
        state:"Bagmati"
    }
}

const STREET_UPDATED = 'STREET_UPDATED'
function updateStreet(street) {
    return {
        type:STREET_UPDATED,
        payload:street
    }
}

const reducer = (state=initialState, action)=> {
    switch(action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street:action.payload
            //     }
            // }
            return produce(state, (draft)=> {
                draft.address.street=action.payload
            })
        default:
            return state
    }
}

const store = createStore(reducer)
console.log("Initial State:", store.getState())

store.subscribe(()=> {
    console.log("Updated state:", store.getState())
})

store.dispatch(updateStreet("San Francisco"))