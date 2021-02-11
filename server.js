const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const fs = require("fs");
const path = require("path");

// Import typeDefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require("./resolvers");

// Import Environment variables and Mongoose Models
const User = require("./models/User");
const Post = require("./models/Post");
require('dotenv').config({ path: 'variables.env' });

// Connect to mlab database
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(error => console.error(error));


// Create Appolo-GraphQL Server using typeDefs, resolvers and context object
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        User,
        Post
    }
});

server.listen().then(({ url }) => {
    console.log(`Server is listening ${url}`);
});