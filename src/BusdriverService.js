import Busdriver from "../src/Busdriver.js";
import GossipExchangeStation from "./GossipExchangeStation.js";

class BusdriverService {
  constructor(properties) {
    this.allRoutes = properties.allRoutes;
    this.allDrivers = [];
    this.stations = [];
    this.driversKnowAllGossips = []; //index is id
    this.#initialize();
  }

  #initialize() {
    this.getHighestStationNumber();
    this.driversKnowAllGossips = new Array(this.allRoutes.length);
    this.driversKnowAllGossips.fill(false);
  }

  busdriverFactory() {
    const createBusdriver = (busdriverProperties) => {
      let busdriver = new Busdriver(busdriverProperties);
      busdriver.initialize();
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
    let overviewArray = new Array(this.getHighestStationNumber());
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

  createStations() {
    this.stations = [];
    const isAtStation = (driver, stationIndex) => {
      let currentStation = driver.getCurrentStation();
      return currentStation === stationIndex;
    };

    this.stationHasMultipleDriversArray.forEach((station, index) => {
      if (station) {
        let stationProperties = {
          numberOfGossips: this.allDrivers.length,
          busdriversAtStation: [],
        };
        this.allDrivers.forEach((driver) => {
          if (isAtStation(driver, index)) {
            stationProperties.busdriversAtStation.push(driver);
          }
        });

        let stationObject = new GossipExchangeStation(stationProperties);

        this.stations.push(stationObject);
      }
    });
  }

  getFullGossipKnowledge() {
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

  getHighestStationNumber() {
    let shallowArray = [];
    this.allRoutes.forEach((route) => {
      shallowArray = shallowArray.concat(route);
    });
    return Math.max(...shallowArray) + 1;
  }
}

export default BusdriverService;
