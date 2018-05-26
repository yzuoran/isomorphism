/**
 * Application
 */
export default class Application {
    constructor(routes, options) {
        this.server = options.server;
        this.document = options.document;
        this.registerRoutes(routes);
    }

    registerRoutes(routes) {
        for (let path in routes) {
            this.addRoute(path, routes[path]);
        }
    }

    addRoute(path, Controller) {
        this.server.route({
            path,
            method: 'GET',
            handler: (request, h) => {
                const controller = new Controller({
                    query: request.query,
                    params: request.params
                });

                return controller.index(this, request, h, (err) => {
                    if (err) return err;
                    return controller.toString((err, html) => {
                        if (err) return err;
                        return this.document(this, controller, request, h, html, (err, html) => {
                            return err ? err : html;
                        });
                    });
                })
            }
        });
    }

    start() {{
        this.server.start();
    }}
}