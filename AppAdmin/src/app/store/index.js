import { createStore,combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ScheduleReducer } from './schedule/reducer'
import { login_data } from './login/reducer'
import accordionReducer from './metatags/reducers'

const reducers = combineReducers({ScheduleReducer,login_data})


const store = createStore(reducers,composeWithDevTools())

export default store