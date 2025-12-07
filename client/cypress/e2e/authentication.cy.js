/**
 * Authentication E2E Tests
 * Tests for user registration, login, logout, and protected routes
 */

import LoginPage from "../support/page-objects/LoginPage";
import RegisterPage from "../support/page-objects/RegisterPage";

describe("Authentication Tests", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
  });

  describe("User Registration", () => {
    it("UI-TC-001: Should register user with valid data", () => {
      const timestamp = Date.now();
      const email = `testuser${timestamp}@example.com`;

      RegisterPage.visit();
      RegisterPage.register("John Doe", email, "password123", "password123");
      RegisterPage.verifyRegistrationSuccess();
    });

    it("UI-TC-002: Should show error for invalid email format", () => {
      RegisterPage.visit();
      RegisterPage.fillName("John Doe");
      RegisterPage.fillEmail("invalid-email");
      RegisterPage.fillPassword("password123");
      RegisterPage.fillConfirmPassword("password123");
      RegisterPage.clickRegister();

      RegisterPage.verifyErrorMessage("valid email");
    });

    it("UI-TC-003: Should show error for password mismatch", () => {
      RegisterPage.visit();
      RegisterPage.fillName("John Doe");
      RegisterPage.fillEmail("test@example.com");
      RegisterPage.fillPassword("password123");
      RegisterPage.fillConfirmPassword("password456");
      RegisterPage.clickRegister();

      RegisterPage.verifyErrorMessage("Passwords do not match");
    });

    it("UI-TC-004: Should show error for duplicate email", () => {
      // First, register a user
      const timestamp = Date.now();
      const email = `duplicate${timestamp}@example.com`;

      cy.register("First User", email, "password123");

      // Try to register again with same email
      RegisterPage.visit();
      RegisterPage.register("Second User", email, "password123", "password123");

      cy.waitForToast("An account with this email already exists", "error");
    });
  });

  describe("User Login", () => {
    beforeEach(() => {
      // Create a test user before login tests
      const timestamp = Date.now();
      const email = `logintest${timestamp}@example.com`;
      cy.register("Login Test User", email, "password123");
    });

    it("UI-TC-005: Should login with valid credentials", () => {
      const timestamp = Date.now();
      const email = `logintest${timestamp}@example.com`;

      cy.register("Login User", email, "password123");

      LoginPage.visit();
      LoginPage.login(email, "password123");
      LoginPage.verifyLoginSuccess();
    });

    it("UI-TC-006: Should show error for invalid email", () => {
      LoginPage.visit();
      LoginPage.login("nonexistent@example.com", "password123");

      cy.waitForToast("Invalid email or password", "error");
      cy.url().should("include", "/login");
    });

    it("UI-TC-007: Should show error for invalid password", () => {
      const timestamp = Date.now();
      const email = `wrongpass${timestamp}@example.com`;

      cy.register("Wrong Pass User", email, "password123");

      LoginPage.visit();
      LoginPage.login(email, "wrongpassword");

      cy.waitForToast("Invalid email or password", "error");
      cy.url().should("include", "/login");
    });

    it("Should validate email format on login", () => {
      LoginPage.visit();
      LoginPage.fillEmail("invalid-email");
      LoginPage.fillPassword("password123");
      LoginPage.clickLogin();

      LoginPage.verifyErrorMessage("valid email");
    });

    it("Should validate password length on login", () => {
      LoginPage.visit();
      LoginPage.fillEmail("test@example.com");
      LoginPage.fillPassword("123");
      LoginPage.clickLogin();

      LoginPage.verifyErrorMessage("at least 6 characters");
    });
  });

  describe("User Logout", () => {
    beforeEach(() => {
      cy.login();
      cy.visit("/dashboard");
    });

    it("UI-TC-008: Should logout user successfully", () => {
      // Find and click logout button
      cy.contains("button", "Logout")
        .or(cy.get('[data-testid="logout"]'))
        .click();

      // Verify redirect to login
      cy.url().should("include", "/login");

      // Verify token is removed
      cy.window().then((win) => {
        expect(win.localStorage.getItem("token")).to.be.null;
      });
    });
  });

  describe("Protected Routes", () => {
    it("UI-TC-009: Should redirect to login when accessing protected route without authentication", () => {
      cy.clearLocalStorage();
      cy.visit("/dashboard");

      // Should redirect to login
      cy.url().should("include", "/login");
    });

    it("Should allow access to protected routes when authenticated", () => {
      cy.login();
      cy.visit("/tasks");

      cy.url().should("include", "/tasks");
      cy.contains("Tasks").should("be.visible");
    });

    it("Should redirect to intended page after login", () => {
      cy.clearLocalStorage();
      cy.visit("/tasks");

      // Should redirect to login
      cy.url().should("include", "/login");

      // Login
      const timestamp = Date.now();
      const email = `redirect${timestamp}@example.com`;
      cy.register("Redirect User", email, "password123");

      LoginPage.visit();
      LoginPage.login(email, "password123");

      // Should redirect to intended page (tasks) or dashboard
      cy.url().should("satisfy", (url) => {
        return url.includes("/tasks") || url.includes("/dashboard");
      });
    });
  });

  describe("Navigation", () => {
    beforeEach(() => {
      cy.login();
    });

    it("Should navigate between login and register pages", () => {
      LoginPage.visit();
      LoginPage.clickRegisterLink();
      cy.url().should("include", "/register");

      RegisterPage.clickLoginLink();
      cy.url().should("include", "/login");
    });
  });
});
