const mongodb = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'impactodo';

const TextTodo = [{text : "Learn MongoDB"},{text :"Learn Mysql"}
];

// Use connect method to connect to the server
mongodb.MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});

const findTodo= function(db, callback) {
  // Get the documents collection
  const collection = db.collection('todo');
  // Find some documents
  collection.find().toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}

const insertTodo = function(db, documents, callback) {
  db.collection("todo").insert(documents, function(err, result)  {
    assert.equal(err, null);
    console.log("Inserted 3 todos");
    callback(result);
  });
};

const removeTodo = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('todo');
  // Delete document where a is 3
  collection.deleteOne({text: "Learn Mysql"}), function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document ");
    callback(result);
  };
}

// const updateTodo = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('todo');
//   // Update document where a is 2, set b equal to 1
//   collection.updateOne({ text: "Learn Mysql" }
//     , { $set: { text: "Learn Javascript" } }, function(err, result) {
//     assert.equal(err, null);
//     assert.equal(1, result.result.n);
//     console.log("Updated the document");
//     callback(result);
//   });
// }

mongodb.MongoClient.connect(url, (err, client) => {
  assert.equal(null, err);

  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertTodo(db, TextTodo, function() {
    console.log("inserted...");
  });

  findTodo(db, result => {
    console.log(result);
    client.close();
  });

  removeTodo(db, result => {
    console.log(result);
    client.close();
  });

  // updateTodo(db, result => {
  //   console.log(result);
  //   client.close();
  // });

});
