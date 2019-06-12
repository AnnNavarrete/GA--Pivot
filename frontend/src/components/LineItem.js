import React from "react";

export default class LineItem extends React.Component {
  // constructor is a method thats get auto called when the class is created
  // props = class object
  constructor(props) {
    super(props);
    this.state = { value: "1", submitted: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // to update the database for every submit from the form
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      date: event.target.date.value,
      description: event.target.description.value,
      amount: event.target.amount.value,
      chart_of_account_id: event.target.chart_of_account_id.value
    };
    fetch("/bankstatement", {
      method: "POST",
      body: JSON.stringify(data)
    }).then(() => {
      this.setState({ submitted: true });
      this.props.onChange();
    });
  }

  render() {
    return this.state.submitted ? null : (
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.description}</td>
        <td>{this.props.amount}</td>
        <td>
          <form onSubmit={this.handleSubmit}>
            <input type="hidden" name="date" value={this.props.date} />
            <input
              type="hidden"
              name="description"
              value={this.props.description}
            />
            <input type="hidden" name="amount" value={this.props.amount} />
            <select
              name="chart_of_account_id"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {this.props.chartOfAccounts.map(chart => (
                <option value={chart.id}>{chart.name}</option>
              ))}
            </select>
            <button type="submit">submit</button>
          </form>
        </td>
      </tr>
    );
  }
}
