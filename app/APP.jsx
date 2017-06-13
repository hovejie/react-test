import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
class App extends Component{
    //ES7�׶βݰ�stage-0����̬����
    static contextTypes = { router: React.PropTypes.object};
    handleRedirect(event){
        event.preventDefault();
        const user = "jack";
        const age = "jack@126.com";
        //����������$
        const path = `/repos/${userName}/${email}`;
        //��ת
        this.context.router.push(path);
    }
    render(){
        return (
            <div>
                <h2>App</h2>
                <ul>
                    <li><Link to="/repos/jack/qqcom">Repo params</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
                <button onClick={this.handleRedirect.bind(this)}>��ת</button>
            </div>
        );
    }
}
export default App;