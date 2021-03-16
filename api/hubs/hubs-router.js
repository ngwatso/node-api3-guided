const express = require('express');

const Hubs = require('./hubs-model.js');
const Messages = require('../messages/messages-model.js');

const router = express.Router();
const Controller = require('./hubs-controller');

router.get('/', Controller.getHubs);

router.get('/:id', validateId, Controller.getHubById);

router.post('/', requireBody, (req, res) => {
	Hubs.add(req.body)
		.then((hub) => {
			res.status(201).json(hub);
		})
		.catch((error) => {
			// ?? log error to server
			console.log(error);
			res.status(500).json({
				message: 'Error adding the hub',
			});
		});
});

router.delete('/:id', validateId, async (req, res) => {
	try {
		await Hubs.remove(req.hub.id);
		res.status(200).json({ message: `hub #${req.hub.id} removed` });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Error removing the hub',
		});
	}
});
// 	Hubs.remove(req.params.id)
// 		.then((count) => {
// 			if (count > 0) {
// 				res.status(200).json({ message: 'The hub has been nuked' });
// 			} else {
// 				res.status(404).json({
// 					message: 'The hub could not be found',
// 				});
// 			}
// 		})
// 		.catch((error) => {
// 			// ?? log error to server
// 			console.log(error);
// 			res.status(500).json({
// 				message: 'Error removing the hub',
// 			});
// 		});
// });

router.put('/:id', validateId, requireBody, (req, res) => {
	Hubs.update(req.params.id, req.body)
		.then((hub) => {
			if (hub) {
				res.status(200).json(hub);
			} else {
				res.status(404).json({
					message: 'The hub could not be found',
				});
			}
		})
		.catch((error) => {
			// ?? log error to server
			console.log(error);
			res.status(500).json({
				message: 'Error updating the hub',
			});
		});
});

router.get('/:id/messages', validateId, (req, res) => {
	Hubs.findHubMessages(req.params.id)
		.then((messages) => {
			res.status(200).json(messages);
		})
		.catch((error) => {
			// ?? log error to server
			console.log(error);
			res.status(500).json({
				message: 'Error getting the messages for the hub',
			});
		});
});

router.post('/:id/messages', validateId, requireBody, (req, res) => {
	const messageInfo = { ...req.body, hub_id: req.params.id };

	Messages.add(messageInfo)
		.then((message) => {
			res.status(210).json(message);
		})
		.catch((error) => {
			// ?? log error to server
			console.log(error);
			res.status(500).json({
				message: 'Error adding message to the hub',
			});
		});
});

// !! this middleware function will always be preceded by a cal;l to validateId()
// !! validateId ensures that req.hub exists, if the id in the URL is valid
function getHubById(req, res) {
	res.json(req.hub);
}

async function validateId(req, res, next) {
	const { id } = req.params;
	try {
		const hub = await Hubs.findById(id);
		if (hub) {
			req.hub = hub;
			next();
		} else {
			next({
				...Error(),
				status: 404,
				message: 'invalid id',
			});
			// res.status(404).json({ message: 'invalid id' });
		}
	} catch (err) {
		next({ ...err, status: 500 });
		// res.status(500).json({
		// 	message: 'error processing request',
		// 	error: err,
		// });
	}
}

async function requireBody(req, res, next) {
	if (req.body && Object.keys(req.body).length > 0) {
		next();
	} else {
		res.status(400).json({ message: 'body is required' });
	}
}

module.exports = router;
