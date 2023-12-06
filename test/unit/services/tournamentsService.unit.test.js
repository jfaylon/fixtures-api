const moment = require("moment");
const tournamentService = require("../../../src/services/tournamentsService");
const Fixture = require("../../../src/models/Fixture");

describe("#tournamentService", () => {
  describe("#getTournamentFixtures", () => {
    afterEach(async () => {
      await jest.restoreAllMocks();
    });
    it("should call Fixture.findAll without matchDateTime", async () => {
      const fixtureSpy = jest.spyOn(Fixture, "findAll").mockResolvedValue([]);
      await tournamentService.getTournamentFixtures({
        tournamentId: 1,
      });
      expect(fixtureSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            tournamentId: 1,
          },
        })
      );
    });
    it("should call Fixture.findAll with matchDateTime", async () => {
      const fixtureSpy = jest.spyOn(Fixture, "findAll").mockResolvedValue([]);
      await tournamentService.getTournamentFixtures({
        tournamentId: 1,
        date: moment("2023-01-01"),
      });
      expect(fixtureSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            tournamentId: 1,
            matchDateTime: expect.any(Object),
          },
        })
      );
      expect(fixtureSpy.mock.calls[0][0].where.matchDateTime).toBeDefined();
    });
    it("should call Fixture.findAll with matchDateTime and order due to getPrevious", async () => {
      const fixtureSpy = jest.spyOn(Fixture, "findAll").mockResolvedValue([]);
      await tournamentService.getTournamentFixtures({
        tournamentId: 1,
        date: moment("2023-01-01"),
        getPrevious: true,
      });
      expect(fixtureSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            tournamentId: 1,
            matchDateTime: expect.any(Object),
          },
          order: [["matchDateTime", "DESC"]],
        })
      );
      expect(fixtureSpy.mock.calls[0][0].where.matchDateTime).toBeDefined();
      expect(fixtureSpy.mock.calls[0][0].order).toBeDefined();
    });
    it("should throw an error", async () => {
      jest
        .spyOn(Fixture, "findAll")
        .mockRejectedValue(new Error("test message"));
      expect.assertions(1);
      try {
        await tournamentService.getTournamentFixtures({
          tournamentId: 1,
        });
      } catch (error) {
        expect(error.message).toEqual("test message");
      }
    });
  });
  describe("#getTournamentFixturesCalendar", () => {
    afterEach(async () => {
      await jest.restoreAllMocks();
    });
    it("should call Fixtures.findAll without matchDateTime in where", async () => {
      const fixtureSpy = jest.spyOn(Fixture, "findAll").mockResolvedValue([
        {
          date: "2023-01-01",
        },
      ]);
      const result = await tournamentService.getTournamentFixturesCalendar({
        tournamentId: 1,
      });
      expect(result.length).toEqual(1);
      expect(fixtureSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            tournamentId: 1,
          },
        })
      );
      expect(fixtureSpy.mock.calls[0][0].where.matchDateTime).not.toBeDefined();
    });
    it("should call Fixtures.findAll with matchDateTime", async () => {
      const fixtureSpy = jest.spyOn(Fixture, "findAll").mockResolvedValue([]);
      await tournamentService.getTournamentFixturesCalendar({
        tournamentId: 1,
        year: 2023,
        month: 0,
      });
      expect(fixtureSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            tournamentId: 1,
            matchDateTime: expect.any(Object),
          },
        })
      );
      expect(fixtureSpy.mock.calls[0][0].where.matchDateTime).toBeDefined();
    });
    it("should call Fixtures.findAll with matchDateTime even if month is not provided", async () => {
      const fixtureSpy = jest.spyOn(Fixture, "findAll").mockResolvedValue([]);
      await tournamentService.getTournamentFixturesCalendar({
        tournamentId: 1,
        year: 2023,
      });
      expect(fixtureSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            tournamentId: 1,
            matchDateTime: expect.any(Object),
          },
        })
      );
      expect(fixtureSpy.mock.calls[0][0].where.matchDateTime).toBeDefined();
    });
    it("should throw an error due issues in Fixture.findAll", async () => {
      jest
        .spyOn(Fixture, "findAll")
        .mockRejectedValue(new Error("test message"));
      expect.assertions(1);
      try {
        await tournamentService.getTournamentFixturesCalendar({
          tournamentId: 1,
          year: 2023,
        });
      } catch (error) {
        expect(error.message).toEqual("test message");
      }
    });
  });
});
