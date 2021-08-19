/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleNetworks` variable below to gain access to an array of bike network information.

  Keep in mind that your functions must still have and use a parameter for accepting all network data.
*/
const networks = require("./bike-networks");
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

// TO-DO:
// [x] loop through each object in the array of objects
// [x] return name index in each object
// [x] if the array is empty, return []
function getAllBikeNetworkNames(networks) {
  let networksArr = []

for(let i = 0; i < networks.length; i++){
  let network = networks[i]

  networksArr.push(network.name)
}

return networksArr
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

    // TO-DO:
    // [] loop through the array of objects
    // [] return the networks located in country: US
    // [] if there are no networks in the US or the input is empty, return []
function getAllBikeNetworksInTheUS(networks) {
  let usa = []

for(let i = 0; i < networks.length; i++){
  let network = networks[i]
  let result = "US"

  if(network.location.country === "US"){
  network.push(usa)
  }
}
  return usa
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

    // TO-DO:
    // [x] loop through the array of objects
    // [x] return the bike network with the lowest longitude value
    // [x] if there are no networks inputted, return null
    function getBikeNetworkWithLowestLongitude(networks){
      if(!networks.length){ 
        return null 
      } 
      let lowest = networks[0].location.longitude 
      let lowestNetwork = networks[0]
    
      for(let i = 0; i < networks.length; i++){ 
      let val = networks[i].location.longitude 
         
        if(val < lowest){
          lowest = val
          lowestNetwork = networks[i]
      }
    }
      return lowestNetwork
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

    // TO-DO:
    // [x] key = country
    // [x] value = number of networks in array with that country
    // [x] return an object where keys are countries and the values are a number
function countByCountry(networks) {
  let obj = {};
    
  for (let network of networks) {
   let countryKey = network.location.country
   if(!obj[countryKey]){
   obj[countryKey] = 1
   }else if(obj[countryKey]){
     obj[countryKey] += 1
   }
  }

  return obj;
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

    // TO-DO:
    // [x] returns an object from the network array based on the ID
    // [x] if the network array is empty or doesnt match the bike network, return null
function findById(networks, id) {
  let object = null
  if(networks.length === 0){
    return null
  }

  for(let i = 0; i < networks.length; i++){
  let network = networks[i].id
  
  if(id === network){
  
    return networks[i]
  }

}
  return object
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

    // TO-DO:
    // [x] return and array of network objects
    // [x] the country should match the inputted 'country'
    // [x] return an empty array if no countries match the objects or the input is empty
    // [x] the country name should be abbreviated
function filterByCountry(networks, country) {
  let foundCountry = []

  for (let network of networks) {
    
  let place = network.location.country

    if (place.includes(country)){
      foundCountry.push(network)
    }
  }
  return foundCountry
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

    // TO-DO:
    // [] return an array of objects based of the networks
    // [] change the keys to the ones given in the instructions
    // [] combine multiple keys to create one value for certain keys
    // [] re-establish certain values
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
