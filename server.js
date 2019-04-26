const http = require('http');
const url = require('url');
const server = http.createServer();

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }
  else if (request.method === 'POST') {
    let newMessage = { 'id' : new Date() };
    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });
    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

let messages = [
  { 'id': 1, 'user': 'kim', 'message': 'just doing my prework!' },
  { 'id': 2, 'user': 'yoshi', 'message': 'cheep' },
  { 'id': 3, 'user': 'buffy', 'message': 'chirp' }
];

const getAllMessages = (response) => {
  response.writeHead(200, { 'Content-Type' : 'JSON'})
  response.write(JSON.stringify(messages));
  response.end();
}