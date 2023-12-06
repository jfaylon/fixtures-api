const fixtureModelSwagger = require("./models/Fixture.json");
const tournamentsRouterSwagger = require("./routes/tournamentsRouter.json");

module.exports = {
  tags: [
    {
      name: "Tournament API",
      description: "API for retrieving tournament information",
    },
  ],
  components: {
    schemas: {
      ...fixtureModelSwagger
    },
  },
  paths: {
    ...tournamentsRouterSwagger,
  },
};
