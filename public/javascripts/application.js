class LineItem extends React.Component {
  // constructor is called when the class is created
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
    const data = new FormData(event.target);
    fetch("/bankstatement", { method: "POST", body: data }).then(() => {
      this.setState({ submitted: true });
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

class App extends React.Component {
  state = {
    name: "Annie Are You Ok?!",
    bankstatement: { items: [] }
  };

  // componentDidMount is called by react when the component is mounted
  // to the virtual DOM and before render is called
  // it's a good place to do API requests
  // fetch will call the API and in some point in the future it'll will respond with the data
  componentDidMount() {
    fetch(
      "https://hxf4w1fe64.execute-api.ap-southeast-2.amazonaws.com/dev/bankstatement"
    )
      // converting the body of the response from API to a json object at
      // some point in the future as oppose to immediately
      .then(function(response) {
        return response.json();
      })
      // json object which can now be used in code, returning json object
      // arrow functions always keep the context of `this` and the context of `this` is my class App
      .then(bankstatement => {
        this.setState({ bankstatement });
      });
  }
  // the below is what get showen in the web page!
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>date</th>
            <th>description</th>
            <th>amount</th>
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
              chartOfAccounts={this.props.chartOfAccounts}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

// how the app knows where in the page it needs to render/show
ReactDOM.render(
  <App chartOfAccounts={window.chartOfAccounts} />,
  document.getElementById("app")
);
