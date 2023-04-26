import BusdriverService from "../src/BusdriverService";

describe("BusdriverService class", () => {
  describe("creates new busdrivers", () => {
    let mockProperties;
    let testBusdriverService;

    beforeEach(() => {
      mockProperties = {
        allRoutes: [
          [7, 2, 6, 8],
          [6, 2, 7, 3],
          [2, 8, 2, 1],
        ],
      };
      testBusdriverService = new BusdriverService(mockProperties);
      testBusdriverService.busdriverFactory();
    });    

    it("should create busdriver instances based on a collection of routes through the busdriverFactory method", () => {

      let allDrivers = testBusdriverService.allDrivers;

      expect(allDrivers[0].route).toEqual(mockProperties.allRoutes[0]);
    });

    it("has the method allDriveToNextStation() which moves all drivers to the next station.", () => {

      let allDrivers = testBusdriverService.allDrivers;
      testBusdriverService.allDriveToNextStation();

      let sampleDriverStation = allDrivers[2].getCurrentStation();

      expect(sampleDriverStation).toEqual(mockProperties.allRoutes[2][1]);
    });

    it("has the calculateNumberOfDriversAtStation() which creates an array where the index is the number of the station and the value is the sum of the drivers that are currently there.", () => {
      
      testBusdriverService.allDriveToNextStation();
      testBusdriverService.calculateNumberOfDriversAtStation();

      let stationOverview = testBusdriverService.numberOfDriversAtStation;

      expect(stationOverview[2]).toEqual(2);
    });

    it("has the exchangeGossipIsPossibleAtStations() method which creates an array where the index is the number of the station and the value is true if more then one driver is there.", () => {
      
      testBusdriverService.allDriveToNextStation();
      testBusdriverService.calculateNumberOfDriversAtStation();
      testBusdriverService.exchangeGossipIsPossibleAtStations();

      let possibleAtStation =
        testBusdriverService.stationHasMultipleDriversArray;

      expect(possibleAtStation[2]).toEqual(true);
    });

    it("triggers the creation of GossipExhangeStation instances for each station with more than one driver.", () => {
      
      testBusdriverService.allDriveToNextStation();
      testBusdriverService.calculateNumberOfDriversAtStation();
      testBusdriverService.exchangeGossipIsPossibleAtStations();
      testBusdriverService.createStationsForGossipExhange();

      let stations = testBusdriverService.stations;

      expect(stations[0].busdriversAtStation[0].id).toBe(0);
    });

    it("should create an array with the drivers that know all gossips through the getFullGossipKnowledge method", () => {
      
      testBusdriverService.allDriveToNextStation();
      testBusdriverService.calculateNumberOfDriversAtStation();
      testBusdriverService.exchangeGossipIsPossibleAtStations();
      testBusdriverService.createStationsForGossipExhange();
      testBusdriverService.getDriversHaveFullGossipKnowledge();

      let gossipKnowledge = testBusdriverService.driversKnowAllGossips;

      expect(gossipKnowledge).toEqual([false, false, false]);
    });

    it("should check if all drivers know all gossips through the isGossipKnowledgeComplete method.", () => {
      
      testBusdriverService.driversKnowAllGossips = [true, true, true]

      let isComplete = testBusdriverService.isGossipKnowledgeComplete();

      expect(isComplete).toEqual(true);
    });
  });
});

