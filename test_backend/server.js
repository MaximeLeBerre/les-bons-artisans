const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 5000 )
const server = http.createServer(app);

server.listen(process.env.PORT || 5000, console.log('server running on port 5000'));
