const reduxToolkit = require('@reduxjs/toolkit')
// const reduxLogger = require('redux-logger')
const configStore = reduxToolkit.configureStore
const cakeReducer = require('../features/cake/cakeSlice')
const iceCreamReducer = require('../features/icecream/iceCreamSlice')
const userReducer = require('../features/users/userSlice')

// const logger = reduxLogger.createLogger()

const store = configStore({
    reducer:{
        // cake:cakeReducer,
        // icecream:iceCreamReducer,
        user:userReducer
    },
    // middleware:(getDefaultMiddleware)=> {
    //     return getDefaultMiddleware().concat(logger)
    // }
})

module.exports = store