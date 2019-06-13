import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import BarChart from "../components/BarChart";

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      bank_balance: 0,
      income: 0,
      expenses: 0,
      accountCodes: []
    };
  }

  async componentDidMount() {
    const url = "/api/accounts";
    const res = await fetch(url);
    const body = await res.json();
    this.setState(body);
  }

  render() {
    return (
      <div>
        <h1>"Welcome to your finance tracker, {this.state.user}"</h1>
        <div className="account-codes">
          <div className="chart-container">
            <BarChart
              labels={this.state.accountCodes.map(
                x => `${x.name}: $${Math.abs(x.amount)}`
              )}
              data={this.state.accountCodes.map(x => Math.abs(x.amount))}
            />
          </div>
          <div className="main-accounts">
            <span>Bank Balance: {this.state.bank_balance} </span>
            <Link to="/bankstatement">Reconcile Bank Statement</Link>
          </div>
        </div>
      </div>
    );
  }
}
