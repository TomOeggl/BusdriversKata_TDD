import Busdriver from "../src/Busdriver.js";
import GossipExchangeStation from "./GossipExchangeStation.js";

class BusdriverService {
  constructor(properties) {
    this.allRoutes = properties.allRoutes;
    this.allDrivers = [];
    this.stations = [];
    this.driversKnowAllGossips = []; //index is id
    this.initialize();
  }

  initialize() {
    this.driversKnowAllGossips = new Array(this.allRoutes.length);
    this.driversKnowAllGossips.fill(false);
  }

  busdriverFactory() {
    const createBusdriver = (busdriverProperties) => {
      let busdriver = new Busdriver(busdriverProperties);
      return busdriver;
    };

    this.allDrivers = this.allRoutes.map((route, index) => {
      let properties = {
        route: route,
        id: index,
        numberOfGossips: this.allRoutes.length,
      };
      return createBusdriver(properties);
    });
  }

  allDriveToNextStation() {
    this.allDrivers.forEach((driver) => {
      driver.driveToNextStation();
    });
  }

  calculateNumberOfDriversAtStation() {
    const getHighestStationNumber = () => {
      let shallowArray = [];
      this.allRoutes.forEach((route) => {
        shallowArray = shallowArray.concat(route);
      });
      return Math.max(...shallowArray) + 1;
    };

    let overviewArray = new Array(getHighestStationNumber());
    overviewArray.fill(0);

    this.allDrivers.forEach((driver) => {
      let currentStation = driver.getCurrentStation();
      overviewArray[currentStation] += 1;
    });

    this.numberOfDriversAtStation = overviewArray;
  }

  exchangeGossipIsPossibleAtStations() {
    let boolArray = [];

    this.numberOfDriversAtStation.forEach((numberOfDrivers, index) => {
      boolArray[index] = numberOfDrivers > 1;
    });
    this.stationHasMultipleDriversArray = boolArray;
  }

  createStationsForGossipExhange() {
    this.stations = [];

    const createSingleStation = (station, pushDriversToStation, index) => {
      if (station) {
        let stationProperties = {
          numberOfGossips: this.allDrivers.length,
          busdriversAtStation: [],
        };
        this.allDrivers.forEach((driver) => {
          pushDriversToStation(driver, index, stationProperties);
        });

        let stationObject = new GossipExchangeStation(stationProperties);

        this.stations.push(stationObject);
      }
    };

    const isAtStation = (driver, stationIndex) => {
      let currentStation = driver.getCurrentStation();
      return currentStation === stationIndex;
    };

    const pushDriversToStation = (driver, index, stationProperties) => {
      if (isAtStation(driver, index)) {
        stationProperties.busdriversAtStation.push(driver);
      }
    };

    this.stationHasMultipleDriversArray.forEach((station, index) => {
      createSingleStation(station, pushDriversToStation, index);
    });
  }

  getDriversHaveFullGossipKnowledge() {
    const passDrivers = (driverWithFullKnowledgeArray) => {
      driverWithFullKnowledgeArray.forEach((driver, index) => {
        if (driver) {
          this.driversKnowAllGossips[index] = true;
        }
      });
    };

    this.stations.forEach((station) => {
      passDrivers(station.getDriversKnowAllGossips());
    });
  }

  isGossipKnowledgeComplete() {
    let result = 1;
    this.driversKnowAllGossips.forEach((driver) => {
      result *= driver;
    });
    return result === 1;
  }
}

export default BusdriverService;
