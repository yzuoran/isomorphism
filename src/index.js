import Hapi from 'hapi';
import nunjucks from 'nunjucks';
import Application from './lib/application';
nunjucks.configure('./dist');

// create server
const server = Hapi.server({
    host: 'localhost',
    port: 8000
});

const application = new Application({
    '/': (request, h) => {
        return nunjucks.render('index.html', {
            fname: 'RICK',
            lname: 'Sanchez'
        });
    }
}, {
    server
});

application.start();
