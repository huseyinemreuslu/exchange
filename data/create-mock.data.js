const createMockUserPorfolios = require("./seed/create-user-portfolio");
const createMockUsers = require("./seed/create-users");

createMockUsers().then(async () => {
  await createMockUserPorfolios();
});
