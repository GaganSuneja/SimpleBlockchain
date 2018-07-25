import React from 'react';
import ReactDOM from 'react-dom';
/*import Button from 'material-ui/Button';*/
import Button from './buttons/button_action';
import FormInput from './inputs/forminput';
import config from '../config/config';
import axois from 'axios';
import {Redirect} from 'react-router-dom';
export default class Signup extends React.Component{

	state = {
		formsubmit:{},
		redirect:false
	};
	
	renderRidirect = () => {
		if(this.state.redirect){
			return <Redirect to="/dashboard" />
		}
	}
	
	submitForm = (e) => {
		e.preventDefault();
		let data = {
			email:e.target.email.value,
			password:e.target.password.value
		}

		let url = config.URL + "/signup";
		
		axois.post(url,data)
		.then((res)=>{
			localStorage.token = res.data.token;
			this.setState({
				redirect:true
			})
		})
		.catch((error)=>{
			console.log(error);
		})

	}

	render(){
		return (
				<div>
					{this.renderRidirect()}
					<form onSubmit={this.submitForm} className="form-signup" id ="signup" name ="signupForm">
						<h3 className="form-header center">{this.props.FormHeader}</h3>
						<FormInput InputType="text" InputName="full_InputName" placeholder="Full Name"/>
						<FormInput InputType="text" InputName="contact" placeholder="Contact No"/>
						<FormInput InputType="text" InputName="email" placeholder="Email"/>
						<FormInput InputType="password" InputName="password" placeholder="Password"/>
						<FormInput InputType="password" InputName="confirm_password" placeholder="Confirm Password"/>
						<Button ButtonName = "signupButton" ButtonValue="Sign Up"/>
					</form>
				</div>
		    );
	}	


}