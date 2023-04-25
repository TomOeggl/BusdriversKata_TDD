import App from "./App.js";

const renderDriverRouteInputs = (numberOfDrivers) => {
  let driverInputs = "<br>What are their routes?";
  for (let i = 0; i < numberOfDrivers; i++) {
    driverInputs += `<br><br>Driver ${i + 1} route:
    <br><input type="text" class="route" list="routes"
    placeholder="Bus stop numbers" required>
    <datalist id="routes">
      <option value="1, 2, 3">
      <option value="2, 6, 1, 4">
      <option value="1, 3, 2, 4">
      <option value="2, 4, 5, 7">
    </datalist>`;
  }
  driverInputs += "<br><br><button>Start working/gossiping</button>";
  form.innerHTML = driverInputs;
};

const startGossiping = () => {
  const app = new App({
    maxSteps: 480,
    allRoutes: Array.from(form.querySelectorAll(".route")).map((element) => {
      return element.value.split(/\s*,\s*/).map((element) => parseInt(element));
    }),
  });
  app.run();
  app.resultInSteps
    ? (output.innerHTML = `All gossips are exchanged after ${app.resultInSteps} bus stops.`)
    : (output.innerHTML = `Not all gossips are exchanged before the day ends. :(`);
};

input.addEventListener("input", (e) => {
  renderDriverRouteInputs(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  startGossiping();
});
