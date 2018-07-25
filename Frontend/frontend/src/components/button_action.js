import React from 'react';

export default class Button extends React.Component{

	render(){
		return (
				<button type="submit"  name={this.props.ButtonName}>{this.props.ButtonValue}</button>
			)
	}


}
