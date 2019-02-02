import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Chart from "react-google-charts";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class AccountPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			warning: false
		};
		this.delete = this.delete.bind(this);
	}

	componentDidMount() {
		console.log(this.props, "acc");
	}

	delete(e) {
		console.log(this.state, this.props.accountInfo);
		if (this.state.warning === false) {
			alert(
				"warning: clicking this button a second time will permanently remove your account"
			);
			this.setState({ warning: true });
		}

		if (
			this.props.accountInfo.name !== null &&
			this.props.accountInfo.name !== undefined &&
			this.state.warning === true
		) {
			fetch("/users/delete", {
				method: "POST",
				mode: "cors",
				credentials: "include",
				headers: {
					name: this.props.accountInfo.name
				}
			})
				.then(res => {
					return res.json();
				})
				.then(res => {
					console.log(res);

					if (res === "deleted") {
						window.location.replace("/");
					} else if (res === "failed") {
						alert("account could not be deleted");
					}
				});
		}
	}

	
	render() {
		
		if (this.props.logged === false) {
			return (
				<div id="logInContainer">
					<h2>Create your account</h2>
					{/*<h3>Or use testaccount userId: 1234 password: 1234</h3>*/}
					<form>
						<label className="createAccountLabels" htmlFor="name">
							name *
						</label>
						<Input className="logInput" type="text" name="name" />
						<label
							className="createAccountLabels"
							htmlFor="firstName"
						>
							first name *
						</label>
						<Input
							className="logInput"
							type="text"
							name="firstName"
						/>
						<label className="createAccountLabels" htmlFor="userId">
							userID *
						</label>
						<Input
							className="logInput"
							type="number"
							name="userId"
						/>
						<label className="createAccountLabels" htmlFor="email">
							email *
						</label>
						<Input className="logInput" type="email" name="email" />
						<label
							className="createAccountLabels"
							htmlFor="password"
						>
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
		} else if (this.props.logged === true) {
			return (
				<div id="logInContainer2">
					<div id="balanceDiv">
						<h2>
							{this.props.accountInfo !== null
								? "welcome " + this.props.accountInfo.name + " " + this.props.accountInfo.firstName
								  
								: "no user info"}
						</h2>
						<Button onClick={this.delete}>delete account</Button>
					</div>
				</div>
			);
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