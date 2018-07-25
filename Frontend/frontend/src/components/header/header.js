import React from 'react';
import { Link,NavLink } from 'react-router-dom';
class Header extends React.Component{

   mineblock = (e)=>{
     e.preventDefault();
     
   }

    render(){
        
        return (
                    <aside className="app-header">
                            <header className="header-container">
                                <div className="header-search">
                                    <input type="text" placeholder="Search by Name" />
                                </div>
                                <Link to="/dashboard/transactions" >
                                    <button className="btn btn-small btn-primary marginLeft40 marginRight40">
                                        Transactions
                                    </button>
                                </Link>
                                <Link to="/dashboard/mineblock">
                                    <button className="btn btn-small btn-primary marginRight40">
                                        Mine Blocks
                                    </button>
                                </Link>
                                <Link to="/dashboard">
                                    <button className="btn btn-small btn-primary">
                                        Dashboard
                                    </button>
                                </Link>
                                <button className="btn btn-small btn-primary marginRight20 float-right">Logout</button>
                                <div className="header-profile">
                                    <img src="../images/header-profile.svg"/>
                                </div>
                                <div className="header-notification">
                                    
                                </div>
                            </header>
                    </aside>
        )        

    }

}
export default Header;