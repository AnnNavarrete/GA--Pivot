"use strict";

var bankStatement = function() {
  return {
    items: [
      {
        date: "2019-05-01",
        description: "Income from dancing",
        amount: 10567.21
      },
      {
        date: "2019-04-01",
        description: "Monthly Rent",
        amount: -1789.06
      },
      {
        date: "2019-04-04",
        description: "Birthday Lonesome Drinks",
        amount: -423.54
      },
      {
        date: "2019-04-10",
        description: "General Assembly Fees",
        amount: -15500
      },
      {
        date: "2019-04-01",
        description: "Sale of shares to Zuck my bird",
        amount: 25675.9
      },
      {
        date: "2019-04-15",
        description: "Monthly otter survival kit cost",
        amount: -342.56
      },
      {
        date: "2019-04-01",
        description: "Sale of shares to Zuck my bird",
        amount: 25675.9
      },
      {
        date: "2019-04-15",
        description: "Monthly otter survival kit cost",
        amount: -342.56
      }
    ]
  };
};

module.exports.endpoint = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(bankStatement())
  };

  callback(null, response);
};
