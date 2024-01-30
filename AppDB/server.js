const express = require('express');
const cors = require('cors');
const dbConfig = require("./config/db.config");
const cookieSession = require("cookie-session");
const app = express();

// var corsOptions = {
//     origin: 'http://localhost:8081'
// }

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(
    cookieSession({
        name: "calendar-session",
        keys: ["COOKIE_SECRET"],
        httpOnly: true
    })
);

const db = require("./models");
const Role = db.role;

db.mongoose
    .connect('mongodb+srv://testerqa:4kUVv2QriOd6WBjr@calendar.k9nhk17.mongodb.net/')
    .then(() => {
        console.log("Database connected successfully!");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Calendar application."});
});

//routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial(){
    Role.estimatedDocumentCount()
    .then(count => {
        if (count === 0) {
            new Role({
                name: "user"
            }).save()
                .then(() => {
                    console.log("Added 'user' to roles collection");
                })
                .catch(err => {
                    console.error("Error adding 'user' to roles collection:", err);
                });

            new Role({
                name: "moderator"
            }).save()
                .then(() => {
                    console.log("Added 'moderator' to roles collection");
                })
                .catch(err => {
                    console.error("Error adding 'moderator' to roles collection:", err);
                });

            new Role({
                name: "admin"
            }).save()
                .then(() => {
                    console.log("Added 'admin' to roles collection");
                })
                .catch(err => {
                    console.error("Error adding 'admin' to roles collection:", err);
                });
        }
    })
    .catch(err => {
        console.error("Error obtaining document count:", err);
    });
}