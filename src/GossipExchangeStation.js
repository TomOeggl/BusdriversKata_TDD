class GossipExchangeStation {
  constructor(stationProperties) {
    this.numberOfGossips = stationProperties.numberOfGossips;
    // this.stationIndex = stationProperties.stationIndex;
    this.busdriversAtStation = stationProperties.busdriversAtStation;
    this.#initialize();
  }

  #initialize() {
    this.stationGossipArray = new Array(this.numberOfGossips);
    this.stationGossipArray.fill(false);
    this.collectGossips();
    this.updateDriverGossips();
  }



  collectGossips() {
    const passGossips = (driverGossipArray) => {
      driverGossipArray.forEach((gossip, index) => {
        if (gossip) {
          this.stationGossipArray[index] = true;
        }
      });
    };

    this.busdriversAtStation.forEach((driver) => {
      passGossips(driver.gossipArray);
    });
  }

  updateDriverGossips() {
    this.busdriversAtStation.forEach((driver) => {
      driver.gossipArray = this.stationGossipArray;
    });
  }

  getDriversKnowAllGossips() {
    let driversWithFullKnowledge = new Array(this.numberOfGossips);
    driversWithFullKnowledge.fill(false);

    const isComplete = () => {
      let result = 1;
      this.stationGossipArray.forEach((gossip) => {
        result *= gossip;
      });
      return result === 1;
    };
    if (isComplete()) {
      this.busdriversAtStation.forEach((driver) => {
        driversWithFullKnowledge[driver.id] = true;
      });
    }
    return driversWithFullKnowledge;
  }
}

export default GossipExchangeStation;
