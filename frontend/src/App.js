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
        <h1>"Welcome to your Dashboard, {this.state.user}"</h1>
        <h3>Bank Balance: {this.state.bank_balance} </h3>
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
          <h3>
            <a href="/bankstatement">Reconcile Bank Statement</a>
          </h3>
        </div>
      </div>
    );
  }
}

export default App;
