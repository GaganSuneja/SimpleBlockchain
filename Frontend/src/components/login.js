import React from 'react';
import ReactDOM from 'react-dom';
import Button from './buttons/button_action';
import FormInput from './inputs/forminput';
import axois from 'axios';
import config from '../config/config';
import {Route,Redirect} from 'react-router-dom';
export default class Login extends React.Component{
	
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

		let url = config.URL + "/login";
		
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
			<div >
				{this.renderRidirect()}
				<form onSubmit={this.submitForm} className="form-login" id ="login" name ="loginform">
					<h3  className="form-header center margin-bottom40">{this.props.FormHeader}</h3>
					<FormInput InputType="text" InputName="email" placeholder="Email"/>
					<FormInput InputType="password" InputName="password" placeholder="Password"/>
					<Button ButtonName = "loginButton" ButtonValue="Login"/>
				</form>
			</div>
		);
	}	


}