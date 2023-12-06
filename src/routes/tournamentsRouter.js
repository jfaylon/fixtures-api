const express = require("express");
const moment = require("moment");
const tournamentsService = require("../services/tournamentsService");
const {
  isOptionalPositiveNumber,
  convertStringToBoolean,
  isBoolean,
  isOptionalPositiveInteger,
} = require("../utils/utils");

const router = express.Router();

router.get("/:tournamentId/fixtures", async (req, res, next) => {
  const { tournamentId } = req.params;
  const { date, limit = 10, offset = 0, previous = false } = req.query;
  try {
    // check date
    const errors = [];
    if (date) {
      const isValidDate = moment(date, "YYYY-MM-DD", true).isValid();
      if (!isValidDate) {
        errors.push("Invalid Date");
      }
    }
    // check previous
    const previousBoolean = convertStringToBoolean(previous);
    if (!isBoolean(previousBoolean)) {
      errors.push("Invalid Previous");
    }
    if (errors.length > 0) {
      return res.json(400, {
        code: -1,
        message: errors.join(", "),
      });
    }

    const queryDate = date ? moment(date) : undefined;
    const results = await tournamentsService.getTournamentFixtures({
      tournamentId,
      date: queryDate,
      limit: Number(limit),
      offset: Number(offset),
      getPrevious: previousBoolean,
    });
    console.log(results);
    return res.json(200, {
      code: 0,
      data: results,
    });
  } catch (error) {
    console.log(error);
    return res.json(500, {
      code: -2,
      message: error.message,
    });
  }
});

router.get("/:tournamentId/calendar", async (req, res, next) => {
  const { month, year } = req.query;
  const { tournamentId } = req.params;
  try {
    let processedMonth = month;
    let processedYear = year;

    if (processedMonth && !processedYear) {
      return res.json(400, {
        code: -1,
        message: "month must be accompanied by year",
      });
    }
    const errors = [];
    if (processedYear) {
      if (processedMonth) {
        processedMonth = Number(processedMonth);
        if (!isOptionalPositiveInteger(processedMonth)) {
          errors.push("Invalid month");
        } else {
          processedMonth = moment().month(processedMonth).month();
        }
      }
      processedYear = Number(processedYear);
      if (!isOptionalPositiveInteger(processedYear)) {
        errors.push("Invalid year");
      } else {
        processedYear = moment().year(processedYear).year();
      }
    }
    if (errors.length > 0) {
      return res.json(400, {
        code: -1,
        message: errors.join(", "),
      });
    }

    const calendarResults =
      await tournamentsService.getTournamentFixturesCalendar({
        tournamentId,
        month: processedMonth,
        year: processedYear,
      });
    return res.json(200, {
      code: 0,
      data: calendarResults,
    });
  } catch (error) {
    console.log(error);
    return res.json(500, {
      code: -2,
      message: error.message,
    });
  }
});

module.exports = router;
