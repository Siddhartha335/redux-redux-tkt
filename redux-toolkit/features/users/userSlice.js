const reduxToolkit = require('@reduxjs/toolkit')
const axios = require('axios')
const createAsyncThunk = reduxToolkit.createAsyncThunk
const createSlice = reduxToolkit.createSlice

const initialState = {
    loading:false,
    users:[],
    error:''
}

//Generates pending,fulfilled and rejected actions
const fetchUsers = createAsyncThunk('user/fetchUsers',()=> {
    return (
        axios.get('https://jsonplaceholder.typicode.com/users').
        then((response)=> response.data.map((user)=> user.name))
    )
})

const userSlice = createSlice({
    name:'user',
    initialState,
    extraReducers:(builder)=> {
        builder.addCase(fetchUsers.pending,(state)=> {
            state.loading=true;
        })
        builder.addCase(fetchUsers.fulfilled,(state,action)=> {
            state.loading=false;
            state.users=action.payload;
        })
        builder.addCase(fetchUsers.rejected,(state,action)=> {
            state.loading=false
            state.error=action.error.message
        })
    }

})

module.exports = userSlice.reducer
module.exports.fetchUsers = fetchUsers