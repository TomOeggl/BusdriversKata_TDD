const Busdriver = require ("../src/Busdriver.js");



describe("Busdriver class", () => {
  describe("has routes, an id and one gossip to start  ", () => {
    it("should return an array of bools which represent the gossip the bus driver knows through the getGossip array method.", () => {
      // Arrage

      let testDriver = new Busdriver(1);

      // Act
      testDriver.gossipArray = [false, true];
      const gossipArray = testDriver.getGossipArray();

      // Assert

      expect(gossipArray[1]).toEqual(true);
    });

    it("should take the id as index for the gossip array and set that array element true to give each driver a unique gossip through the initialize method.", () => {
      // Arrage
      let id = 1;
      let testDriver = new Busdriver(id);

      // Act
      testDriver.initialize();
      const gossipArray = testDriver.getGossipArray();
    
      // Assert
      expect(gossipArray[id]).toBe(true);
    });
  });
});
