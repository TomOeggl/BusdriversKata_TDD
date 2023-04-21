// const BusdriverService = require('../src/BusdriverService.js');

import BusdriverService from '../src/BusdriverService';

describe('BusdriverService class', () => {
  describe('creates new busdrivers', () => {
    it('should create busdriver instances based on a collection of routes through the busdriverFactory method', () => {
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

      expect(allDrivers[0].route).toEqual(allRoutes[0]);
    });
  });
});
