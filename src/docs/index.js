const fixtureModelSwagger = require("./models/Fixture.json");
const teamModelSwagger = require("./models/Team.json")
const tournamentModelSwagger = require("./models/Tournament.json")

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
      ...teamModelSwagger,
      ...tournamentModelSwagger,
      ...fixtureModelSwagger
    },
  },
  paths: {
    ...tournamentsRouterSwagger,
  },
};
