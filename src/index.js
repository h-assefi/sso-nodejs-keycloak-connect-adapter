// Import required modules:
// - express: Web framework for Node.js
// - express-session: Middleware for managing user sessions
// - keycloak-connect: Keycloak adapter for Express
import express from "express";
import session from "express-session";
import Keycloak from "keycloak-connect";

// Keycloak configuration object:
// - realm: Name of the Keycloak realm
// - auth-server-url: URL to the Keycloak authentication server
// - ssl-required: Enforces SSL for external requests
// - bearer-only: If true, disables login endpoints (API only)
// - resource: Client ID registered in Keycloak
// - credentials: Client secret for confidential access
// - confidential-port: Port for confidential requests (0 disables)
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

// Initialize Express application
const app = express();

// Create an in-memory session store for user sessions
// Note: For production, consider using a more robust session store such as Redis or other supported stores for better scalability and reliability.
const memoryStore = new session.MemoryStore();

// Initialize Keycloak middleware with session store and config
const keycloak = new Keycloak({ store: memoryStore }, kcConfig);

// Configure session middleware for Express:
// - secret: Used to sign the session ID cookie
// - resave: Avoid resaving session if unmodified
// - saveUninitialized: Save new sessions even if unmodified
// - cookie: Session cookie settings (not secure for dev)
// - store: Use the in-memory session store
app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 },
    store: memoryStore,
  })
);

// Enable parsing of JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register Keycloak middleware for authentication and authorization
app.use(keycloak.middleware());

// Protected route example:
// - Only accessible to authenticated users
// - Returns Keycloak authentication info in response
app.get("/secure", keycloak.protect(), (req, res) => {
  res.json({ kauth: req.kauth });
});

// Public health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Health check!" });
});

// Start the Express server on port 3000
app.listen(3000, () => {
  console.log("API server running on http://localhost:3000");
});

// (Development only) Disable SSL certificate validation for all HTTPS requests
// WARNING: This should never be used in production as it makes HTTPS insecure
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
