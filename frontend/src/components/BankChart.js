import React from "react";
import PieChart from "./PieChart";
import { Link } from "react-router-dom";

export default class BankChart extends React.Component {
  render() {
    return this.props.accountCodes.map(account => (
      <div className="account-box">
        <Link to={`/user/account/${account.name}`}>
          {account.name}: {account.amount}
        </Link>
        <PieChart chartType={account.name} />
      </div>
    ));
  }
}
