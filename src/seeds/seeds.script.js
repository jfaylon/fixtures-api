const moment = require("moment");
const Fixture = require("../models/Fixture");
const Team = require("../models/Team");
const Tournament = require("../models/Tournament");

// this file is only for testing purposes and populating the fixtures
// actual data may vary
const createTeams = async () => {
  const result = await Team.bulkCreate([
    {
      name: "Team 1",
    },
    {
      name: "Team 2",
    },
    {
      name: "Team 3",
    },
    {
      name: "Team 4",
    },
  ], { returning: true, raw: true });
  return result;
};

const createTournaments = async () => {
  const result = await Tournament.bulkCreate(
    [
      {
        name: "Tournament 1",
      },
      {
        name: "Tournament 2",
      },
    ],
    { returning: true, raw: true }
  );
  return result;
};

const createTestFixtures = async () => {
  const teams = await createTeams();
  const tournaments = await createTournaments();
  // generate home and away matches
  const matches = [];
  for (let i = 0; i < teams.length - 1; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const firstTeam = teams[i];
      const secondTeam = teams[j];

      matches.push({ home: firstTeam, away: secondTeam });
      matches.push({ home: secondTeam, away: firstTeam });
    }
  }
  const tournamentStartDates = [moment("2023-01-01"), moment("2023-07-01")];
  const tournamentFrequencies = [7, 10];
  const fixtures = [];
  for (let i = 0; i < tournaments.length; i++) {
    const tournamentStartDate = tournamentStartDates[i];
    const tournamentFrequency = tournamentFrequencies[i];
    for (let j = 0; j < matches.length; j++) {
      const fixture = {
        tournamentId: tournaments[i].id,
        homeTeamId: matches[j].home.id,
        awayTeamId: matches[j].away.id,
        matchDateTime: moment(tournamentStartDate.add(tournamentFrequency, "days")),
      };
      fixtures.push(fixture);
    }
  }
  const result = await Fixture.bulkCreate(fixtures);
  return result;
};

module.exports = {
  createTestFixtures,
};
