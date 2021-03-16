module.exports = {
	getHubs,
	getHubById,
};

const Hubs = require('./hubs-model');

function getHubs(req, res) {
	Hubs.find(req.query)
		.then((hubs) => {
			res.status(200).json(hubs);
		})
		.catch((error) => {
			// ?? log error to server
			console.log(error);
			res.status(500).json({
				message: 'Error retrieving the hubs',
			});
		});
}

// !! this middleware function will always be preceded by a call to validateId()
// !! validateId ensures that req.hub exists, if the id in the URL is valid
function getHubById(req, res) {
	res.json(req.hub);
}

// function getHubById(req, res) {
// 	Hubs.findById(req.params.id)
// 		.then((hub) => {
// 			if (hub) {
// 				res.status(200).json(hub);
// 			} else {
// 				res.status(404).json({ message: 'Hub not found' });
// 			}
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json({ message: 'Error retrieving the hub' });
// 		});
// }
