const Busdriver = require("../src/Busdriver.js");

class BusdriverService{
    constructor(properties){
        this.allRoutes = properties.allRoutes;
        this.allDrivers = [];
    }

    busdriverFactory(){
        const createBusdriver = (route, index, numberOfGossips) => {
            let busdriverProperties = {};
            busdriverProperties.route = route;
            busdriverProperties.id = index;
            busdriverProperties.numberOfGossips = numberOfGossips;
            let busdriver = new Busdriver(busdriverProperties);
            busdriver.initialize();
            return busdriver;
        };
        
        this.allDrivers = this.allRoutes.map(route => {
            
        });


    }
}

module.exports = BusdriverService;