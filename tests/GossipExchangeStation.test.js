import GossipExchangeStation from "../src/GossipExchangeStation";

describe("GossipExchangeStation class facilitates the exchange of gossip if two or more busdriver meet there", () => {
  let stationProperties;
  let gossipExchangeStation;

   beforeAll(() => {
    stationProperties = {
      numberOfGossips: 4,
      busdriversAtStation: [
        {
          id: 0,
          route: [7, 2, 6, 8],
          gossipArray: [true, false, false, false],
        },
        {
          id: 1,
          route: [6, 2, 7, 3],
          gossipArray: [false, true, false, false],
        },
        { id: 2, 
          route: [2, 8, 2, 1], 
          gossipArray: [false, true, true, false] 
        },
      ],
    };
    gossipExchangeStation = new GossipExchangeStation(stationProperties);
  });

  it("should initialize with an empty stationGossipArray with the length equals to the maximum number of gossips/drivers.", () => {
    let gossipArray = gossipExchangeStation.stationGossipArray;

    expect(gossipArray.length).toBe(4);
  });

  it("should initialize with an array of busdrivers that are passed to it.", () => {
    let sampleDriverRoute = gossipExchangeStation.busdriversAtStation[0].route;

    expect(sampleDriverRoute).toEqual(
      stationProperties.busdriversAtStation[0].route
    );
  });

  it("should collect the gossips known to all drivers into the stationGossipArray through the collectGossips() method.", () => {
    gossipExchangeStation.collectGossips();

    let gossipArray = gossipExchangeStation.stationGossipArray;

    expect(gossipArray).toEqual([true, true, true, false]);
  });

  it("should pass the collect gossips to all drivers through the updateDriverGossips() method.", () => {
    gossipExchangeStation.collectGossips();
    gossipExchangeStation.updateDriverGossips();

    let stationGossipArray = gossipExchangeStation.stationGossipArray;
    let driver = gossipExchangeStation.busdriversAtStation[0];

    expect(driver.gossipArray).toEqual(stationGossipArray);
  });

  it("should return an array of driver ids with knowledge of all gossips through the getDriversKnowAllGossips() method.", () => {
    gossipExchangeStation.busdriversAtStation[0].gossipArray = [true, false, false, true,];

    gossipExchangeStation.collectGossips();
    gossipExchangeStation.updateDriverGossips();
    let driversKnowAllGossipsArray = gossipExchangeStation.getDriversKnowAllGossips();

    expect(driversKnowAllGossipsArray).toEqual([true, true, true, false]);
  });
});
