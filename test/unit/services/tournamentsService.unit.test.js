const tournamentService = require("../../../src/services/tournamentsService");
const Team = require("../../../src/models/Team");
const Tournament = require("../../../src/models/Tournament");
const Fixture = require("../../../src/models/Fixture");

describe("#tournamentService", () => {
  describe("#getTournamentFixturesCalendar", () => {
    beforeAll(async () => {
      await Team.sync({ force: true });
      await Tournament.sync({ force: true });
      await Fixture.sync({ force: true });
      await createTestFixtures();
    });
    afterAll(async () => {
      await Team.sync({ force: true });
      await Tournament.sync({ force: true });
      await Fixture.sync({ force: true });
      jest.restoreAllMocks();
    });
  });
});
