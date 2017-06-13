
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Starts from './state.jsx';
import $ from 'jquery';
import Mock from 'mockjs';
//import {Link} from 'react-router';
//练习子组件
class Son extends Component{
	show(){
		console.log(this.props.title);
		console.log(this.props.contents);
		console.log(this.props.name);
	}
	render(){
		return (
			<div>
				<p>this is buttong说的</p>
				<div>
					{
						React.Children.map(this.props.children,function(child){
							return (<li>{child}</li>)
						})
					}
					<input type="button" onClick={this.show.bind(this)} value='click'/>
				</div>
			</div>
		)
	}
}
let data = {title:'this is a title',contents:'this is a contens'};

//练习state的组件
class State extends Component{
	constructor(props){
		super(props);
		this.state={
			enable:false,
			content:'默认的'
		}
	}
	handleClick(){
		var contents = this.refs.values.value;
		this.setState({enable:!this.state.enable,content:contents});
	}
	componentWillUpdate(){
		alert('渲染之前');
	}
	componentDidUpdate(){
		alert('渲染之后');
	}
	render(){
		return(
			<div>
				<input type="text" disabled={this.state.enable} ref='values' value='默认的'/>
				<input type="button" onClick={this.handleClick.bind(this)} value='change'/>
				<p>{this.state.content}</p>
			</div>
		)
	}
}

//筛选功能组件练习
let nameDate = ['jie','kiss','zhangsan','lisi','wangwu','mazi'];
class Sreach extends Component{
	constructor(props){
		super(props);
		this.state={
			listDate:this.props.sourDate//把props的值传入state
		}
	}
	//键盘按下事件
	change(){
		var lis = [];//保存数据
		var text = this.refs.text.value;//获取input的value值
		var sourDate = this.props.sourDate;//原始数据
		for(let i=0;i<sourDate.length;i++){//查找筛选的值
			if(sourDate[i].indexOf(text)!=-1){
				lis.push(sourDate[i]);//添加到新数据中
			}
		}
		this.setState({listDate:lis});//更改state状态
	}
	render(){
		return (
			<div className='sreach'>
				<p>搜素功能</p>
				<input type="text" ref='text'onKeyUp = {this.change.bind(this)}/>
				<Ul list = {this.state.listDate} />
			</div>
		)
	}
}
//ul显示名字列表值的组件
class Ul extends Component{
	render(){
		var arrList = [];
		for(let i=0;i<this.props.list.length;i++){
			arrList.push(<li key={i}>{this.props.list[i]}</li>);//创li列表，保存到数组中
		}
		return (
			/*打印出数组的值*/
			<ul>
				{arrList}
			</ul>
		)
	}
}

//组件之生命周期
class Life extends Component{
	componentWillMount(){
		console.log('渲染前：componentWilMount');
		this.times = setInterval(function(){
			//alert('插入前。。。不断打印中');
		},500)
	}
	render(){
		console.log('渲染中');
		//alert('渲染中');
		return (
			<p id='app'>出生咯</p>
		);
	}
	componentDidMount(){
		console.log('渲染后：componentDidMount');
		//alert('渲染后');
	}
	componentWillUnmount(){
		console.log('销毁了：componentWillUnmount');
		clearInterval(this.times);
	}

}
//关于axja获取数据（从mockjs中模拟后台数据）
Mock.mock('http://ajax.data.com',{
	'name':'jie',
	'age':'24'
});
class Ajax extends Component{
	constructor(props){
		super(props);
		this.state={
			name:'',
			age:''
		}
	}
	Updatas(){
		var th = this;
		$.getJSON(this.props.url,function(res){
			th.setState({
				name:res['name'],
				age:res['age']
			});
		});
	}
	render(){
		return (
			<div>
				<button onClick={this.Updatas.bind(this)}>点击更新</button>
				<p>name:{this.state.name}</p>
				<p>age:{this.state.age}</p>
			</div>
		)
	}
}


//react的高级组件（js版修饰类：其实就是把一个类作为参数丢到另一个类（修饰类）中，在这个类中将上一个类增加一点东西，然后再return返回去，等于把上一个类的功能修饰增强了。）
class Mytest extends Component{ //声明一个待修饰的类
	constructor(props){
		super(props);
		this.state={
			State:true
		}
	}
	onchengs(){
		this.setState({State:!this.state.State});
	}
	render(){
		var cDate=this.state.State?'以点击':'未点击';
		return (
			<div>
				<button onClick={this.onchengs.bind(this)}>{cDate}</button>
			</div>
		)
	}
}
//创建一个箭头函数，函数内部在声明一个类
let play = kiss=>{
	//注意这个内部类中不能含有render方法，不然会覆盖原类中的render
	class Myplay extends kiss{//extends后面是定义的函数名
		componentWillMount(){
			alert('修饰功能插入节点之前');
		}
	}
	//修饰好之后返回这个类；
	return Myplay;
}
//然后把原有类以参数形式传入这个函数；
var EndTest = play(Mytest);
class Hello extends Component {
	static contextTypes = {router:React.PropTypes.object};
	handleRedirect(event){
		event.preventDefault();
		const user = 'jie';
		const age = '20';
		const path = '/repos/${user}/${age}';
		//跳转
		this.context.router.push(path);
	}
	render (){
		return (
			<div>
				<Son name={this.props.name} {...data} children={this.props.children}/>
				<State/>
				<Sreach sourDate={this.props.lists}/>
				<Life />
				<Ajax url={this.props.url}/>
				<EndTest/>
			</div>

		)
	}
}


ReactDOM.render(
	<Hello name='jie2' lists = {nameDate} {...data} url = 'http://ajax.data.com'>
		<span>test1</span>
		<span>test2</span>
	</Hello>,
	document.body
);
setTimeout(function(){
	//ReactDOM.unmountComponentAtNode(document.body);
	//console.log(document.getElementById('app'));
},2000);

//export default Hello;
