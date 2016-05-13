# RESTful API for storing user friendlists with Node.js and MongoDB


## Requirements

- **Node.js** - this application was developed and tested on **Node.js v6.1.0**. To install node please refer to [Node.js Installation Guide] (https://nodejs.org/en/download/package-manager/)
- **MongoDB** - this application was developed and tested on **MongoDB v3.2.6**. To install MongoDB please refer to [MongoDB Installation Guide] (https://docs.mongodb.com/v3.2/installation/)

Additionaly, all install/test commands described in this documentation will be based on *Debian and Ubuntu based Linux distributions*.


## Installation

Once you have *Node.js* and *MongoDB* installed on your machine, you can proceed to 
downloading this application to dedicated folder on your server. If you are using **git**, you can simply:

    git clone https://github.com/Flantive/friendlist.git

Then, go to created folder and install all dependecies:

    cd friendlist
    npm install


## Unit/Integration Testing

When npm finishes downloading all modules, you are ready to run prepared unit and integration tests. Simply run test command:

    npm test

All tests from */tests* directory will be initialised by **motcha** module. To run integration tests, we need to start our application. If default port of this application (8080) is occupied in your environment, tell test to start application on different port:

    PORT=[port] npm test


## Functional Testing

Of course we not only want to see our coded test passing or failing, but we want to be able to test the application ourselves. All available requests in our app are as follows:

    GET /friendlist/:id
    POST /friendship
    DELETE /friendship/:id

If we want to test this requests, firstly we need to start our application with command:

    node server.js 

Or when defaul port (8080) is occupied:

    PORT=[port] node server.js

### GET requests

After successful start of our server, we are ready to send some requests. We will use `curl` command. To all requests posted in this documentation, we will an execution time, to see how long it took to get the response.

Lest start with simple GET request to get friendlist of non-existing user (DB is currently empty):

    curl -i -X GET http://localhost:8080/friendlist/1 -w \\n%{time_total}\\n

We should get "200: OK" response, with empty array `[]` and time of execution. Below is example response to that request:

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 2
    ETag: W/"2-11FxOYiYfpMxmANj4kGJzg"
    Date: Fri, 13 May 2016 14:24:05 GMT
    Connection: keep-alive

    []
    0.026

### POST requests

Now test if after successful *POST* request friendlist is changed:

    curl -i -X POST -H "Content-Type:application/json" http://localhost:8080/friendship/ -d '{"uid1": 1,"uid2": 2}' -w %{time_total}\\n
    curl -i -X GET http://localhost:8080/friendlist/1 -w \\n%{time_total}\\n
    curl -i -X GET http://localhost:8080/friendlist/2 -w \\n%{time_total}\\n

With *POST* request to */friendship* we need to send additional data: object with ID's of users that will be friends. Object in our example is `{"uid1": 1,"uid2": 2}`, so we request to add friendship between user with ID=1 and ID=2. We expect to receive "204: No Content" response, when friendship is added.
We can check if friendship exist in database with *GET* request for friendlist of user with ID=1 and ID=2. Both requests should result in response with friendlist array with one element being added friend.

### DELETE requests

After that we can check if our *DELETE* request also works properly. 

    curl -i -X DELETE http://localhost:8080/friendship/1-2 -w %{time_total}\\n
    curl -i -X GET http://localhost:8080/friendlist/1 -w \\n%{time_total}\\n
    curl -i -X GET http://localhost:8080/friendlist/2 -w \\n%{time_total}\\n

First request should delete friendship between user with ID=1 and ID=2, because we sent param :id equal to "1-2". This means we want to delete connection (friendship) between user 1 and 2.
After successful *DELETE*, we send *GET* requests to check if users 1 and 2 no longer have each other on their friendlist.

### Requests with wrong/insufficient data

Final thing we can test is if requesting a resource with incorrect data (param or body) will result in "422: Unprocessable Entity" response. We expect that response to every wrognly formated, but existing request.

    curl -i -X GET http://localhost:8080/friendlist/abc -w \\n%{time_total}\\n
    curl -i -X POST -H "Content-Type:application/json" http://localhost:8080/friendship/ -d '{"uid1": "a","uid2": "a"}' -w \\n%{time_total}\\n
    curl -i -X DELETE http://localhost:8080/friendship/2-1-2 -w \\n%{time_total}\\n

Each of these requests should result in "422: Unprocessable Entity" response, with JSON data explaining errors. This data should be an array with objects formated like this:

    [
      {
        param: "param_name",
        msg: "error_message",
        value: "value_of_sent_param"
      },
      ...
    ]

Every object in that array is separate error concerning one of sent params.

## Additional Testing

To help with testing, only on development environment there are available requests:

    GET /testing/clearDB       # clears DB
    GET /testing/fillDB/sample # fills DB with 5 users, each with 1-2 friends
    GET /testing/fillDB/small  # fills DB with 100 users, each with ~20 friends
    GET /testing/fillDB/medium # fills DB with 10000 users, each with ~100 friends
    GET /testing/fillDB/big    # fills DB with 100000 users, each with ~250 friends

**Warning!**

Request `GET /testing/fillDB/big` will take some time to execute (up to 60sec) and cause higher memory (RAM) demand (temporary, during execution). Before using this request try using `GET /testing/fillDB/medium`.