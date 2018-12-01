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

router.get('/services', (req, res) => {
	queries.getServices_Group()
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


module.exports = router;
