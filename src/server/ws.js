const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3030});
const queries = require('./db/queries/beauty_salon');

wss.on('connection', function (ws) {
	ws.on('message', function (message) {
		let arr = message.split('|');
		let review = {'id_client': arr[0], 'review': arr[1]};
		queries.addReview(review)
		.then(data => {})
		.catch(error => console.log(`Error: ${error}`));
		wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
		
	});
});
