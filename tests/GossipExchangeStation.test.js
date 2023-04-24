import GossipExchangeStation from "../src/GossipExchangeStation";

describe("GossipExchangeStation class facilitates the exchange of gossip if two or more busdriver meet there", () => {
  it("should initialize with an empty stationGossipArray with the length equals to the maximum number of gossips/drivers.", () => {
    // Arrange
    let stationProperties = {
      numberOfGossips: 5,
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
        { id: 2, route: [2, 8, 2, 1], gossipArray: [false, true, true, false] },
      ],
    };
    let gossipExchangeStation = new GossipExchangeStation(stationProperties);

    // Act
    let gossipArray = gossipExchangeStation.stationGossipArray;

    // Assert
    expect(gossipArray.length).toBe(5);
  });

  it("should initialize with an array of busdrivers that are passed to it.", () => {
    // Arrange
    let stationProperties = {
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
        { id: 2, route: [2, 8, 2, 1], gossipArray: [false, true, true, false] },
      ],
    };

    let gossipExchangeStation = new GossipExchangeStation(stationProperties);

    // Act
    let sampleDriverRoute = gossipExchangeStation.busdriversAtStation[0].route;

    // Assert
    expect(sampleDriverRoute).toEqual(
      stationProperties.busdriversAtStation[0].route
    );
  });

  it("should collect the gossips known to all drivers into the stationGossipArray through the collectGossips() method.", () => {
    let stationProperties = {
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
        { id: 2, route: [2, 8, 2, 1], gossipArray: [false, true, true, false] },
      ],
    };

    // Arrange
    let gossipExchangeStation = new GossipExchangeStation(stationProperties);
    gossipExchangeStation.collectGossips();

    // Act
    let gossipArray = gossipExchangeStation.stationGossipArray;

    // Assert
    expect(gossipArray).toEqual([true, true, true, false]);
  });

  it("should pass the collect gossips to all drivers through the updateDriverGossips() method.", () => {
    let stationProperties = {
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
        { id: 2, route: [2, 8, 2, 1], gossipArray: [false, true, true, false] },
      ],
    };

    // Arrange
    let gossipExchangeStation = new GossipExchangeStation(stationProperties);
    gossipExchangeStation.collectGossips();
    gossipExchangeStation.updateDriverGossips();

    // Act
    let stationGossipArray = gossipExchangeStation.stationGossipArray;
    let driver = gossipExchangeStation.busdriversAtStation[0];

    // Assert
    expect(driver.gossipArray).toEqual(stationGossipArray);
  });

  it("should return an array of driver ids with knowledge of all gossips through the getDriversKnowAllGossips() method.", () => {
    // Arrange
    let stationProperties = {
      numberOfGossips: 4,
      busdriversAtStation: [
        {
          id: 0,
          route: [7, 2, 6, 8],
          gossipArray: [true, false, false, true],
        },
        {
          id: 1,
          route: [6, 2, 7, 3],
          gossipArray: [false, true, true, false],
        },
        { id: 2, route: [2, 8, 2, 1], gossipArray: [false, true, false, false] },
      ],
    };

    let gossipExchangeStation = new GossipExchangeStation(stationProperties);

    // Act
    gossipExchangeStation.collectGossips();
    gossipExchangeStation.updateDriverGossips();
    let driversKnowAllGossipsArray =
      gossipExchangeStation.getDriversKnowAllGossips();
    
    // Assert
    expect(driversKnowAllGossipsArray).toEqual([true, true, true, false]);
  });
});
