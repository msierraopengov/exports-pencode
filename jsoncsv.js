const csv2json = require('csvjson-csv2json');

let csv = `"","GL Transactions","2022 Adopted Budget","Calculation","Calculation__1","Proposed Budget, 2",""
"","2021","2022","Calculation #1","Calculation #2","2023","2024"
"Expenses","2781999.7","2876313","94313.3","1.0339","14068629.12","14068629.12"
"Revenues","2403206.89","926094","-1477112.89","0.3853","18061618.75","18061618.75"
`;

const jsonCSV = csv2json(csv, { parseNumbers: true });

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
//const regexp = /^Child-[0-9]+$/g;
const result = JSON.parse(stringified);

console.log(result);

//end step remove __number on the csv already created
