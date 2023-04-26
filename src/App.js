import BusdriverService from "./BusdriverService.js";

class App {
  constructor(properties) {
    this.maxSteps = properties.maxSteps;
    this.allRoutes = properties.allRoutes;
    this.steps = 1;
    this.initialize();
  }

  initialize() {
    this.service = new BusdriverService({ allRoutes: this.allRoutes });
    this.service.busdriverFactory();
    this.handleGossipExchange();
    this.reportIfSuccessful();
  }

  handleGossipExchange() {
    this.service.calculateNumberOfDriversAtStation();
    this.service.exchangeGossipIsPossibleAtStations();
    this.service.createStationsForGossipExhange();
    this.service.getDriversHaveFullGossipKnowledge();
  }

  run() {
    for (let i = 1; i < this.maxSteps; i++) {
      if (this.reportIfSuccessful()) {
        break;
      }
      this.nextStep();
    }
  }

  nextStep() {
    this.steps++;
    this.service.allDriveToNextStation();
    this.handleGossipExchange();
    this.reportIfSuccessful();
  }

  reportIfSuccessful() {
    const isFinished = () => {
      return this.service.isGossipKnowledgeComplete();
    };

    const reportResult = () => {
      console.log("Finished in " + this.steps + " steps");
      return (this.resultInSteps = this.steps);
    };

    if (isFinished()) {
      return !!reportResult();
    }
  }
}

export default App;
