import Busdriver from "../src/Busdriver";

describe("Busdriver class", () => {
  describe("has a route (of stations), an id and one gossip to start ", () => {
    it("should return an array of bools which represent the gossip the bus driver knows through the getGossip array method.", () => {
      // Arrage

      let testDriver = new Busdriver({ id: 1 });

      // Act
      testDriver.gossipArray = [false, true];
      const gossipArray = testDriver.getGossipArray();
      // Assert

      expect(gossipArray[1]).toBe(true);
    });

    it("should take the id as index for the gossip array and set that array element true to give each driver a unique gossip through the initialize method.", () => {
      // Arrage
      let testId = 2;
      let testDriver = new Busdriver({ id: testId });

      // Act
      testDriver.initialize();
      const gossipArray = testDriver.gossipArray;
      console.log(gossipArray);
      // Assert
      expect(gossipArray[testId]).toBe(true);
    });

    it("should increase currentRouteIndex by 1 when driveToNextStation() is called", () => {
      // Arrage
      let testDriver = new Busdriver({ id: 1 });
      testDriver.route = [1, 4, 3, 2];
      testDriver.currentRouteIndex = 2;

      // Act
      testDriver.driveToNextStation();
      let indexAfterDrive = testDriver.currentRouteIndex;

      // Assert
      expect(indexAfterDrive).toBe(3);
    });

    it("should start the route again from the beginning if the current stop is the last one when driveToNextStation() is called", () => {
      // Arrage
      let testDriver = new Busdriver({ id: 1 });
      testDriver.route = [1, 4, 3, 2];
      testDriver.currentRouteIndex = 3;

      // Act
      testDriver.driveToNextStation();
      let indexAfterDrive = testDriver.currentRouteIndex;

      // Assert
      expect(indexAfterDrive).toBe(0);
    });

    it("should return the driver's current station through the getCurrentStation() method", () => {
      // Arrage
      let testDriver = new Busdriver({ id: 1 });
      testDriver.route = [1, 4, 3, 2];
      testDriver.currentRouteIndex = 3;

      // Act
      let currentStation = testDriver.getCurrentStation();

      // Assert
      expect(currentStation).toBe(2);
    });
  });
});
