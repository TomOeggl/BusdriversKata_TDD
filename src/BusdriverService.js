import Busdriver from "../src/Busdriver.js";
import GossipExchangeStation from "./GossipExchangeStation.js";

class BusdriverService {
  constructor(properties) {
    this.allRoutes = properties.allRoutes;
    this.allDrivers = [];
    this.stations = [];
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
        numberOfGossips: this.allDrivers.length,
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
    let overviewArray = new Array(this.allDrivers.length);
    overviewArray.fill(0);

    this.allDrivers.forEach((driver) => {
      let currentStation = driver.getCurrentStation();
      overviewArray[currentStation]++;
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
    const isAtStation = (driver, stationIndex) => {
      let currentStation = driver.getCurrentStation();
      return currentStation === stationIndex;
    };

    this.stationHasMultipleDriversArray.forEach((station, index) => {
      if (station) {
        let stationProperties = {
          numberOfGossips: this.numberOfDrivers,
          busdriversAtStation: [],
        };
        this.allDrivers.forEach(driver => {
          if(isAtStation(driver, index)){
              stationProperties.busdriversAtStation.push(driver);
          }
        });

        let stationObject = new GossipExchangeStation(stationProperties);

        this.stations.push(stationObject);
      }
    });
  }
}

export default BusdriverService;
