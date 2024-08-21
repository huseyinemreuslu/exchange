const { bulkCreatePortfolio } = require("../../src/services/portfolio.service");
const { getUserList } = require("../../src/services/user.service");
const logger = require("../../src/utils/logs");

async function createMockUserPorfolios() {
  try {
    const userList = await getUserList();
    const userPortfolios = userList.map((user) => {
      return { userId: user.id };
    });

    await bulkCreatePortfolio(userPortfolios);
    logger.info("Mock user portfolios are created");
  } catch (error) {
    logger.error({
      message: "An error occured when mock user portfolios are created; ",
      error,
    });
  }
}

module.exports = createMockUserPorfolios;
