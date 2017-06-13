var path =require('path');
module.exports ={
	entry:[
		path.resolve(__dirname,'app/main.jsx')
	],
	output:{
		path:path.resolve(__dirname,'build'),
		filename: 'bundle.js'
	},
	module:{
		loaders:[
			{
				test:/\.js[x]$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				query:{
					presets:['es2015','stage-1','react']
				}
			}//,
			//{test:/\.scss$/,loader:'style!css!sass'},
		]
	}
}