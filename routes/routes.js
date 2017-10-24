'use strict';

var fs = require('fs');

let patientObject;

fs.readFile('validpatient.json', 'utf-8', function(err, data) {
    if(err) {
        throw err;
    }
    patientObject = JSON.parse(data);
});


exports.findAllPatients = function(req, res) {

	res.send(patientObject);

}