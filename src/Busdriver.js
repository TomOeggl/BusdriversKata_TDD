class Busdriver {
  constructor(id) {
    this.id = id;
    this.gossipArray = null;
    this.numberOfDrivers = 5;
  }

  getGossipArray() {
    return this.gossipArray;
  }

  initialize() {
    this.gossipArray = new Array(this.numberOfDrivers);
    this.gossipArray.fill(false);
    this.gossipArray[this.id] = true;
  }
}

module.exports = Busdriver;
