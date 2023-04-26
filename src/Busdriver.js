class Busdriver {
  constructor(driverProperties) {
    this.id = driverProperties.id;
    this.gossipArray = null;
    this.numberOfGossips = driverProperties.numberOfGossips;
    this.route = driverProperties.route;
    this.currentRouteIndex = 0;
    this.initialize();
  }

  initialize() {
    this.gossipArray = new Array(this.numberOfGossips);
    this.gossipArray.fill(false);
    this.gossipArray[this.id] = true;
  }

  getGossipArray() {
    return this.gossipArray;
  }

  getCurrentStation() {
    return this.route[this.currentRouteIndex];
  }

  driveToNextStation() {
    const isLastStop = () => {
      return this.currentRouteIndex === this.route.length - 1;
    };

    if (isLastStop()) {
      return this.currentRouteIndex = 0;
    }
    this.currentRouteIndex++;
  }
}

export default Busdriver;
