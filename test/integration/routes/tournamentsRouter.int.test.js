const request = require("supertest");
const app = require("../../../src/app");
const tournamentsService = require("../../../src/services/tournamentsService");
describe("#TournamentsRouter", () => {
  afterEach(async () => {
    jest.restoreAllMocks();
  });

  describe("GET /api/tournaments", () => {
    it("should return a list of tournaments based on the test data", async () => {
      await request(app)
        .get("/api/tournaments")
        .expect(200)
        .then((response) => {
          expect(response.body.code).toEqual(0);
          expect(response.body.data.length > 0).toEqual(true);
        });
    });
    it("should return a bad request due to invalid limit", async () => {
      await request(app)
        .get("/api/tournaments?limit=a")
        .expect(400)
        .then((response) => {
          expect(response.body.code).toEqual(-1);
          expect(response.body.message).toEqual("Invalid limit");
        });
    });
    it("should return a bad request due to invalid offset", async () => {
      await request(app)
        .get("/api/tournaments?offset=a")
        .expect(400)
        .then((response) => {
          expect(response.body.code).toEqual(-1);
          expect(response.body.message).toEqual("Invalid offset");
        });
    });
    it("should return a bad request due to invalid limit and offset", async () => {
      await request(app)
        .get("/api/tournaments?limit=a&offset=a")
        .expect(400)
        .then((response) => {
          expect(response.body.code).toEqual(-1);
          expect(response.body.message).toEqual("Invalid limit, Invalid offset");
        });
    });
    it("should return a 500 error due to unexpected error in service", async () => {
      jest
        .spyOn(tournamentsService, "getTournaments")
        .mockRejectedValue(new Error("test message"));

      await request(app)
        .get("/api/tournaments")
        .expect(500)
        .then((response) => {
          expect(tournamentsService.getTournaments).toHaveBeenCalled();
          expect(response.body.code).toEqual(-2);
          expect(response.body.message).toEqual("test message");
        });
    });
  });
  describe("GET /api/tournaments/:tournamentId/fixtures", () => {
    it("should return a list of fixtures based on the test fixtures", async () => {
      await request(app)
        .get("/api/tournaments/1/fixtures")
        .expect(200)
        .then((response) => {
          expect(response.body.code).toEqual(0);
          expect(response.body.data.length > 0).toEqual(true);
        });
    });
    it("should return empty due to no fixtures found based on tournamentId", async () => {
      await request(app)
        .get("/api/tournaments/0/fixtures")
        .expect(200)
        .then((response) => {
          expect(response.body.code).toEqual(0);
          expect(response.body.data.length === 0).toEqual(true);
        });
    });
    it("should return a list with using a valid date based on the test fixtures", async () => {
      await request(app)
        .get("/api/tournaments/1/fixtures?date=2023-01-01")
        .expect(200)
        .then((response) => {
          expect(response.body.code).toEqual(0);
          expect(response.body.data.length > 0).toEqual(true);
        });
    });
    it("should return Invalid Date", async () => {
      await request(app)
        .get("/api/tournaments/0/fixtures?date=xxx")
        .expect(400)
        .then((response) => {
          expect(response.body.code).toEqual(-1);
          expect(response.body.message).toEqual("Invalid Date");
        });
    });
    it("should return Invalid Previous", async () => {
      await request(app)
        .get("/api/tournaments/0/fixtures?previous=test")
        .expect(400)
        .then((response) => {
          expect(response.body.code).toEqual(-1);
          expect(response.body.message).toEqual("Invalid Previous");
        });
    });
    it("should return Invalid limit", async () => {
      await request(app)
        .get("/api/tournaments/0/fixtures?limit=a")
        .expect(400)
        .then((response) => {
          expect(response.body.code).toEqual(-1);
          expect(response.body.message).toEqual("Invalid limit");
        });
    });
    it("should return Invalid offset", async () => {
      await request(app)
        .get("/api/tournaments/0/fixtures?offset=a")
        .expect(400)
        .then((response) => {
          expect(response.body.code).toEqual(-1);
          expect(response.body.message).toEqual("Invalid offset");
        });
    });
    it("should return a 500 error due to unexpected error in service", async () => {
      jest
        .spyOn(tournamentsService, "getTournamentFixtures")
        .mockRejectedValue(new Error("test message"));

      await request(app)
        .get("/api/tournaments/a/fixtures")
        .expect(500)
        .then((response) => {
          expect(tournamentsService.getTournamentFixtures).toHaveBeenCalled();
          expect(response.body.code).toEqual(-2);
          expect(response.body.message).toEqual("test message");
        });
    });
  });
  describe("GET /api/tournaments/:tournamentId/calendar", () => {
    it("should return a list of dates given the test fixtures", async () => {
      await request(app)
        .get("/api/tournaments/1/calendar")
        .expect(200)
        .then((response) => {
          expect(response.body.code).toEqual(0);
          expect(response.body.data.length > 0).toEqual(true);
        });
    });
    it("should return a bad request for only providing month in query parameters", async () => {
      await request(app)
        .get("/api/tournaments/1/calendar?month=1")
        .expect(400)
        .then((response) => {
          expect(response.body.code).toEqual(-1);
          expect(response.body.message).toEqual(
            "month must be accompanied by year"
          );
        });
    });
    it("should return a bad request for providing invalid month and yearin query parameters", async () => {
      await request(app)
        .get("/api/tournaments/1/calendar?month=a&year=a")
        .expect(400)
        .then((response) => {
          expect(response.body.code).toEqual(-1);
          expect(response.body.message).toEqual("Invalid month, Invalid year");
        });
    });
    it("should return a list given the month and year", async () => {
      await request(app)
        .get("/api/tournaments/1/calendar?month=1&year=2023")
        .expect(200)
        .then((response) => {
          expect(response.body.code).toEqual(0);
          expect(response.body.data.length > 0).toEqual(true);
        });
    });
    it("should return a list given only year", async () => {
      await request(app)
        .get("/api/tournaments/1/calendar?year=2023")
        .expect(200)
        .then((response) => {
          expect(response.body.code).toEqual(0);
          expect(response.body.data.length > 0).toEqual(true);
        });
    });
    it("should return a 500 error due to unexpected error", async () => {
      jest
        .spyOn(tournamentsService, "getTournamentFixturesCalendar")
        .mockRejectedValue(new Error("test message"));
      await request(app)
        .get("/api/tournaments/1/calendar")
        .expect(500)
        .then((response) => {
          expect(response.body.code).toEqual(-2);
          expect(response.body.message).toEqual("test message");
        });
    });
  });
});
