import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-colorschemes";

export default class BarChart extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: {
  //       datasets: [
  //         {
  //           data: [0, 0]
  //         }
  //       ],
  //       labels: ["Income", "Expenses"]
  //     }
  //   };
  // }

  // async componentDidMount() {
  //   const url = `/api/accounts/${this.props.chartType}`;
  //   const res = await fetch(url);
  //   const body = await res.json();
  //   const labels = body.accountCodes.map(account => account.name);
  //   const data = body.accountCodes.map(account => Math.abs(account.amount));
  //   this.setState({
  //     data: {
  //       labels,
  //       datasets: [
  //         {
  //           data
  //         }
  //       ]
  //     }
  //   });
  //   console.log(body);
  // }

  render() {
    const { labels, data } = this.props;
    const barData = {
      datasets: [
        {
          data: data
        }
      ],
      labels: labels
    };

    return (
      <div className="bar-chart">
        <Bar
          data={barData}
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
