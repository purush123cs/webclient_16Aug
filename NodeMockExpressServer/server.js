const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 9001

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/employees', (req, res) => {
	console.log("entered /1 endpoint");
	const mockResponse = {
							"employeeId": "1",                  
							"employeeName": "purush"
                         }
	console.log("res body:"+JSON.stringify(mockResponse));
	res.status(200).json(mockResponse);
})

app.get('/employees/1', (req, res) => {
	console.log("entered /1 endpoint");
	const mockResponse = {
							"employeeId": "1",                  
							"employeeName": "purush"
                         }
	console.log("res body:"+JSON.stringify(mockResponse));					 
	res.status(200).json(mockResponse);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))