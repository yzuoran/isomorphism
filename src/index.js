import Hapi from 'hapi';
import nunjucks from 'nunjucks';
import Application from './lib/application';
import HelloController from './controller/hello';
nunjucks.configure('./dist');

// create server
const server = Hapi.server({
    host: 'localhost',
    port: 8000
});

const application = new Application({
    '/hello/{name*}': HelloController
}, {
    server,
    document: (application, controller, request, h, body, callback) => {
        try {
            const html = nunjucks.render('./index.html', { body });
            return callback(null, html);
        } catch (err) {
            return callback(err, null);
        }
    }
});

application.start();
