import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Repos extends Component{
    render(){
        //利用params获取传入的参数
        return (
            <div>
                <p>{this.props.params.user}</p>
                <p>{this.props.params.age}</p>
            </div>
        )
    }
}

export default Repos;