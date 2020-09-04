const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/MOCK_DATA.json`, 'utf-8');
const dataObj = JSON.parse(data);
console.log(dataObj);
