import React from 'react';
import ReactDom from 'react-dom';
import Signup from './signup';
import Login from './login';
import ButtonSec from './buttons/button_secondary'
import '../styles/style.css';
import { CSSTransition, transit } from "react-css-transition"; // ES6
export default class Home extends React.Component{

	toggleLogin = (e) =>{
		e.preventDefault();
		console.log("login toggle")
		this.toggleFormState();
	};
	
	toggleSignup = (e) =>{
		e.preventDefault();
		console.log("sign in  toggle")
		this.toggleFormState();
		this.formclass = "slide-out";
	};
	state={
		signup:false,
		login:true,
		slideClass:"slide-in"
	};

	toggleFormState = () => {
		this.setState( (prevState)=>{
			return{
				signup:!prevState.signup,
				login:!prevState.login,
				slideClass:(prevState.slideClass=="slide-in")?"slide-out":"slide-in"
	    			}
     	})
	};

	render(){
		return (
			<section className="background-container">
				<div className="unauth-container">
						<section className="backstrip">
							<div className="signup">
								<p className="header page-color-1">Don't have an <br/> account ?</p>
								<span className="page-body">Register with your email and start mining</span>
								<button  className="btn btn-small btn-page-secondary" onClick={this.toggleSignup}>Sign Up</button>
							</div>
							<div className="login">
								<p className="header page-color-1">Have an account ?</p>
								<span className="page-body">Login in your Block Bay account and start earning</span>
								<button className="btn btn-small btn-page-secondary" onClick={this.toggleLogin}>Log In</button>
							</div>
						</section>
						<aside id="form-bg" className={this.state.slideClass}>
								{this.state.signup && (<Signup FormHeader="Sign Up"/>)}
								{this.state.login && (<Login FormHeader="Log In"/>)}
						</aside>
				</div>
			</section>
			);
	}

}
