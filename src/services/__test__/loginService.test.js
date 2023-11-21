const loginService = require ("../LoginService.js")
const modelUser = require("../../models/UserMo.js")
const bcrypt = require("bcrypt")
// const jest = require("jest")

// Mock para modelUser.findOne
jest.mock("../models/UserMo", () => ({
  modelUser: {
    findOne: jest.fn(),
  },
}));

describe("LoginService", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("validateLog", () => {
    it("should return null if user is not found", async () => {
      // Arrange
      modelUser.findOne.mockResolvedValue(null);
      const loginService = new LoginService();

      // Act
      const result = await loginService.validateLog({
        email: "nonexistent@example.com",
        password: "password123",
      });

      // Assert
      expect(result).toBeNull();
    });

    it("should return null if user password is not set", async () => {
      // Arrange
      modelUser.findOne.mockResolvedValue({
        email: "userwithoutpassword@example.com",
      });
      const loginService = new LoginService();

      // Act
      const result = await loginService.validateLog({
        email: "userwithoutpassword@example.com",
        password: "password123",
      });

      // Assert
      expect(result).toBeNull();
    });

    it("should return user if email and password match", async () => {
      // Arrange
      const hashedPassword = await bcrypt.hash("password123", 10);
      const mockUser = {
        email: "existinguser@example.com",
        password: hashedPassword,
      };
      modelUser.findOne.mockResolvedValue(mockUser);
      const loginService = new LoginService();

      // Act
      const result = await loginService.validateLog({
        email: "existinguser@example.com",
        password: "password123",
      });

      // Assert
      expect(result).toEqual(mockUser);
    });

    it("should return null if password does not match", async () => {
      // Arrange
      const hashedPassword = await bcrypt.hash("password123", 10);
      const mockUser = {
        email: "existinguser@example.com",
        password: hashedPassword,
      };
      modelUser.findOne.mockResolvedValue(mockUser);
      const loginService = new LoginService();

      // Act
      const result = await loginService.validateLog({
        email: "existinguser@example.com",
        password: "wrongpassword",
      });

      // Assert
      expect(result).toBeNull();
    });
  });
});
