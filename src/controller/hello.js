import Controller from '../lib/controller';
import nunjucks from 'nunjucks';

nunjucks.configure('./dist');

export default class HelloController extends Controller {
    getName() {
        const { params, query } = this.context;
        const names = (params.name || '').split('/') || [];
        return {
            fname: names[0] || query.fname,
            lname: names[1] || query.lname
        }
    }

    toString(callback) {
        try {
            const html = nunjucks.renderString('<p>hello {{fname}} {{lname}} !!!</p>', this.getName());
            return callback(null, html);
        } catch (err) {
            return callback(err, null);
        }
    }
}