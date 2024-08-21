const { bulkCreate, getUserList } = require("../../src/services/user.service");
const logger = require("../../src/utils/logs");

const users = [
  {
    name: "Huseyin Emre Uslu",
    email: "huseyinemreuslu@example.com",
    password: "password123",
    balance: 1500.0,
    roles: ["user"],
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "password123",
    balance: 1500.0,
    roles: ["user"],
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "adminpass",
    balance: 1500.0,
    roles: ["admin"],
  },
];

async function createMockUsers() {
  try {
    await bulkCreate(users);
    logger.info("Mock users are created");
  } catch (error) {
    logger.error({
      message: "An error occured when mock users are created; ",
      error,
    });
  }
}

module.exports = createMockUsers;
