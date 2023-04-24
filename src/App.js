import Busdriver from "./Busdriver";
import BusdriverService from "./BusdriverService";

class App {
  constructor(properties) {
    this.maxSteps = properties.maxSteps;
    this.allRoutes = properties.allRoutes;
    this.steps = 1;
    this.#initialize();
  }

  #initialize() {
    this.service = new BusdriverService({ allRoutes: this.allRoutes });
    this.service.busdriverFactory();
    this.service.calculateNumberOfDriversAtStation();
    this.service.exchangeGossipIsPossibleAtStations();
    this.service.createStations();
    this.service.getFullGossipKnowledge();
    this.reportIfSuccessful();
  }

  run(){
      for (let i = 1; i < this.maxSteps; i++) {
        if(this.isFinished()){
            this.reportResult();
            break;
        }
        this.nextStep();
    }
  }

  nextStep() {
    this.steps++;    
    this.service.allDriveToNextStation();
    this.service.calculateNumberOfDriversAtStation();
    this.service.exchangeGossipIsPossibleAtStations();
    this.service.createStations();
    this.service.getFullGossipKnowledge();
    this.reportIfSuccessful();
  }
 
  reportIfSuccessful(){
    if(this.isFinished())
    {this.reportResult();}
  }

  isFinished(){
    return this.service.isGossipKnowledgeComplete();
  }

  reportResult(){
    console.log("Finished in " + this.steps + " steps");
    this.resultInSteps = this.steps;
  }


}

export default App;
