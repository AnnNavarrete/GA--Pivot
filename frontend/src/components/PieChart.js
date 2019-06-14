import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import "chartjs-plugin-colorschemes";

export default class PieChart extends React.Component {
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
    const data = body.accounts.map(account => Math.abs(account.total));
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
      <div className="pie-chart">
        <Pie
          redraw
          data={this.state.data}
          options={{
            maintainAspectRatio: false,
            // legend: { display: false },
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
