import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BankStatement from "./pages/BankStatement";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";

function Header() {
  return (
    <header>
      <img src="/images/logo.png" alt="Pivot" />
      <nav className="header-right">
        <a href="/users/settings">Settings</a>
        <a href="/sessions/logout">Log Out</a>
      </nav>
    </header>
  );
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Route path="/bankstatement/" component={BankStatement} />
        <Route path="/account/" component={Account} />
        <Route path="/*" component={Dashboard} />
      </Router>
    );
  }
}

export default App;
