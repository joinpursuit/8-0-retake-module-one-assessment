/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleNetworks` variable below to gain access to an array of bike network information.

  Keep in mind that your functions must still have and use a parameter for accepting all network data.
*/
const exampleNetworks = require("./bike-networks");
// Do not change the line above.

/**
 * getAllBikeNetworkNames()
 * -----------------------------
 * Returns all of names from an array of networks. If the inputted `networks` array is empty, return `[]`.
 * @param {Object[]} networks - An array of networks. See the `bike-networks.js` file for an example of this array.
 * @returns {string[]} An array of strings, which are network names.
 *
 * EXAMPLE:
 *  getAllBikeNetworkNames(networks);
 *  //> [
      "UBike",
      "Bay Wheels",
      "Relay Bike Share",
      "BikeRecife",
      "BikeSampa",
      "BikeRio",
      "BikeSalvador",
      "BikePOA",
      "MIBICI",
      "Just Eat Cycles",
      // ...
    ];
 */

//return an array
//array of strings ... the names from the network array of objects 
//create an empty array
//create a loop
//the loop is to check for names
//add all names to the empty array
//return an empty array if the network input is empty 

function getAllBikeNetworkNames(networks) {
  let allBikeNames = [];

  for (let network of networks){
    allBikeNames.push(network.name);
  }
  return allBikeNames;
}

/**
 * getAllBikeNetworksInTheUS()
 * -----------------------------
 * Returns an array of all networks located in the United States (i.e. "US"). If there are no networks in the "US" or the input is empty, return an empty array.
 * @param {Object[]} networks - An array of networks. See the `bike-networks.js` file for an example of this array.
 * @returns {Object[]} An array of objects, where each network object has a location in the "US".
 * 
 * EXAMPLE:
 *  getAllBikeNetworksInTheUS(networks);
 *  //> [
      {  
        company: ["Clean Energy Coalition", "BCycle, LLC"],
        gbfs_href: "https://gbfs.bcycle.com/bcycle_arborbike/gbfs.json",
        href: "/v2/networks/arborbike",
        id: "arborbike",
        location: {
          city: "Ann Arbor, MI",
          country: "US",
          latitude: 42.27853,
          longitude: -83.74536,
        },
        name: "ArborBike",
      },
      // ...
    ]
 */
//return an array
//an array of object
//create an empty array
//create a loop
//the loop is to check if the country === US
//if so add the object to the array
//return that array
//if the country !== US or input is empty return emty array

function getAllBikeNetworksInTheUS(networks) {
  let bikesInUS = [];

  for (let network of networks){
    if (network.location.country === "US"){
      bikesInUS.push(network)
    }
  }

  return bikesInUS;
}

/**
 * getBikeNetworkWithLowestLongitude()
 * -----------------------------
 * Returns the bike network which has the smallest value for `longitude`. If there are no networks in the input, returns `null`.
 * @param {Object[]} networks - An array of networks. See the `bike-networks.js` file for an example of this array.
 * @returns {Object} The bike network with the smallest value for `longitude`.
 * 
 * EXAMPLE:
 *  getBikeNetworkWithLowestLongitude(networks);
 *  //> {
      company: [
        "Portland Bureau of Transportation (PBOT)",
        "Motivate International, Inc",
        "Social Bicycles Inc.",
      ],
      gbfs_href: "http://biketownpdx.socialbicycles.com/opendata/gbfs.json",
      href: "/v2/networks/biketown",
      id: "biketown",
      location: {
        city: "Portland, OR",
        country: "US",
        latitude: 45.52175423291714,
        longitude: -122.68107935786247,
      },
      name: "BIKETOWN",
    }
 */
//return an object
//returns the object in the array networks with the lowest longitude
//create a loop
//the loop is to check for the object with lowest longitude
//if the object has the lowest longitude return that object
//if the input is empty return null

function getBikeNetworkWithLowestLongitude(networks) {
  if(networks.length === 0){
    return null;
  }
  let lowestLongitude = networks[0].location.longitude
  let networkObj = networks[0]
  for (let i = 0; i < networks.length; i++){
    let lowLongitude = networks[i].location.longitude
    if(lowestLongitude > lowLongitude){
      lowestLongitude = lowLongitude
      networkObj = networks[i]
    }
  }
  return networkObj;
}

/**
 * countByCountry()
 * -----------------------------
 * Returns an object where the keys are countries and the values are the number of networks in the array with that country. If the inputted `networks` array is empty, return `{}`.
 * @param {Object[]} networks - An array of networks. See the `bike-networks.js` file for an example of this array.
 * @returns {Object} An object where keys are countries (e.g. "AU") and the values are how many networks in the array are in that country (e.g. 2).
 *
 * EXAMPLE:
 *  countByCountry(networks);
 *  //> {
      AU: 2,
      BE: 1,
      BR: 6,
      // ... 
    }
 */
//return an object
//key of the object : country name
//value of the keys : number of bikes with that country
//if input is empty return empty object
//create a loop
//check for the country
//add the key and values to theobject

function countByCountry(networks) {
  let counts = {};
  if(networks.length === 0){
    return counts;
  }
  for (let network of networks){
    if(!counts[network.location.country]){
      counts[network.location.country] = 1
    } else if (counts.hasOwnProperty(network.location.country)){
      counts[network.location.country] += 1
    }
  }
  return counts;
}
 


/**
 * findById()
 * -----------------------------
 * Returns a network object from an array of objects based on the ID. If the inputted `networks` array is empty or the ID does not match any bike network, return `null`.
 * @param {Object[]} networks - An array of networks. See the `bike-networks.js` file for an example of this array.
 * @param {string} id - A unique `id`.
 * @returns {Object|null} The network object with the matching `id`.
 *
 * EXAMPLE:
 *  findById(networks, "indego");
 *  //> {
      company: [
        "City of Philadelphia",
        "Bicycle Transit Systems",
        "BCycle, LLC",
      ],
      gbfs_href: "https://gbfs.bcycle.com/bcycle_indego/gbfs.json",
      href: "/v2/networks/indego",
      id: "indego",
      location: {
        city: "Philadelphia, PA",
        country: "US",
        latitude: 39.95378,
        longitude: -75.16374,
      },
      name: "Indego",
    }
 */
//return an object 
//object with the movie object if the id matches
//create a loop
//the loop will check if any object in the array has the same ID
//if the !== id or empty input return null

function findById(networks, id) {
  if(networks.length === 0){
    return null;
  }
  for (let network of networks){
    if(network.id === id){
      return network
    }
  }
  return null;
}

/**
 * filterByCountry()
 * -----------------------------
 * Returns an array of network objects where the network country matches the inputted `country`. If there are no matching objects, or the input is empty, return an empty array.
 * @param {Object[]} networks - An array of networks. See the `bike-networks.js` file for an example of this array.
 * @param {String} country - A country name abbreviation
 * @returns {Object[]} An array of objects, where each network object has a location in the matching country.
 * 
 * EXAMPLE:
 *  filterByCountry(networks, "AU");
 *  //> [
      { name: "Curtin Bike Share", ... },
      { name: "Monash BikeShare", ... },
    ]
 */
//return an array
//array with bike objects that match the country
//if !== country or the input is empty return an empty array
//create a loop
//the loop is to check for objects that match the country

function filterByCountry(networks, country) {
  let result = [];
  for (let network of networks){
    if(network.location.country.includes(country)){
      result.push(network)
    }
  }
  return result;
}

/**
 * transformNetworks()
 * -----------------------------
 * Returns an array of objects based off of the inputted networks. However, each network is transformed so that it has the following keys:
 *  - id: The ID of the network.
 *  - name: The name of the network.
 *  - location: The network's city and country, joined together.
 *  - companies: The network's company array joined together by commas.
 * @param {Object[]} networks - An array of networks. See the `bike-networks.js` file for an example of this array.
 * @returns {Object[]} An array of objects, where each network is transformed in the prescribed way.
 * 
 * EXAMPLE:
 *  transformNetworks(networks);
 *  //> [
      {
        id: "velib",
        name: "Velib' M\u00e9trop\u00f4le",
        location: "Paris, FR",
        companies: "Smovengo",
      },
      ...
    ]
 * 
 * EXAMPLE:
 *  transformNetworks(networks);
 *  //> [
     {
        id: "edinburgh-cycle-hire",
        name: "Just Eat Cycles",
        location: "Edinburgh, UK",
        companies: "Your Bike, Urban Sharing",
      },
      ...
    ]
 */


function transformNetworks() {}

module.exports = {
  getAllBikeNetworkNames,
  getAllBikeNetworksInTheUS,
  getBikeNetworkWithLowestLongitude,
  countByCountry,
  findById,
  filterByCountry,
  transformNetworks,
};
