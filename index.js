const request = require('request-promise');

// create an empty modbus client 
const ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();
// open connection to a tcp line 
client.connectTCP('192.168.2.96');
client.setID(1);

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
.then(metaDocs => {
  // open connection to a tcp line 
  client.connectTCP(metaDocs[0].identifier1);
  client.setID(1);
  const promises = metaDocs.map(doc => getData(163, 38));
  return Promise.all(promises);
});



function getData(registerNum, numRegisters) {
  return new Promise((resolve, reject) => {
    client.readHoldingRegisters(registerNum - 1, numRegisters, function(err, data) {
        if (err) reject(err);
        else resolve(data.data);
    });
  })
}

