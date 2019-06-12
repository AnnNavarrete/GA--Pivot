import React from "react";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-colorschemes";

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        datasets: [
          {
            data: [10, 20, 30, 40, 50]
          }
        ],
        labels: ["House", "Food", "Utilities", "Entertainment", "Transport"]
      }
    };
  }

  async componentDidMount() {
    const url = `/api/accounts/${this.props.chartType}`;
    const res = await fetch(url);
    const body = await res.json();
    const labels = body.accounts.map(account => account.name);
    const data = body.accounts.map(account => account.total);
    this.setState({
      data: {
        labels,
        datasets: [
          {
            data
          }
        ]
      }
    });
    console.log(body);
  }

  render() {
    return (
      <div className="chart">
        <Pie
          data={this.state.data}
          options={{
            legend: { display: false },
            plugins: {
              colorschemes: {
                scheme: "brewer.Paired12"
              }
            }
          }}
        />
      </div>
    );
  }
}
