export const Api = (() => {
    const baseUrl = "http://localhost:3000";
    const todospath = "todos";

    //----------CRUD OPP #1
    const fetchTodos = () => {
        let xhr_GET = new XMLHttpRequest();

        xhr_GET.open("GET", [baseUrl, todospath].join("/"));

        return new Promise((resolve, reject) => {
            xhr_GET.onreadystatechange = (e) => {
                if (xhr_GET.readyState !== 4) {
                    return;
                }
                if (xhr_GET.status === 200) {
                    console.log('SUCCESS', xhr_GET.responseText);
                    resolve(JSON.parse(xhr_GET.responseText));
                } else {
                    console.warn('request_error');
                }
            };
            xhr_GET.send();
        });
    }

    //----------CRUD OPP #2
    const postTodo = (newTodo) => {

        // 1.) Create request
        let xhr = new XMLHttpRequest();

        // 2.) Open request
        xhr.open("POST", [baseUrl, todospath].join("/"));


        // 3.) Set content type for request
        xhr.setRequestHeader("Content-Type", "application/json");

        let data = JSON.stringify(newTodo);

        return new Promise((resolve, reject) => {

            xhr.onload = (e) => {
                if (xhr.readyState !== 4) {
                    return;
                }
                else {
                    console.log('SUCCESS', xhr.responseText);
                    resolve(JSON.parse(xhr.responseText));
                }

            };
            xhr.send(data);
        })
    }

    function easyHTTP() {
        // Initialising new XMLHttpRequest method.
        this.http = new XMLHttpRequest();
    }

    // Make an HTTP Delete Request
    easyHTTP.prototype.delete = function (url, callback) {

        // Open an request (GET/POST/PUT/DELETE,
        // PATH, ASYNC - TRUE/FALSE)
        this.http.open("DELETE", url, true);

        // Assigning this to self to have
        // scope of this into the function
        let self = this;

        // When the response is ready
        this.http.onload = function () {

            // Checking status
            if (self.http.status === 200) {

                // Callback function (Error, response text)
                callback(null, "Post Deleted");
            } else {

                // Callback function (Error message)
                callback("Error: " + self.http.status);
            }
        };

        // Send the request
        this.http.send();
    };

    //----------CRUD OPP #3
    const deleteTodo = (num) => {
        // Instantiate easyHTTP
        const http = new easyHTTP();

        const todogroup = [baseUrl, todospath].join("/");

        return new Promise((resolve, reject) => {
            //create cllback function
            function aftermath(err, response) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(response);
                    resolve(response);
                }
            }

            // Use the delete prototype
            // method with (URL, callback(error, response text))
            http.delete([todogroup, num].join("/"), aftermath);

        })
    };

    // Make an HTTP PUT Request
    easyHTTP.prototype.put = function (url, data, callback) {

        // Open an object (POST, PATH, ASYNC-TRUE/FALSE)
        this.http.open('PUT', url, true);

        // Set content-type
        this.http.setRequestHeader(
            'Content-type', 'application/json');

        // Assigning this to self to have 
        // scope of this into the function onload
        let self = this;

        // When response is ready
        this.http.onload = function () {

            // Callback function (Error, response text)
            callback(null, self.http.responseText);
        }

        // Since the data is an object so
        // we need to stringify it
        this.http.send(JSON.stringify(data));
    }

    //----------CRUD OPP #4
    const putTodo = (newtodo, id) => {
        // Instantiating easyHTTP
        const http = new easyHTTP;

        const fullTodosPath = [baseUrl, todospath].join("/");

        return new Promise((resolve, reject) => {

            //create cllback function
            function aftermath(err, response) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(response);
                    resolve(JSON.parse(response));
                }
            }

            // Put prototype method(url, data,
            // response text)
            http.put(
                [fullTodosPath, id].join("/"),
                newtodo, aftermath);
        })
    }

    return { fetchTodos, postTodo, deleteTodo, putTodo };
})();
