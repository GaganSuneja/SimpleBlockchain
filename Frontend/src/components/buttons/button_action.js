import React from 'react';

export default class Button extends React.Component{

	render(){
		return (
				<button type="submit" className="btn btn-large btn-secondary" name={this.props.ButtonName}>{this.props.ButtonValue}</button>
			)
	}


}
