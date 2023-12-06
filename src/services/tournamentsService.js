const moment = require("moment");
const Fixture = require("../models/Fixture");
const Tournament = require("../models/Tournament");
const Team = require("../models/Team");
const { Sequelize, Op } = require("sequelize");
const { isPositiveOrZeroInteger } = require("../utils/utils");

const getTournamentFixtures = async ({
  tournamentId,
  date,
  limit = 10,
  offset = 0,
  getPrevious,
}) => {
  try {
    const query = {
      where: {
        tournamentId,
      },
      include: [
        {
          model: Tournament,
          attributes: ["name"],
        },
        {
          model: Team,
          as: "homeTeam",
          attributes: ["name", "logoImageLink"],
        },
        {
          model: Team,
          as: "awayTeam",
          attributes: ["name", "logoImageLink"],
        },
      ],
      limit,
      offset,
    };
    if (date) {
      if (getPrevious) {
        query.where.matchDateTime = {
          [Op.lte]: date.toDate(),
        };
        query.order = [["matchDateTime", "DESC"]];
      } else {
        query.where.matchDateTime = {
          [Op.gte]: date.toDate(),
        };
      }
    }
    const results = await Fixture.findAll(query);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTournamentFixturesCalendar = async ({ tournamentId, month, year }) => {
  let date;
  let startDate;
  let endDate;
  if (isPositiveOrZeroInteger(year) && isPositiveOrZeroInteger(month)) {
    date = moment({
      month,
      year,
    });
    startDate = date.startOf("month");
    endDate = moment(date).endOf("month");
  } else if (isPositiveOrZeroInteger(year)) {
    date = moment({
      year,
    });
    startDate = date.startOf("year");
    endDate = moment(date).endOf("year");
  }
  const query = {
    tournamentId,
  };
  if (startDate && endDate) {
    query.matchDateTime = {
      [Op.between]: [startDate.toDate(), endDate.toDate()],
    };
  }
  try {
    const results = await Fixture.findAll({
      attributes: [
        [
          Sequelize.fn(
            "date_format",
            Sequelize.col("matchDateTime"),
            "%Y-%m-%d"
          ),
          "date",
        ],
        [Sequelize.fn("count", Sequelize.col("*")), "count"],
      ],
      where: query,
      group: [
        Sequelize.fn("date_format", Sequelize.col("matchDateTime"), "%Y-%m-%d"),
      ],
      raw: true,
    });

    const uniqueDates = results.map((result) => result.date);
    return uniqueDates;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getTournamentFixtures,
  getTournamentFixturesCalendar,
};
