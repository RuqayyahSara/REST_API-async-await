# REST_API-async-await
#### Implementing basic CRUD operations with Mongoose and MongoDB Atlas using async/await

The following project uses :
1. Express.js framework to create a server. 
2. Mongoose library to provide Schema.
3. MongoDB Atlas as a cloud database to store collections and documents.

REST API is implemented using async/await returning a promise and I have used relations in Schema.



"name": "mamaSara",
        "age": 10,
        "address": [
            {
                "_id": "5e0bc22de274db29f0374ce6",
                "city": "Al-Khobar",
                "street": "Prince Mansoor,8th cross",
                "zip": 7262
            },
            {
                "_id": "5df931429ef59624cc9a83fd",
                "street": "Adams Colony",
                "city": "Hyderabad",
                "zip": 1234
            }
        ]
