import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Repos extends Component{
    render(){
        //����params��ȡ����Ĳ���
        return (
            <div>
                <p>{this.props.params.user}</p>
                <p>{this.props.params.age}</p>
            </div>
        )
    }
}

export default Repos;