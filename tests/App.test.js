import BusdriverService from "../src/BusdriverService";
import App from "../src/App";

describe("The App class coordinates the whole algorithm", () => {
  it("should count the number of steps elapsed and increase them with each movement of the drivers to the next station on their routes.", () => {
    let mockProperties = {
      maxSteps: 480,
      allRoutes: [
        [7, 2, 6, 8],
        [6, 2, 7, 3],
        [2, 8, 2, 1],
      ],
    };

    let app = new App(mockProperties);

    for (let i = 1; i < 5; i++) {
      app.nextStep();
    }

    let stepsElapsed = app.steps;

    expect(stepsElapsed).toEqual(5);
  });

  it("should initialize the algorithm by creating a BusdriverService instance and pass it the routes", () => {
    let mockProperties = {
      maxSteps: 480,
      allRoutes: [
        [7, 2, 6, 8],
        [6, 2, 7, 3],
        [2, 8, 2, 1],
      ],
    };

    let app = new App(mockProperties);

    let service = app.service;

    expect(service.allRoutes).toEqual(mockProperties.allRoutes);
  });

  it("should move all drivers to the next step", () => {
    let mockProperties = {
      maxSteps: 480,
      allRoutes: [
        [7, 2, 6, 8],
        [6, 2, 7, 3],
        [2, 8, 2, 1],
      ],
    };

    let app = new App(mockProperties);

    app.nextStep();

    let sampleDriver = app.service.allDrivers[0]

    expect(sampleDriver.getCurrentStation()).toEqual(2);
  });

  it("should already check on instantiation if all gossips can be passed at the first station", () => {
    let mockProperties = {
      maxSteps: 480,
      allRoutes: [
        [7, 2, 6, 11],
        [7, 2, 7, 3],
        [7, 8, 2, 1],
      ],
    };

    let app = new App(mockProperties);

    let sucess = app.isFinished();

    expect(sucess).toBe(true);
  });

  it("should work", () => {
    let mockProperties = {
      maxSteps: 480,
      allRoutes: [
        [3, 1, 2, 3],
        [3, 2, 3, 1],
        [4, 2, 3, 4, 5],
      ],
    };

     




    let app = new App(mockProperties);

    app.run();

    let report = app.resultInSteps;

    expect(report).toEqual(5);
  });

  it("should work", () => {
    let mockProperties = {
      maxSteps: 480,
      allRoutes: [
        [3, 1, 3, 3, 1, 4, 2],
        [3, 8, 1, 1, 4, 4, 7],
        [4, 2, 3, 3, 5, 2, 7],
      ],
    };


    let app = new App(mockProperties);

    app.run();

    let report = app.resultInSteps;

    expect(report).toEqual(6);
  });
});
