import Busdriver from "../src/Busdriver";

describe("Busdriver class", () => {
  describe("has a route (of stations), an id and one gossip to start ", () => {
    let busdriverProperties;
    let testDriver;

    beforeEach(() => {
      busdriverProperties = {
        id: 1,
        route: [1, 4, 3, 2],
      };
      testDriver = new Busdriver(busdriverProperties);
    });

    it("should return an array of bools which represent the gossip the bus driver knows through the getGossip array method.", () => {
      testDriver.gossipArray = [false, true];
      const gossipArray = testDriver.getGossipArray();
    
      expect(gossipArray[1]).toBe(true);
    });

    it("should take the id as index for the gossip array and set that array element true to give each driver a unique gossip through the initialize method.", () => {
      const gossipArray = testDriver.gossipArray;
      
      expect(gossipArray[busdriverProperties.id]).toBe(true);
    });

    it("should increase currentRouteIndex by 1 when driveToNextStation() is called", () => {
      testDriver.currentRouteIndex = 2; 
      
      testDriver.driveToNextStation();
      let indexAfterDrive = testDriver.currentRouteIndex;

      expect(indexAfterDrive).toBe(3);
    });

    it("should start the route again from the beginning if the current stop is the last one when driveToNextStation() is called", () => {
      testDriver.currentRouteIndex = 3;

      testDriver.driveToNextStation();
      let indexAfterDrive = testDriver.currentRouteIndex;

      expect(indexAfterDrive).toBe(0);
    });

    it("should return the driver's current station through the getCurrentStation() method", () => {
      testDriver.currentRouteIndex = 3;

      let currentStation = testDriver.getCurrentStation();

      expect(currentStation).toBe(2);
    });
  });
});
