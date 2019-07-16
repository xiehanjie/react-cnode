import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { 
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { Provider } from 'react-redux'

import Home from './pages/Home/index'
import Detail from './pages/Detail'

import store from './store/index'

import './reset.less'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Route exact path='/' component={Home}/>
                    <Route path='/detail/:id' component={Detail} />
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);