import React from "react";
import LineItem from "../components/LineItem";
import BankChart from "../components/BankChart";
import PieChart from "../components/PieChart";

async function getBankStatement() {
  const response = await fetch(
    "https://hxf4w1fe64.execute-api.ap-southeast-2.amazonaws.com/dev/bankstatement"
  );
  return await response.json();
}

async function getAccounts() {
  const response = await fetch("/api/accounts");
  return await response.json();
}

export default class BankStatement extends React.Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
  }
  state = {
    // name: "Annie Are You Ok?!",
    bankstatement: { items: [] },
    accountCodes: [],
    chartOfAccounts: []
  };

  async fetchData() {
    const bankstatement = await getBankStatement();
    const accounts = await getAccounts();
    this.setState({
      bankstatement,
      accountCodes: accounts.accountCodes,
      chartOfAccounts: accounts.chartOfAccounts
    });
  }

  // the process of creating an element and embedding it in a DOM
  // componentDidMount is called by react when the component is mounted
  // to the virtual DOM and before render is called
  // it's a good place to do API requests
  // fetch will call the API and in some point in the future it'll will respond with the data
  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Account Type</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.bankstatement.items.map(item => (
              // Line item is the class and inside is the data that becomes the class props
              <LineItem
                date={item.date}
                description={item.description}
                amount={item.amount}
                chartOfAccounts={this.state.chartOfAccounts}
                onChange={() => this.fetchData()}
              />
            ))}
          </tbody>
        </table>
        <div className="bank-chart">
          <BankChart accountCodes={this.state.accountCodes} />
        </div>
      </div>
    );
  }
}
