import React from 'react';
import axois from 'axios';
import FormInput from './inputs/forminput';
import Header from './header/header';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import config from '../config/config';

class DashboardTransactions extends React.Component{

	state = {
		transactions:[],
		unmined_txcn:[],
		tstatus:false,
		utstatus:false
	}
	
	componentDidMount(){
		let url = config.URL + "/viewtransactions";
		
		axois.get(url)
		.then((res)=>{
			
			console.log(res);
			localStorage.chain = JSON.stringify(res.data.chain);
			this.setState({
				transactions:res.data.chain.map((object,index)=>{
								console.log(object);	
								return (
									<tr className="transaction-row" key={index}>
										
										<td className="txcn"><Link to={`/dashboard/seetransactions/${object["index"]}`} >{object["index"]}</Link></td>
										<td className="txcn">{object["proof"]}</td>
										<td className="txcn">{object["previous_hash"]}</td>
									
									</tr>
								)
							}),
				tstatus:true	
			});
		})
		.catch((error)=>{
			console.log(error);
		});
		
		// change in url
		 url = config.URL +"/unminedtransactions";
		 
		axois.get(url)
		 .then((res)=>{
		 	this.setState({
		 		unmined_txcn:res.data.chain.map((object,index)=>{
								return (
									<tr className="transaction-row" key={index}>
										
										<td className="txcn">{object["sender"]}</td>
										<td className="txcn">{object["recipient"]}</td>
										<td className="txcn">{object["amount"]}</td>
									
									</tr>
								)
							}),
		 		utstatus:true
		 	})
		 })
		 .catch((error)=>{
		 	console.log(error);
		 })
	}
	
	getTransactions(){
		if(this.state.tstatus){
			console.log("bla bla bla",this.state.transactions);
			
			let table = (<table>
							<thead>
								<tr className="transaction-row">
									<td className="txcn-head">Index</td>
									<td className="txcn-head">Proof</td>
									<td className="txcn-head">Previous Hash</td>
								</tr>
							</thead>
							<tbody>
							{this.state.transactions}
							</tbody>
							</table>)
		return table;
		}

	}
	getUnMinedTransactions(){
		
		if(this.state.utstatus){
			let table = (<table>
							<thead>
								<tr className="transaction-row">
									<td className="txcn-head" 
									>Sender</td>
									<td className="txcn-head">Receiver</td>
									<td className="txcn-head">Amount</td>
								</tr>
							</thead>
							<tbody>
							{this.state.unmined_txcn}
							</tbody>
							</table>)
			return table;
		}
	}
	render(){
			return (
				<aside className="transaction-container">
					<div className="unmined-transactions">
						<h2>Unmined</h2>
						{this.getUnMinedTransactions()}
					</div>
					<div className="mined-transactions">
						<h2>Mined</h2>
						{this.getTransactions()}
					</div>
				</aside>
			  );	
	}

}
	

class MineBlock extends React.Component{

	state={
			isMined:false,
			text:"Your Block is Mined"
	};
	
	isMined  = ()=>{
		
		if(this.state.isMined)
			return this.state.text;
	}
	
	componentDidMount(){
		
		let url = config.URL + "/mineblocks";
		
		

		 axois.get(url)
		.then((res)=>{
			
			console.log(res);
			console.log("state is ",this.state);
			this.setState({
				isMined:true
			});
			
		})	
		.catch((error)=>{

		});
	}

	render(){
		return (
				<div className="transaction-container">
					<h2>Your Block is mined </h2>
					
				</div>
			);
	}

}

class DashboardHome extends React.Component{
	
	sendMoney = (e)=>{
		e.preventDefault();
		let data = {
			sender:e.target.from_user.value,
			receiver:e.target.to_user.value,
			amount:e.target.amount.value
		}
		let url = config.URL+"/addtransaction"
		axois.post(url,data)
		.then((res)=>{
			console.log(res);
		})
		.catch((error)=>{
			console.log(error);
		})
	}
	
	render(){
		return (
			<div className="form-holder">
				<form onSubmit={this.sendMoney}>
					<input type="text" name="from_user" className="input input-secondary block" placeholder="Receiver"/>
					<input type="text" name="to_user" className="input input-secondary block" placeholder="Sender"/>
					<input type="text" name="amount" className="input input-secondary block" placeholder="Money"/>
					<button type="submit"className="btn btn-small width100  btn-secondary" >Send Money</button>
				</form>
			</div>
		)
	}
}

class SeeTransactions extends React.Component{

	
	state = {txcn_table:[],txcn_status:false} 
	
	componentDidMount(){

		let txcn_array = JSON.parse(localStorage.chain)[this.props.match.params.id-1].transactions;
		/*let txcn = txcn_array[params,]*/
		
		this.setState({
			txcn_table:	 txcn_array.map((obj,index)=>{
				return (
						<tr className="transaction-row" key={index}>
							<td className="txcn">{obj["sender"]}</td>
							<td className="txcn">{obj["recipient"]}</td>
							<td className="txcn">{obj["amount"]}</td>
						</tr>
					);
				}),
			txcn_status:true
		});

	}
	
	getTxcn = ()=>{
		return this.state.txcn_status && this.state.txcn_table;
	}
	
	render(){
		return (
				<aside  className="transaction-container">
					<table>
					<thead>
						<tr className="transaction-row">
							<td className="txcn-head">Sender</td>
							<td className="txcn-head">Receiver</td>
							<td className="txcn-head">Amount</td>
						</tr>
					</thead>
						<tbody>
						{this.getTxcn()}
						</tbody>
					</table>
				</aside>
		    );
	}
}

class Dashboard extends React.Component{

   render(){
        return (
					<section className="dashboard-container">
						<Header/>
						<Switch>
							<Route path="/dashboard/transactions" onSubmit={this.sendMoney} component={DashboardTransactions}/>
							{<Route path="/dashboard/mineblock" component={MineBlock}/>}
							<Route path="/dashboard/seetransactions/:id" component={SeeTransactions} />
							<Route path="" component={DashboardHome}/>	
						</Switch>
					</section>
        );
    }

}

export default Dashboard;