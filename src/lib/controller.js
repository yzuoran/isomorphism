/**
 * Controller
 */
export default class Controller {
    constructor(context) {
        this.context = context;
    }

    index(application, request, h, callback) {
        return callback(null);
    }

    toString(callback) {
        return callback(null, 'success');
    }
}