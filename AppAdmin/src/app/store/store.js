import { createStore } from 'redux';
import rootReducer from './schedules/reducers';

const store = createStore(rootReducer);

export default store;