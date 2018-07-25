	import React from 'react';

export default class FormInput extends React.Component{

	render(){
		return (
				<input className="input input-secondary block" type={this.props.InputType} placeholder={this.props.placeholder} name={this.props.InputName}/>
			);
	}

}