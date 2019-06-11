import React from "react";
import { Pie } from "react-chartjs-2";

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        datasets: [
          {
            data: [10, 20, 30, 40, 5]
          }
        ],
        labels: ["House", "Food", "Utilities", "Entertainment", "Transport"],
        backgroundColor: ["255,0,0"]
      }
    };
  }

  render() {
    return (
      <div className="chart">
        <Pie
          data={this.state.data}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}
