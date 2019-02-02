import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Switch } from "react-router-dom";
import Route from "react-router-dom/Route";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AccountPageWithRouter from "./LoginPage";
import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { LOGGED, logIn } from "./actions/loggedIn";
import { ACCOUNT } from "./actions/accountAction";
//import Connected2  from "./LoginPage";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    fetch("/users/signin", {
      method: "GET",
      mode: "cors",
      credentials: "include"
      //body: { username: this.props.username }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res !== "no") {
          let data = true;
          let accountData = res.userObject;
          // console.log(accountData)
          this.props.dispatch({ type: LOGGED, data });
          this.props.dispatch({ type: ACCOUNT, accountData });
          console.log(this.props);
        } else {
          let data = false;
          let accountData = null;
          this.props.dispatch({ type: LOGGED, data });
          this.props.dispatch({ type: ACCOUNT, accountData });
        }
      });
  }

  componentDidUpdate() {}

  logOut(e) {
    fetch("/users/logout", {
      method: "GET",
      mode: "cors",
      credentials: "include"
      //body: { username: this.props.username }
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res === "logged out") {
          window.location.reload();
        }
      });
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleLogIn(e) {
    var logInUserId = document.getElementById("logInUserId");
    var logInPassword = document.getElementById("logInPassword");

    if (logInUserId.value !== "" && logInPassword !== "") {
      console.log("valid");
    }
  }

  handleClose(e) {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;
    const props = this.props;
    return (
      <Router>
        <Route
          render={({ location }) => (
            <div id="main">
              <AppBar id="appBar" position="fixed">
                <div id="navGrid">
                  <h1 id="navTitle">Boilerplate</h1>
                  <NavLink className="NavLink" to="/" exact strict>
                    home
                  </NavLink>
                  <div className="Navlink">
                    {this.props.logged === false ? (
                      <div>
                        <Button
                          aria-owns={anchorEl ? "simple-menu" : undefined}
                          aria-haspopup="true"
                          onClick={this.handleClick}
                          style={{ color: "white" }}
                          id="Button1"
                          className="Navlink"
                        >
                          log in
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={this.handleClose}
                        >
                          <form>
                            <MenuItem id="french">
                              <label
                                className="createAccountLabels"
                                htmlFor="username"
                              >
                                userID *
                              </label>
                              <Input
                                className="logInput"
                                type="number"
                                name="username"
                                id="logInUserId"
                                required="true"
                              />
                            </MenuItem>
                            <MenuItem id="english">
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
                                id="logInPassword"
                                required="true"
                              />
                            </MenuItem>
                            <MenuItem>
                              <Button
                                color="primary"
                                id="logInSubmit"
                                type="submit"
                                name="submit"
                                formAction="/users/signin"
                                formMethod="POST"
                                value="sign up"
                              >
                                Proceed
                              </Button>
                              <Button
                                color="primary"
                                onClick={this.handleClose}
                              >
                                close
                              </Button>
                            </MenuItem>
                          </form>
                        </Menu>
                      </div>
                    ) : (
                      <Button id="logoutButton" onClick={this.logOut}>
                        log out
                      </Button>
                    )}
                  </div>
                </div>
              </AppBar>
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={400}
                  classNames="fade"
                >
                  <Switch location={location}>
                    <Route path="/" exact strict component={Connected2} />
                    <Route
                      path="/route2"
                      exact
                      strict
                      render={() => <div>test</div>}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </div>
          )}
        />
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged: state.logReducer.logged,
    accountInfo: state.accountReducer.accountData
  };
};

export const Connected = connect(mapStateToProps)(App);
const Connected2 = connect(mapStateToProps)(AccountPageWithRouter);

export default App;