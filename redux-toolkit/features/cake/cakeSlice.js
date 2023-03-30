const reduxToolkit = require('@reduxjs/toolkit')
const createSlice = reduxToolkit.createSlice

const initialState = {
    numOfCake:10
}

const cakeSlice = createSlice({
    name:'cake',
    initialState,
    reducers:{
        ordered:(state)=> {
            state.numOfCake -= 1
        },
        restocked:(state,action)=> {
            state.numOfCake += action.payload
        }
    }
})

module.exports = cakeSlice.reducer
module.exports.cakeActions = cakeSlice.actions