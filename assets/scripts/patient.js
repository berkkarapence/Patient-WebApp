'use strict';

$(document).ready(function() {

	$("#getpatients").submit(function (e) {
        e.preventDefault();
        getPatients();
        refreshTable();
    });


	getPatients();


	function getPatients() {
        $.ajax({
          url: "/patients",
          type: "GET",
          success: function(data) {
              buildTable();
              populateTable(data);
          }
        });
    }

});


// Column Names for the table
let tableColumnNames = ["Name of Patient", "Organization Name", "Gender",
 						"Number of Conditions they have", "List of All Conditions"];

// Build Tables here
function buildTable() {
    let table = document.getElementById("allpatients");
    let tableColumnLength = table.rows[0].cells.length;

    for(let k = 0; k < tableColumnLength; k++) {
        table.rows[0].cells[k].innerHTML = tableColumnNames[k];
    }
}

function populateTable(data) {

        let taArray = [];
        let table = document.getElementById("allpatients");
        table.style.visibility = "visible";
        let rowCount = table.rows.length;

        for(let i = 0; i < data.identifier.length; i++) {
        	let givenName = data["identifier"][i]["name"][0]["given"];
			let familyName = data["identifier"][i]["name"][0]["family"];
			let name = givenName + " " + familyName
			let organizationName = data["identifier"][i]["managingOrganization"]["display"];
			let gender = data["identifier"][i]["gender"];
			let conditions = data["identifier"][i]["conditions"];

            let row = table.insertRow(rowCount);
            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
            let cell3 = row.insertCell(3);
            let cell4 = row.insertCell(4);
            table.rows[rowCount].cells[0].innerHTML = name
            table.rows[rowCount].cells[1].innerHTML = organizationName
            table.rows[rowCount].cells[2].innerHTML = gender
            table.rows[rowCount].cells[3].innerHTML = conditions.length
            table.rows[rowCount].cells[4].innerHTML = conditions
            rowCount++;
        }

    }

function refreshTable() {
        let button = document.getElementById("list");
        button.onclick = function() {
            $("#allpatients").find("tr:gt(0)").remove();
        }
    }    


