class Server {
    #http;
    constructor(http) {
        this.#http = http;
    }

    middlewares(middlewares) {
        for (const key in middlewares) {
            this.#http.use(middlewares[key]);
        }
    }

    routes(routes) {
        for (const path in routes) {
            this.#http.use(path, routes[path]);
        }
    }

    errorHandler(errorHandler) {
        this.#http.use(errorHandler);
    }

    start(port) {
        this.#http.listen(port, () => {
            
            console.log('====================================');
            console.log(`server started on port ${port}`);
            console.log('====================================');
        })
    }
}

export default Server;