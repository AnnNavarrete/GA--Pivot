import React from "react";
import Chart from "../components/Chart";
import { Link } from "react-router-dom";

export default class AccountChart extends React.Component {
  render() {
    return this.props.accountCodes.map(account => (
      <div className="account-box">
        <Link to={`/user/account/${account.name}`}>
          {account.name}: {account.amount}
        </Link>
        <Chart chartType={account.name} />
      </div>
    ));
  }
}
