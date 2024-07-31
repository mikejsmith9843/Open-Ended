const experss = require("express");
const path = require("path");
const db = require("./config/connection");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./utils/auth");

const app = experss();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(expres.json());

//In production, server slient/build as static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

//Put this after ALL API routes. This will handle all other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//New instance of an apollo Server with graphql schema
const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    db.once("open", () => {
        app.listen(PORT, () => {
            console.log(`API Server running on port ${PORT}!`);
            console.log(
                `Use GraphQl at http://localhost:${PORT}$server.grapqlPath`
            );
        });
    });
};

startApolloServer();