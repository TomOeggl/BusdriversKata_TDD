import BusdriverService from "../src/BusdriverService";

describe("BusdriverService class", () => {
  describe("creates new busdrivers", () => {
    it("should create busdriver instances based on a collection of routes through the busdriverFactory method", () => {
      // Arrange

      let mockProperties = {
        allRoutes: [
          [7, 2, 6, 8],
          [6, 2, 7, 3],
          [2, 8, 2, 1],
        ],
      };
      let testBusdriverService = new BusdriverService(mockProperties);

      // Act

      testBusdriverService.busdriverFactory();
      let allDrivers = testBusdriverService.allDrivers;

      // Assert

      expect(allDrivers[0].route).toEqual(mockProperties.allRoutes[0]);
    });

    it("has the method allDriveToNextStation() which moves all drivers to the next station.", () => {
      // Arrange

      let mockProperties = {
        allRoutes: [
          [7, 2, 6, 8],
          [6, 2, 7, 3],
          [2, 8, 2, 1],
        ],
      };
      let testBusdriverService = new BusdriverService(mockProperties);

      // Act

      testBusdriverService.busdriverFactory();
      let allDrivers = testBusdriverService.allDrivers;
      testBusdriverService.allDriveToNextStation();

      // Assert
      let sampleDriverStation = allDrivers[2].getCurrentStation();

      expect(sampleDriverStation).toEqual(mockProperties.allRoutes[2][1]);
    });

    it("has the calculateNumberOfDriversAtStation() which creates an array where the index is the number of the station and the value is the sum of the drivers that are currently there.", () => {
      // Arrange

      let mockProperties = {
        allRoutes: [
          [7, 2, 6, 8],
          [6, 2, 7, 3],
          [2, 8, 2, 1],
        ],
      };

      let testBusdriverService = new BusdriverService(mockProperties);

      // Act

      testBusdriverService.busdriverFactory();
      testBusdriverService.allDriveToNextStation();
      testBusdriverService.calculateNumberOfDriversAtStation();

      // Assert
      let stationOverview = testBusdriverService.numberOfDriversAtStation;

      expect(stationOverview[2]).toEqual(2);
    });

    it("has the exchangeGossipIsPossibleAtStations() method which creates an array where the index is the number of the station and the value is true if more then one driver is there.", () => {
      // Arrange

      let mockProperties = {
        allRoutes: [
          [7, 2, 6, 8],
          [6, 2, 7, 3],
          [2, 8, 2, 1],
        ],
      };

      let testBusdriverService = new BusdriverService(mockProperties);

      // Act

      testBusdriverService.busdriverFactory();
      testBusdriverService.allDriveToNextStation();
      testBusdriverService.calculateNumberOfDriversAtStation();
      testBusdriverService.exchangeGossipIsPossibleAtStations();


      // Assert
      let possibleAtStation = testBusdriverService.stationHasMultipleDriversArray;


      expect(possibleAtStation[2]).toEqual(true);
    });
  });
});

//allDriveToNextStop

//allDrivers getCurrentStation return int


// array =[true, false]
// createExchangeGossipStations(array)

// nextStep()


//[1, , 1, , 3, 2 ] ==> map(if value > 1) => create new Station()
//station.sumUpGossip ==> all Drivers pass Gossip to station
//==> get summedUpStationGossipArray in return


// stationHasMultipleDriversArray[x] = true ==> triggers creation of new GossipExchangeStation
// GossipExchangeStation.sumUpGossipsAtStations ==> collects gossips of all drivers into a single bool array  
// ==> if targetArray[gossip/driverIndex] != true while driverArray[gossip/driverIndex] = true ==> pass over
// GossipExchangeStation.updateDriverGossip ==> passes it to each driver

//repeat