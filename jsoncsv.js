const csv2json = require('csvjson-csv2json');
const json2csv = require('csvjson-json2csv');
let csv = `"","GL Transactions","2022 Adopted Budget","Calculation","Calculation","Proposed Budget, 2",""

"","2021","2022","Calculation #1","Calculation #2","2023","2024"

"Expenses","2781999.7","2876313","94313.3","1.0339","14068629.12","14068629.12"

"Expenses |  Admin & Services","37812.47","142823","105010.53","3.7771","264318.56","264318.56"

"Expenses |  After School","6346.07","68753","62406.93","10.8339","42720.71","42720.71"

"Expenses |  Art","5029","11111","6082","2.2093","21849.22","21849.22"

"Expenses |  Camp","4390.76","92555","88164.24","21.0794","81852.38","81852.38"

"Expenses |  Community Center","22696.53","121822","99125.47","5.3674","155122.34","155122.34"

"Expenses |  Community Events & Programs","8655.54","58849","50193.46","6.7989","66657.97","66657.97"

"Expenses |  Community Fund","","12753","","","8257.57","8257.57"

"Expenses |  Community Promotion","292242.82","38386","-253856.82","0.1313","843485.11","843485.11"

"Expenses |  Council & Mayor","8540.22","73545","65004.78","8.6116","42802.66","42802.66"

"Expenses |  Debt Service","","21189","","","2729826.05","2729826.05"

"Expenses |  Engineering/Administration","65746.97","136132","70385.03","2.0705","380111.06","380111.06"

"Expenses |  Finance","53744.26","120516","66771.74","2.2423","348552.18","348552.18"

"Expenses |  Fire & Emergency Services","","2370","","","143034.11","143034.11"

"Expenses |  Government Buildings","40419.02","153997","113577.98","3.81","299882.55","299882.55"

"Expenses |  Housing Program","28000","4551","-23449","0.1625","28000","28000"

"Expenses |  IT & Telecommunication","-22318.74","56797","79115.74","-2.5448","4397.48","4397.48"

"Expenses |  Law Enforcement","97280.25","7068","-90212.25","0.0726","583681.5","583681.5"

"Expenses |  Leisure Programs","15219.14","66033","50813.86","4.3388","125229.83","125229.83"

"Expenses |  Non Departmental","35397.97","31046","-4351.97","0.877","52245.57","52245.57"

"Expenses |  OPEB Benefits","14795.43","8993","-5802.43","0.6078","93996.59","93996.59"

"Expenses |  PERS UAAL Reserve","1997.89","13620","11622.11","6.8171","8627.67","8627.67"

"Expenses |  Park Maintenance","42957.69","105855","62897.31","2.4641","320121.57","320121.57"

"Expenses |  Planning & Building","85005.34","117692","32686.66","1.3845","562004.67","562004.67"

"Expenses |  Public Educational and Government Access","","21162","","","0","0"

"Expenses |  Revenues / Balance Sheet","108267.44","36819","-71448.44","0.34","-154672.09","-154672.09"

"Expenses |  Risk Management","1353.65","32864","31510.35","24.278","31908.92","31908.92"

"Expenses |  Sports Programs","2867.66","70894","68026.34","24.7218","21213.51","21213.51"

"Expenses |  Street Maintenance","27362.28","113824","86461.72","4.1598","194358.19","194358.19"

"Expenses |  Thanksgiving Fund","","7341","","","895.17","895.17"

"Expenses |  Town Attorney","","5998","","","101669.82","101669.82"

"Expenses |  Town Capital Projects","85077.6","69950","-15127.6","0.8221","532719.33","532719.33"

"Expenses |  Town Clerk","55507.13","140443","84935.87","2.5301","263016.8","263016.8"

"Expenses |  Town Manager's Office","44118.18","101993","57874.82","2.3118","280533.12","280533.12"

"Expenses |  Transfers","975645.17","85243","-890402.17","0.0873","1950086.68","1950086.68"

"Expenses |  WW Joint Treatment Plant","49393","39780","-9613","0.8053","407545.08","407545.08"

"Expenses |  Wastewater Capital Improv","6435.13","29188","22752.87","4.5357","174315.14","174315.14"

"Expenses |  Wastewater Collection","25878.02","130594","104715.98","5.0465","201065.21","201065.21"

"Expenses |  Wastewater Treatment O&M","115950.07","202023","86072.93","1.7423","745166.28","745166.28"

"Expenses |  Water Capital Improvement","325101.95","18795","-306306.95","0.0578","929613.25","929613.25"

"Expenses |  Water Purchases","64595.56","85464","20868.44","1.323","831652.99","831652.99"

"Expenses |  Water Utility O&M","49628.32","155938","106309.68","3.1421","317691.8","317691.8"

"Expenses |  Yountville Arts","","4672","","","295","295"

"Expenses |  Yountville Arts Programs","859.91","56872","56012.09","66.1371","32777.57","32777.57"

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
let csvResult = json2csv(result);
csvResult = csvResult.replaceAll('__1', '');
csvResult = csvResult.replaceAll('__2', '');
csvResult = csvResult.replaceAll('__3', '');
csvResult = csvResult.replaceAll('__4', '');
csvResult = csvResult.replaceAll('Child-1', '');

console.log(csvResult);

//end step remove __number on the csv already created
