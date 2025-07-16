import express from "express";
import session from "express-session";
import Keycloak from "keycloak-connect";

const kcConfig = {
  realm: "irisa",
  "auth-server-url": "https://em-stage.irisaco.com/oauth/",
  "ssl-required": "external",
  "bearer-only": false,
  resource: "sso-nodejs-keycloak-connect-test",
  credentials: {
    secret: "QpM9ScuOXxFL8nnXTDCVOWygY05IfLh9",
  },
  "confidential-port": 0,
};

const app = express();
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore }, kcConfig);

app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 },
    store: memoryStore,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(keycloak.middleware());

app.get("/secure", keycloak.protect(), (req, res) => {
  res.json({ kauth: req.kauth });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Health check!" });
});

// Start the server
app.listen(3000, () => {
  console.log("API server running on http://localhost:3000");
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
