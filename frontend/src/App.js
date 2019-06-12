import React from "react";
import "./App.css";
import Chart from "./Chart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      bank_balance: 0,
      income: 0,
      expenses: 0
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
        <div class="account-codes">
          <div class="chart-container">
            <div class="account-box">
              <a href="/user/account/Income">
                <h3>Income: {this.state.income}</h3>
              </a>
              <Chart chartType="Income" />
            </div>
            <div class="account-box">
              <a href="/user/account/Expenses">
                <h3>Expenses: {this.state.expenses}</h3>
              </a>
              <Chart chartType="Expenses" />
            </div>
          </div>
          <div class="main-accounts">
            <span>Bank Balance: {this.state.bank_balance} </span>
            <span href="/bankstatement">Reconcile Bank Statement</span>
            <span>Create/View Budget</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
