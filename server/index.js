require("dotenv").config();

const http = require("http");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const express = require("express");
const path = require("path");
const app = express();
const products = require("./controllers/products");
const users = require("./controllers/users");
const stripeController = require("./controllers/stripe");
const {
  parseAuthorizationHeader,
  requireLogin,
} = require("./middleware/authorization");
const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

mongoose.connect(mongoString).catch((err) => {
  console.log("Error, could not connect to database.");
});
const database = mongoose.connection;

// Creates a middleware for json.
app
  .use(express.json())
  .use(express.static(path.join(__dirname, "../client/dist")))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    )
    // Make sure OPTIONS request are always allowed
    // That way pre-flight requests don't fail
    if (req.method === "OPTIONS") {
      return res.status(200).send({});
    }
    next();
  })
  .use(parseAuthorizationHeader());

// Actions
app.get("/", (req, res) => {
  res.send("Server was accessed");
});
app
  .use("/api/v1/products", requireLogin(), products)
  .use("/api/v1/users", users)
  .use("/api/v1/stripe", requireLogin(), stripeController);

// Catch all (called deep linking)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

//error handling
app.use((err, req, res, next) => {
  console.log(err);
  switch (err.type) {
    case "StripeCardError": {
      // A declined card error
      const msg = {
        status: 400,
        error: `${err.raw.message}`,
        isSuccess: false,
      };
      res.status(msg.status).send(msg);
      break;
    }
    case "StripeRateLimitError": {
      // Too many requests made to the API too quickly
      const msg = {
        status: 429,
        error: `${err.raw.message}`,
        isSuccess: false,
      };
      res.status(msg.status).send(msg);
      break;
    }
    case "StripeInvalidRequestError": {
      // Invalid parameters were supplied to Stripe's API
      const msg = {
        status: 400,
        error: `${err.raw.message}`,
        isSuccess: false,
      };
      res.status(msg.status).send(msg);
      break;
    }
    case "StripeAPIError": {
      // An error occurred internally with Stripe's API
      const msg = {
        status: 500,
        error: `${err.raw.message}`,
        isSuccess: false,
      };
      res.status(msg.status).send(msg);
      break;
    }
    case "StripeConnectionError": {
      // Some kind of error occurred during the HTTPS communication
      const msg = {
        status: 500,
        error: `${err.raw.message}`,
        isSuccess: false,
      };
      res.status(msg.status).send(msg);
      break;
    }
    case "StripeAuthenticationError": {
      // You probably used an incorrect API key
      const msg = {
        status: 500,
        error: `${err.raw.message}`,
        isSuccess: false,
      };
      res.status(msg.status).send(msg);
      break;
    }
    case "StripeCardError": {
      // Stripe Error
      const msg = {
        status: 500,
        error: `${err.raw.message}`,
        isSuccess: false,
      };
      res.status(msg.status).send(msg);
      break;
    }
    default: {
      switch (err.code) {
        case 11000: {
          const field = Object.keys(err.keyValue);
          const msg = {
            status: 409,
            error: `Duplicate key error as ${field} already exists`,
            isSuccess: false,
          };
          res.status(msg.status).send(msg);
          break;
        }
        default: {
          const msg = {
            status: err.code || 500,
            error: err.message || "Internal Server Error",
            isSuccess: false,
          };
          res.status(msg.status).json(msg);
          break;
        }
      }
      break; // by default already breaks, but its better to be explicit
    }
  }
});

app.listen(port, () => {
  console.log(`Listening at http://${hostname}:${port}`);
});

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
