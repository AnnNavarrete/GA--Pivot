"use strict";

var randomSelect = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
var randomDescription = function(amount) {
  var adjective = [
    "dancing",
    "partying",
    "sleeping",
    "playing with otters",
    "scuba diving with the sharks",
    "drinking alone",
    "running away",
    "swimming quickly",
    "singing badly",
    "wearing nothing"
  ];
  var noun = [
    "under the ocean",
    "to pay the rent",
    "in Mexico",
    "near Geelong",
    "as an instagram model",
    "because I'm secretly a mermaid",
    "while riding a dolphin",
    "and then bungy jumping into the abyss",
    "to finish my GA course",
    "because why not"
  ];

  return `${amount >= 0 ? "Income for" : "Expenses from"} ${randomSelect(
    adjective
  )} ${randomSelect(noun)}`;
};

var randomAmount = function(max) {
  return Math.ceil(Math.random() * max * (Math.random() > 0.5 ? -1 : +1));
};

var randomDate = function(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
    .toLocaleString()
    .slice(0, 10);
};

var bankStatement = function() {
  var items = [];
  for (var i = 0; i < 8; i++) {
    var amount = randomAmount(23456);
    items.push({
      date: randomDate(new Date(2012, 0, 1), new Date()),
      description: randomDescription(amount),
      amount
    });
  }
  return {
    items
  };
};

module.exports.endpoint = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(bankStatement())
  };

  callback(null, response);
};
