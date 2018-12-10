const express = require('express');
const router = express.Router();
const queries = require('../db/queries/beauty_salon');

//-------------------GET-----------------------------

router.get('/position', (req, res) => {
	queries.getPosition()
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`));
});

router.get('/master', (req, res) => {
	queries.getAllMasters()
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`));
});

router.get('/groups', (req, res) => {
	queries.getGroups()
	.then((data) => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`));
});

router.get('/master/services', (req, res) => {
	queries.getIdGroup(req.session.key)
	.then(data => {
		queries.getServicesForMaster(data[0].id_group)
		.then((data) => {
			res.send(data);
		})
	})
	.catch(error => console.log(`Error: ${error}`));
});

router.get('/services', (req, res) => {
	queries.getServices()
	.then(data => {
		let service_by_group = [];
		let arr = [];
		for(let i=1; i<=7; i++){
			arr = [];
			data.forEach((service) => {
				if(service.id_group === i){
					arr.push(service);
				}
			})
			service_by_group.push(arr);
		}
		res.send(service_by_group);
	})
	.catch(error => console.log(`Error: ${error}`));
});

router.get('/services/recording', (req, res) => {
	queries.getServices()
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`));
});

router.get('/service_group', (req, res) => {
	queries.getServiceGroup()
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`));
});

//+
router.get('/reviews', (req, res) => {
	queries.getReviews()
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`));
});

router.get('/records_client', (req, res) => {
	queries.getIdClient(req.session.key)
	.then(data => {
		queries.getRecordsByClient(data[0].id)
		.then(data => {
				res.send(data);
		})
	})
	.catch(error => console.log(`Error: ${error}`));
});


let arrFullNameClientsForMyRecords = [];
//записи конкретного мастера
router.get('/services/master/my-records', (req, res) => {
	queries.getIdMaster(req.session.key)
	.then(data => {
		queries.getRecordsByMaster(data[0].id)
		.then(data => {
			data.forEach(record => {
				addFullNameClients(record, (fullNameClient) => {
					arrFullNameClientsForMyRecords.push(fullNameClient);
				})
			});

			setTimeout(() => {
				addAllInformationForMyRecords(data, (arr) => {
					res.send(arr);
				});	
			}, 200);
		})
	})
	.catch(error => console.log(`Error: ${error}`));
});


let arrFullNameClients = [];
let arrFullNameMasters = [];

//все записи (для мастера)
router.get('/services/master/records', (req, res) => {
	queries.getRecords()
	.then(data => {
		data.forEach(record => {
			addFullNameClients(record, (fullNameClient) => {
				arrFullNameClients.push(fullNameClient);
			})
		});

		data.forEach(record => {
			addFullNameMasters(record, (fullNameMaster) => {
				arrFullNameMasters.push(fullNameMaster);
			})
		});

		setTimeout(() => {
			addAllInformation(data, (arr) => {
				res.send(arr);
			});	
		}, 200);
	})
	.catch(error => console.log(`Error: ${error}`));
});

function addFullNameClients(record, callback){
	queries.getFullName(record.id_profile)
	.then(data => {
		callback( data[0].name + " " + data[0].surname);
	})
	.catch(error => console.log(`Error: ${error}`));
}

function addFullNameMasters(record, callback){
	queries.getFullNameMaster(record.id_master)
	.then(data => {
		callback( data[0].name + " " + data[0].surname);
	})
	.catch(error => console.log(`Error: ${error}`));
}

function addAllInformation(data, callback){
	let arr = [];
	for( let i = 0; i < data.length; i++){
		arr.push({
			service: data[i].service,
			master: arrFullNameMasters[i],
			client: arrFullNameClients[i],
			date: data[i].date,
			time: data[i].time
		})
	}
	callback(arr);
}

function addAllInformationForMyRecords(data, callback){
	let arr = [];
	for( let i = 0; i < data.length; i++){
		arr.push({
			service: data[i].service,
			client: arrFullNameClientsForMyRecords[i],
			date: data[i].date,
			time: data[i].time
		})
	}
	callback(arr);
}
//---------------------GET(id)--------------------------

router.get('/service/:id', (req, res) => {
	queries.getOneService(req.params.id)
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`));
});

router.get('/service_by_group/:id', (req, res) => {
	queries.getServiceByGroup(req.params.id)
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`));
});

router.get('/client/:id', (req, res) => {
	queries.getOneClient(req.params.id)
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`));
});

router.get('/service_price/:id', (req, res) => {
	queries.getServicePrice(req.params.id)
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`));
});

router.get('/master/:id', (req, res) => {
	queries.getMasters(req.params.id)
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`));
});

//-------------------POST------------------------------

router.post('/service', (req, res) => {
	queries.addService(req.body)
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`))
});

router.post('/master', (req, res) => {
	queries.addMaster(req.body)
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`))
});

router.post('/schedule', (req, res) => {
	queries.addSchedule(req.body)
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`))
});

router.post('/date_time', (req, res) => {
	queries.getSchedule(req.body)
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`))
});

router.post('/recording', (req, res) => {
	console.log(req.body);
	let new_schedule = {
		id_master: req.body.id_master,
		date: req.body.date,
		time: req.body.time
	}
	let id_client;
	queries.getIdClient(req.session.key)
	.then(data => {
		console.log(data);
		id_client = data[0].id;
	})
	.catch(error => console.log(`Error: ${error}`))
	queries.addSchedule(new_schedule)
	.then(data => {
		let new_record = {
			id_client: id_client,
			id_service: req.body.id_service,
			id_schedule:data[0].id
		}
		queries.addRecord(new_record)
		.then(data => {
			res.send(data);

		})
	})
	.catch(error => console.log(`Error: ${error}`))
});



//-----------------PUT--------------------------------

router.put('/service/:id', (req, res) => {
	queries.updateService(req.params.id, req.body)
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`))
});

router.patch('/service/:id', (req, res) => {
	queries.updateService(req.params.id, req.body)
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`))
});




//-----------------DELETE--------------------------

router.delete('/service/:id', (req, res) => {
	queries.deleteService(req.params.id)
	.then(data => {
		res.send(data);
	})
	.catch(error => console.log(`Error: ${error}`))
});

router.delete('/record/:id', (req, res) => {
	queries.deleteRecord(req.params.id)
	.then(data => {
		queries.deleteRecordOnSchedule(data[0])
		.then(data => {
			res.send(data);
		})
	})
	.catch(error => console.log(`Error: ${error}`))
});


module.exports = router;
