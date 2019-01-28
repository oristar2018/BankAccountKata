import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chart from 'react-google-charts';
import { withRouter } from "react-router";
import { connect } from "react-redux";


class AccountPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			warning: false
		};
		this.onChange = this.onChange.bind(this);
		this.delete = this.delete.bind(this)
	}

	componentDidMount() {
		console.log(this.props, 'acc');
	}


	delete(e) {
		console.log(this.state, this.props.accountInfo)
		if (this.state.warning === false) {alert('warning: clicking this button a second time will permanently remove your account'); this.setState({warning: true});}
		
		if(this.props.accountInfo.name !== null && this.props.accountInfo.name !== undefined && this.state.warning === true) {

			fetch('/users/delete', {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
      	name: this.props.accountInfo.name
      }
    }).then(res => {return res.json()}).then(res => {console.log(res)


    	 if (res === "deleted") { window.location.replace('/')}
			else if (res === "failed") {alert('account could not be deleted')}
			









    }





    );

		}

	}

	onChange(e) {
		let currValue = parseInt(e.target.value);
		if (currValue < 0) {
			alert('value can\'t be negative');
			e.target.value = 0
		}

		if (e.target.id === "withdrawal" && e.target.value > this.props.accountInfo.balance) {

			alert('value can\'t exceed balance');
			e.target.value = 0

		}
	}
	render() {
		var operationsData = [[
      'Operations',
      'Balance'
      
    ]];

		if (this.props.accountInfo !== null) {
			this.props.accountInfo.history.reverse().map((x, index) => {

				operationsData.push([(index+1), x[3]])



			})
		};
		console.log(operationsData)
		if (this.props.logged === false) {
		return (
			<div id="logInContainer">
				<h2>Create your account</h2>
				<h3>Or use testaccount userId: 1234 password: 1234</h3>
				<form>
					<label className="createAccountLabels" htmlFor="name">
						name *
					</label>
					<Input className="logInput" type="text" name="name" />
					<label className="createAccountLabels" htmlFor="firstName">
						first name *
					</label>
					<Input className="logInput" type="text" name="firstName" />
					<label className="createAccountLabels" htmlFor="userId">
						userID *
					</label>
					<Input className="logInput" type="number" name="userId" />
					<label className="createAccountLabels" htmlFor="email">
						email *
					</label>
					<Input className="logInput" type="email" name="email" />
					<label className="createAccountLabels" htmlFor="password">
						password *
					</label>
					<Input
						className="logInput"
						type="password"
						name="password"
					/>
					<Button
						color="primary"
						variant="outlined"
						id="createAccountSubmit"
						type="submit"
						name="submit"
						formAction="/users/signup"
						formMethod="POST"
						value="sign up"
					>
						Proceed
					</Button>
					
				</form>
			</div>
		);
	}

	else if (this.props.logged === true) { 
		return(<div id="logInContainer2">
			<div id="history">
			<h2>Operations</h2>
			<Chart
  width={'580px'}
  height={'400px'}
  chartType="Line"
  loader={<div>Loading Chart</div>}
  /*data={[
    [
      'Deposit number',
      'Deposits',
      'Withdrawals',
    ],
    [1, 100, 20],
    [2, 100, 290],
    [3, 300, 280]
    
  ]}*/
  data={operationsData}
  options={{
    chart: {
      title: 'Balance variance',
      subtitle: 'in dollars (USD)',
    },
  }}
  rootProps={{ 'data-testid': '3' }}
/>
			<Table id="historyTable">
			<TableHead>
          <TableRow>
            <TableCell>operation type</TableCell>
            <TableCell align="right">amount</TableCell>
            <TableCell align="right">date</TableCell>
          </TableRow>
        </TableHead>
			<TableBody>
			
			{this.props.accountInfo !== null ? 

			this.props.accountInfo.history.reverse().map((x) => {

				return <TableRow hover={true}>
					
				<TableCell component="th" scope="row">{x[0]}</TableCell>
				<TableCell align="right">{x[1]}</TableCell>
				<TableCell align="right">{x[2]}</TableCell>
				</TableRow>

			})

			 : "no account history"}
			 </TableBody>
			</Table>
			</div>
			<div id="balanceDiv">
			<h2>{this.props.accountInfo !== null ? "current balance:$" + this.props.accountInfo.balance : "current balance is null"}</h2>

			
			<form>
			<label className="createAccountLabels" htmlFor="deposit">
						deposit
					</label>
			<Input className="logInput" onChange={this.onChange} type="number" min="1" name="deposit" />
			<Button
						color="primary"
						id="createAccountSubmit"
						type="submit"
						name="submit"
						formAction="/users/balance"
						formMethod="POST"
						value="sign up"
					>
						Proceed
					</Button>
			</form>
			<form>
			<label className="createAccountLabels" htmlFor="withdraw">
						withdraw
					</label>
			<Input id="withdrawal" className="logInput" onChange={this.onChange} type="number" min="1" name="withdraw" />
			<Button
						color="primary"
						id="createAccountSubmit2"
						type="submit"
						name="submit"
						formAction="/users/balance"
						formMethod="POST"
						value="sign up"
					>
						Proceed
					</Button>
			</form>
			<Button onClick={this.delete}>delete account</Button>
			</div>

			</div>)

	}

	}
}

/*const mapStateToProps = state => {
  return {
    logged: state.logReducer.logged,
    accountInfo: state.accountReducer.accountData
  };
};

const AccountPageWithRouter = withRouter(AccountPage);
const Connected2 = connect(mapStateToProps)(AccountPageWithRouter);*/


const AccountPageWithRouter = withRouter(AccountPage);
export default AccountPageWithRouter;