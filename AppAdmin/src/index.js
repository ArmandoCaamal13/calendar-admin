import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/routers';
import 'style/global.scss'
import { Provider } from 'react-redux';
import { createStore} from 'redux'
import reducer from './app/store/schedules/reducers';

const store = createStore(reducer)

// const app = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

