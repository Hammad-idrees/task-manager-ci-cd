// ***********************************************
// Custom Cypress Commands
// ***********************************************

/**
 * Get token from localStorage
 */
Cypress.Commands.add("getToken", () => {
  return cy.window().then((win) => win.localStorage.getItem("token"));
});

/**
 * Get user from localStorage
 */
Cypress.Commands.add("getUser", () => {
  return cy.window().then((win) => {
    const user = win.localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
});

/**
 * Custom command to ensure test user exists
 */
Cypress.Commands.add(
  "ensureTestUser",
  (
    email = "test@example.com",
    password = "password123",
    name = "Test User"
  ) => {
    // First, clean up any existing test user to avoid conflicts
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/health`,
      failOnStatusCode: false,
    });

    // Try to login first
    return cy
      .request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/auth/login`,
        body: { email, password },
        failOnStatusCode: false,
        timeout: 10000,
      })
      .then((loginResponse) => {
        // If login succeeds (200), user exists
        if (loginResponse.status === 200) {
          cy.log("✅ Test user exists");
          return cy.wrap({ exists: true, user: loginResponse.body.user || {} });
        }

        // If login fails (400), register new user
        cy.log("🔄 Creating new test user...");
        return cy
          .request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/auth/register`,
            body: { name, email, password },
            timeout: 10000,
          })
          .then((registerResponse) => {
            if (registerResponse.status === 201) {
              cy.log("✅ Test user created");
              return cy.wrap({
                exists: false,
                created: true,
                user: registerResponse.body.user || {},
              });
            }

            cy.log("⚠️ Registration response:", registerResponse);
            throw new Error(
              `Failed to create test user: ${
                registerResponse.body?.message || "Unknown error"
              }`
            );
          });
      })
      .catch((error) => {
        cy.log("❌ Error in ensureTestUser:", error.message);
        throw error;
      });
  }
);

/**
 * Simple login command - just API login, no page visit
 */
Cypress.Commands.add(
  "loginViaApi",
  (email = "test@example.com", password = "password123") => {
    cy.log(`Logging in with email: ${email}`);

    return cy.ensureTestUser(email, password).then(() => {
      return cy
        .request({
          method: "POST",
          url: `${Cypress.env("apiUrl")}/auth/login`,
          body: { email, password },
          timeout: 10000,
        })
        .then((response) => {
          // Log the full response for debugging
          cy.log("Login response:", JSON.stringify(response.body));

          if (response.status !== 200) {
            throw new Error(`Login failed with status ${response.status}`);
          }

          // Extract token - check different possible locations
          let token = null;
          if (response.body.token) {
            token = response.body.token;
          } else if (response.body.accessToken) {
            token = response.body.accessToken;
          } else if (response.body.data && response.body.data.token) {
            token = response.body.data.token;
          }

          // Extract user - check different possible locations
          let user = null;
          if (response.body.user) {
            user = response.body.user;
          } else if (response.body.data && response.body.data.user) {
            user = response.body.data.user;
          } else {
            // Create minimal user object
            user = { email, name: "Test User" };
          }

          if (!token) {
            throw new Error("Token not found in login response");
          }

          cy.log(`✅ Login successful, token: ${token.substring(0, 20)}...`);

          // Store in Cypress environment for API calls
          Cypress.env("authToken", token);
          Cypress.env("authUser", user);

          return { token, user };
        });
    });
  }
);

/**
 * Setup authentication before tests
 */
Cypress.Commands.add("setupAuth", () => {
  cy.log("Setting up authentication...");

  return cy.loginViaApi().then(({ token, user }) => {
    // Store token globally for API commands
    Cypress.env("authToken", token);
    Cypress.env("authUser", user);

    cy.log("✅ Auth setup complete");
    return { token, user };
  });
});

/**
 * Visit a page with authentication
 */
Cypress.Commands.add("visitWithAuth", (url = "/dashboard") => {
  // First check if frontend is accessible
  cy.request({
    url: Cypress.config("baseUrl"),
    failOnStatusCode: false,
    timeout: 5000,
  }).then((response) => {
    if (response.status === 0) {
      throw new Error(
        `Frontend not accessible at ${Cypress.config(
          "baseUrl"
        )}. Is the server running?`
      );
    }
  });

  // Get or create token
  return cy.setupAuth().then(({ token, user }) => {
    cy.log(`Visiting ${url} with auth...`);

    // Visit the page with localStorage pre-set
    cy.visit(url, {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("token", token);
        win.localStorage.setItem("user", JSON.stringify(user));
        // Also set on window for immediate access
        win.__CYPRESS_AUTH_TOKEN__ = token;
        win.__CYPRESS_AUTH_USER__ = user;
      },
    });

    // Wait for page to load
    cy.get("body", { timeout: 10000 }).should("be.visible");

    // Check if we got redirected to login (auth failed)
    cy.url().should("not.include", "/login");
    cy.url().should("include", url === "/" ? Cypress.config("baseUrl") : url);

    cy.log("✅ Page loaded with auth");
  });
});

/**
 * Create task via API (simplified)
 */
Cypress.Commands.add("createTask", (taskData = {}) => {
  const token = Cypress.env("authToken");

  if (!token) {
    throw new Error("No auth token. Call setupAuth or loginViaApi first.");
  }

  const defaultTask = {
    title: "Test Task " + Date.now(),
    description: "Created by Cypress test",
    priority: "Medium",
    ...taskData,
  };

  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/tasks`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: defaultTask,
      timeout: 10000,
    })
    .then((response) => {
      if (response.status !== 201) {
        throw new Error(
          `Task creation failed: ${response.body?.message || "Unknown error"}`
        );
      }
      cy.log(`✅ Task created: ${defaultTask.title}`);
      return response.body.task || response.body;
    });
});

/**
 * Create tag via API (simplified)
 */
Cypress.Commands.add("createTag", (tagName = "Test Tag") => {
  const token = Cypress.env("authToken");

  if (!token) {
    throw new Error("No auth token. Call setupAuth or loginViaApi first.");
  }

  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/tags`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: { name: tagName },
      timeout: 10000,
    })
    .then((response) => {
      if (response.status !== 201) {
        throw new Error(
          `Tag creation failed: ${response.body?.message || "Unknown error"}`
        );
      }
      cy.log(`✅ Tag created: ${tagName}`);
      return response.body.tag || response.body;
    });
});

/**
 * Clear all tasks
 */
Cypress.Commands.add("clearTasks", () => {
  const token = Cypress.env("authToken");

  if (!token) {
    cy.log("⚠️ No auth token, skipping task cleanup");
    return;
  }

  return cy
    .request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/tasks`,
      headers: { Authorization: `Bearer ${token}` },
      timeout: 10000,
    })
    .then((response) => {
      if (response.body.tasks && response.body.tasks.length > 0) {
        cy.log(`Clearing ${response.body.tasks.length} tasks...`);
        response.body.tasks.forEach((task) => {
          cy.request({
            method: "DELETE",
            url: `${Cypress.env("apiUrl")}/tasks/${task._id}`,
            headers: { Authorization: `Bearer ${token}` },
            failOnStatusCode: false,
          });
        });
        cy.log("✅ All tasks cleared");
      }
    });
});

/**
 * Clear all tags
 */
Cypress.Commands.add("clearTags", () => {
  const token = Cypress.env("authToken");

  if (!token) {
    cy.log("⚠️ No auth token, skipping tag cleanup");
    return;
  }

  return cy
    .request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/tags`,
      headers: { Authorization: `Bearer ${token}` },
      timeout: 10000,
    })
    .then((response) => {
      if (response.body.tags && response.body.tags.length > 0) {
        cy.log(`Clearing ${response.body.tags.length} tags...`);
        response.body.tags.forEach((tag) => {
          cy.request({
            method: "DELETE",
            url: `${Cypress.env("apiUrl")}/tags/${tag._id}`,
            headers: { Authorization: `Bearer ${token}` },
            failOnStatusCode: false,
          });
        });
        cy.log("✅ All tags cleared");
      }
    });
});

/**
 * Wait for toast notification
 */
Cypress.Commands.add("waitForToast", (message = null, type = "success") => {
  // Try different toast selectors
  const toastSelectors = [
    '[data-testid="toast"]',
    ".Toastify__toast",
    ".toast",
    ".notification",
    '[role="alert"]',
    ".MuiAlert-root",
  ];

  const selector = toastSelectors.map((s) => `${s}:visible`).join(", ");

  cy.get(selector, { timeout: 5000 }).should("be.visible");

  if (message) {
    cy.contains(message).should("be.visible");
  }
});

/**
 * Logout - clear auth data
 */
Cypress.Commands.add("logout", () => {
  cy.window().then((win) => {
    win.localStorage.removeItem("token");
    win.localStorage.removeItem("user");
    delete win.__CYPRESS_AUTH_TOKEN__;
    delete win.__CYPRESS_AUTH_USER__;
  });

  Cypress.env("authToken", null);
  Cypress.env("authUser", null);

  cy.log("✅ Logged out");
});

// ***********************************************
// Overwrite default visit to include auth check
// ***********************************************
Cypress.Commands.overwrite("visit", (originalFn, url, options) => {
  // If visiting a protected route, ensure we have auth
  const protectedRoutes = ["/dashboard", "/tasks", "/tags", "/profile"];
  const isProtected = protectedRoutes.some((route) => url.includes(route));

  if (isProtected) {
    cy.log(`Protected route detected: ${url}`);

    // Check if we have a token
    return cy.window().then((win) => {
      const token =
        win.localStorage.getItem("token") || Cypress.env("authToken");

      if (!token) {
        cy.log("No token found, setting up auth...");
        return cy.setupAuth().then(({ token, user }) => {
          const finalOptions = {
            ...options,
            onBeforeLoad: (win) => {
              win.localStorage.setItem("token", token);
              win.localStorage.setItem("user", JSON.stringify(user));
              if (options && options.onBeforeLoad) {
                options.onBeforeLoad(win);
              }
            },
          };
          return originalFn(url, finalOptions);
        });
      }

      // We have a token, proceed with normal visit
      return originalFn(url, options);
    });
  }

  // Not a protected route, proceed normally
  return originalFn(url, options);
});
