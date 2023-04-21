class Busdriver {
  constructor(driverProperties) {
    this.id = driverProperties.id;
    this.gossipArray = null;
    this.numberOfGossips = driverProperties.numberOfGossips;
    this.route = driverProperties.route;
    this.currentRouteIndex = 0;
  }

  getGossipArray() {
    return this.gossipArray;
  }

  getCurrentStation() {
    return this.route[this.currentRouteIndex];
  }

  initialize() {
    this.gossipArray = new Array(this.numberOfGossips);
    this.gossipArray.fill(false);
    this.gossipArray[this.id] = true;
  }

  driveToNextStation() {
    const isLastStop = () => {
      return this.currentRouteIndex === this.route.length - 1;
    };

    if (isLastStop()) {
      this.currentRouteIndex = 0;
    } else {
      this.currentRouteIndex++;
    }
  }
}

export default Busdriver;

/*
driverProperties = 
{
  id: 1, //arrayindex
  route: [6,3,4,7], //subarray
  numberOfGossips: 5
}
allRoutes =
[[x,d,g,e,], [x,d,r,t]]
*/
