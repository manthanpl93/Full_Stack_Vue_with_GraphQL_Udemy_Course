const { ApolloServer, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');

const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
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
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('DB connected'))
    .catch(error => console.error(error));

// Verify JWT Token passed from client
const getUser = async token => {
    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch (err) {
            throw new AuthenticationError('Your session has ended. Please sign in again.')
        }
    }
}

// Create Appolo-GraphQL Server using typeDefs, resolvers and context object
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers['authorization'];
        return { User, Post, currentUser: await getUser(token) }

    }
});

server.listen().then(({ url }) => {
    console.log(`Server is listening ${url}`);
});