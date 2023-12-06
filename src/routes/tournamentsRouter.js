const express = require("express");
const moment = require("moment");
const {
  getTournamentFixturesCalendar,
  getTournamentFixtures,
} = require("../services/tournamentsService");
const {
  isOptionalPositiveNumber,
  convertStringToBoolean,
  isBoolean,
  isOptionalPositiveInteger,
} = require("../utils/utils");

const router = express.Router();


/**
 * Get Tournament Fixtures
 * {
  "swagger": "2.0",
  "paths": {
    "/{tournamentId}/fixtures": {
      "get": {
        "summary": "Get tournament fixtures",
        "description": "Retrieve fixtures for a specific tournament, optionally filtered by date, with pagination support.",
        "parameters": [
          {
            "in": "path",
            "name": "tournamentId",
            "schema": {
              "type": "string"
            },
            "required": true,
            "description": "The ID of the tournament."
          },
          {
            "in": "query",
            "name": "date",
            "schema": {
              "type": "string",
              "format": "date"
            },
            "required": false,
            "description": "The date for which fixtures are requested. (format: YYYY-MM-DD)"
          },
          {
            "in": "query",
            "name": "limit",
            "schema": {
              "type": "integer",
              "format": "int32"
            },
            "required": false,
            "description": "The maximum number of fixtures to return. (default: 10)"
          },
          {
            "in": "query",
            "name": "offset",
            "schema": {
              "type": "integer",
              "format": "int32"
            },
            "required": false,
            "description": "The number of fixtures to skip for pagination. (default: 0)"
          },
          {
            "in": "query",
            "name": "previous",
            "schema": {
              "type": "boolean"
            },
            "required": false,
            "description": "If true, retrieve previous fixtures; if false, retrieve upcoming fixtures (default: false)."
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response with tournament fixtures data",
            "content": {
              "application/json": {
                "example": {
                  "code": 0,
                  "data": [
                    {
                      "id": 13,
                      "tournamentId": 2,
                      "homeTeamId": 1,
                      "awayTeamId": 2,
                      "matchDateTime": "2023-07-10T16:00:00.000Z",
                      "matchStatus": "Not Started",
                      "homeTeamScore": 0,
                      "awayTeamScore": 0,
                      "homeTeamPenaltyScore": null,
                      "awayTeamPenaltyScore": null,
                      "createdAt": "2023-12-04T17:10:25.000Z",
                      "updatedAt": "2023-12-04T17:10:25.000Z",
                      "Tournament": {
                        "name": "Tournament 2"
                      },
                      "homeTeam": {
                        "name": "Team 1",
                        "logoImageLink": null
                      },
                      "awayTeam": {
                        "name": "Team 2",
                        "logoImageLink": null
                      }
                    }
                  ]
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "application/json": {
                "example": {
                  "code": -1,
                  "message": "An error occurred."
                }
              }
            }
          }
        }
      }
    }
  }
}

 */
router.get("/:tournamentId/fixtures", async (req, res, next) => {
  const { tournamentId } = req.params;
  const { date, limit = 10, offset = 0, previous = false } = req.query;
  try {
    // check date
    if (date) {
      const isValidDate = moment(date, "YYYY-MM-DD", true).isValid();
      if (!isValidDate) {
        throw new Error("Invalid Date");
      }
    }
    // check previous
    const previousBoolean = convertStringToBoolean(previous);
    if (!isBoolean(previousBoolean)) {
      throw new Error("Invalid Previous");
    }

    const queryDate = date ? moment(date) : undefined;
    const results = await getTournamentFixtures({
      tournamentId,
      date: queryDate,
      limit: Number(limit),
      offset: Number(offset),
      getPrevious: previousBoolean,
    });
    return res.json(200, {
      code: 0,
      data: results,
    });
  } catch (error) {
    console.log(error);
    return res.json(500, {
      code: -1,
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
      throw new Error("month must be accompanied by year");
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
      throw new Error(errors.join(", "));
    }

    const calendarResults = await getTournamentFixturesCalendar({
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
      code: -1,
      message: error.message,
    });
  }
});

module.exports = router;
