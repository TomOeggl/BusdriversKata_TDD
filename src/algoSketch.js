//busdriverStops: 1, 2, 5, 7, repeat
//each busdriver starts with one gossip
//480 min/steps max

//gossip [id1, true], [id2, false], idx .. false
// where id is index is id of busdriver

// [true, false, true, false, false] /driver id 1

// [false, false, false, true, false] /driver id 4

// [false, false, true, false, true] / driver id 5

// [true, false, true, true, true] //both after meetup

// if (countOfTrue === array Length ) -- I know all the stuff !

// if everybody does => solved (stepcounter) steps required ==> goal


// individual gossips are summed up into a station gossip array which then is passed back to all drivers

// driver1 pass gossips to stationarray(new on each step)

// driver2 pass ...

// when complete => driver1.gossipArray = stationGossipArray





//busdriver class with methods passGossipAtStation, driveToNextStop, countGossip
// props: gossip array, currentStation, route, busdriverID, KNOWSALLTHEGOSSIPSFLAG

//station class station methods addGossipToStationArray, whateverencapsulatesAllStationLogicMethod
//props: stationGossipArrayAtCurrentStep

//busdriverHandler/manager/service ... routes? globalGossipCount? nextStep?

// if more then 1 busdriver at any given station ==> make new station ... station.doAllStuff