let converter = require('json-2-csv');
const jsonCSV = [
  {
    '': '',
    'GL Transactions': 2021,
    '2022 Adopted Budget': 2022,
    Calculation: 'Calculation #1',
    Calculation__1: 'Calculation #2',
  },
  {
    '': 'Expenses',
    'GL Transactions': 2781999.7,
    '2022 Adopted Budget': 2876313,
    Calculation: 94313.3,
    Calculation__1: 1.0339,
  },
  {
    '': 'Expenses | Admin & Services',
    'GL Transactions': 37812.47,
    '2022 Adopted Budget': 142823,
    Calculation: 105010.53,
    Calculation__1: 3.7771,
  },
];

let options = {
  delimiter: {
    field: ',', // Comma field delimiter
    eol: '\n', // Newline delimiter
  },
};

let json2csvCallback = function (err, csv) {
  if (err) throw err;
  csv = csv.replaceAll('__1', '');
  csv = csv.replaceAll('undefined', '');
  console.log(csv);
};

let biggerChild = 0;

jsonCSV.forEach((element) => {
  if (element['']) {
    biggerChild =
      element[''].split('|').length > biggerChild
        ? element[''].split('|').length
        : biggerChild;
  }
});

if (biggerChild > 1) {
  //should append new column after null column
  for (let index = 1; index < biggerChild; index++) {
    jsonCSV[0]['Child-' + index] = '';
  }
}

const objKeys = Object.keys(jsonCSV[0]);
const objValues = Object.keys(jsonCSV[0]);
const newSortedObjJson = {};

objKeys.forEach((element, index) => {
  if (!element) {
    newSortedObjJson[element] = objValues[index];
  }
  if (element.includes('Child')) {
    newSortedObjJson[element] = '';
  }
});

objKeys.forEach((element, index) => {
  if (element && !element.includes('Child')) {
    newSortedObjJson[element] = objValues[index];
  }
});

jsonCSV[0] = newSortedObjJson;

jsonCSV.forEach((element, index) => {
  if (element['']) {
    const splitValue = element[''].split('|');
    if (splitValue.length > 1) {
      element[''] = splitValue[splitValue.length - 2].trim();
    }
    splitValue.shift();
    splitValue.forEach((valueSplit, i) => {
      jsonCSV[index]['Child-' + (parseInt(i) + 1)] = valueSplit.trim();
    });
  }
});

//remove all child names
const stringified = JSON.stringify(jsonCSV);
const regexp = /^Child-[0-9]+$/g;
const result = JSON.parse(stringified.replaceAll('Child-1', '__1'));

//var csv is the CSV file with headers
converter.json2csv(result, json2csvCallback, options);

//end step remove __number on the csv already created
