const request = require('request-promise');

// create an empty modbus client 
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();
 
// open connection to a tcp line 
// client.connectTCP("192.168.2.96:502");
// client.setID(1);

const options = {
  uri: 'http://buildings.nantum.io/345_Park/sensors?q=eyJzb3VyY2UiOiAicHFfbWV0ZXIifQ==',
  headers: {
      Authorization: '7McdaRC6fULlka2cPgsZ'
  },
  json: true
};

function getDocs(options) {
  return request(options)
    .then(data => data.docs)
    .catch(err => {
      throw err;
    });
}

getDocs(options)
.then(data => {
  console.log(data);
});

// read the values of 10 registers starting at address 0 
// on device number 1. and log the values to the console. 
setInterval(function() {
    client.readHoldingRegisters(173, 38, function(err, data) {
        if (err) console.log('err: ', err);
        else console.log('data: ', data.data);
    });
}, 5000);

