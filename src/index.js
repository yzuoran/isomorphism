import Hapi from 'hapi';
import nunjucks from 'nunjucks';
nunjucks.configure('./dist');

// create server
const server = Hapi.server({
    host: 'localhost',
    port: 8000
});

// add router
server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, h) {
        return nunjucks.render('index.html', {
            fname: 'RICK',
            lname: 'Sanchez'
        });
    }
});

server.start();
