/*import React from 'react';
import {render} from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import Main from './app/app';
import APP from './app/Repos';
import State from './app/state';


render((
    <Router history={hashHistory}>
        <Route path="/" component={Main}/>
        <Route path="/repos/:user/:age" component={APP}/>
        <Route path="/about" component={State}/>
    </Router>
),document.getElementById('APP'));
*/
import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import App from './app/App';
import About from './app/state';
import Repos from './app/Repos';
//配置路由:运行webpack --progress打包文件时报错，提示无法识别一下文件
render(
    <Router history={hashHistory}>
        <Route path="/" component = {App} />
        <Route path="/repos/:userName/:email" component = {Repos} />
        <Route path="/about" component = {About} />
    </Router>,document.getElementById('app')
);