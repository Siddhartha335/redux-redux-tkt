const reduxToolkit = require('@reduxjs/toolkit')
const { cakeActions } = require('../cake/cakeSlice')

const createSlice = reduxToolkit.createSlice

const initialState = {
    numOfIceCream:20
}

const iceCreamSlice = createSlice({
    name:'iceCream',
    initialState,
    reducers:{
        ordered:(state)=> {
            state.numOfIceCream -=1
        },
        restocked:(state,action)=> {
            state.numOfIceCream += action.payload
        }
    },
    extraReducers:(builder)=> {
        builder.addCase(cakeActions.ordered,(state)=> {
            state.numOfIceCream -=1
        })
    }
})

module.exports=iceCreamSlice.reducer
module.exports.iceCreamActions = iceCreamSlice.actions