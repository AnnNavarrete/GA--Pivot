import React from "react";
import BarChart from "./BarChart";
import { Link } from "react-router-dom";

export default class AccountChart extends React.Component {
  render() {
    return this.props.accountCodes.map(account => (
      <div className="account-box">
        <Link to={`/user/account/${account.name}`}>
          {account.name}: {account.amount}
        </Link>
        <BarChart data={account} />
      </div>
    ));
  }
}
