const {
  getAllBikeNetworkNames,
  getAllBikeNetworksInTheUS,
  getBikeNetworkWithLowestLongitude,
  countByCountry,
  findById,
  filterByCountry,
  transformNetworks,
} = require("../");

const networks = require("../bike-networks");
const alternative = require("./fixtures/alternative-networks");

describe("getAllBikeNetworkNames()", () => {
  test("should return an an array of all bike network names", () => {
    const subset = networks.slice(-10);
    const actual = getAllBikeNetworkNames(subset);
    const expected = [
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
    ];
    expect(actual).toEqual(expected);
  });

  test("should work with an alternate input", () => {
    const subset = alternative.slice(-10);
    const actual = getAllBikeNetworkNames(subset);
    const expected = [
      "Bicincitt\u00e0",
      "Coca-Cola Zero\u00ae Bikes",
      "Coca-Cola Zero\u00ae Bikes",
      "Pun Pun Bike Share",
      "Coca-Cola Zero\u00ae Bikes",
      "BBBike",
      "Bicincitt\u00e0",
      "Bydgoski rower aglomeracyjny",
      "Santander Cycles",
      "WE-cycle",
    ];
    expect(actual).toEqual(expected);
  });

  test("should return an empty array if the inputted array is empty", () => {
    const actual = getAllBikeNetworkNames([]);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});

describe("getAllBikeNetworksInTheUS()", () => {
  test("should return all bike networks in the US", () => {
    const actual = getAllBikeNetworksInTheUS(networks);
    expect(actual.length).toEqual(44);
    expect(actual[0]).toEqual({
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
    });
    expect(actual[actual.length - 1]).toEqual({
      company: ["CycleHop, LLC", "Social Bicycles Inc"],
      gbfs_href: "https://relaybikeshare.socialbicycles.com/opendata/gbfs.json",
      href: "/v2/networks/relay-atlanta",
      id: "relay-atlanta",
      location: {
        city: "Atlanta, GA",
        country: "US",
        latitude: 33.7627941119619,
        longitude: -84.38727110624313,
      },
      name: "Relay Bike Share",
    });
  });

  test("should work with an alternate input", () => {
    const actual = getAllBikeNetworksInTheUS(alternative);
    const expected = [
      {
        company: ["PBSC", "Alta Bicycle Share, Inc"],
        gbfs_href: "https://asp.publicbikesystem.net/ube/gbfs/v1/gbfs.json",
        href: "/v2/networks/we-cycle",
        id: "we-cycle",
        location: {
          city: "Aspen, CO",
          country: "US",
          latitude: 39.194951,
          longitude: -106.837002,
        },
        name: "WE-cycle",
      },
    ];
    expect(actual).toEqual(expected);
  });

  test("should return an empty array if there are no US networks", () => {
    const actual = getAllBikeNetworksInTheUS(alternative.slice(0, 10));
    const expected = [];
    expect(actual).toEqual(expected);
  });

  test("should return an empty array if the input is empty", () => {
    const actual = getAllBikeNetworksInTheUS([]);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});

describe("getBikeNetworkWithLowestLongitude()", () => {
  test("should get the bike network with lowest value for `longitude`", () => {
    const actual = getBikeNetworkWithLowestLongitude(networks);
    const expected = {
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
    };
    expect(actual).toEqual(expected);
  });

  test("should work with an alternate input", () => {
    const actual = getBikeNetworkWithLowestLongitude(alternative);
    const expected = {
      company: ["PBSC", "Alta Bicycle Share, Inc"],
      gbfs_href: "https://asp.publicbikesystem.net/ube/gbfs/v1/gbfs.json",
      href: "/v2/networks/we-cycle",
      id: "we-cycle",
      location: {
        city: "Aspen, CO",
        country: "US",
        latitude: 39.194951,
        longitude: -106.837002,
      },
      name: "WE-cycle",
    };
    expect(actual).toEqual(expected);
  });

  test("should return `null` if there are no networks in the input", () => {
    const actual = getBikeNetworkWithLowestLongitude([]);
    const expected = null;
    expect(actual).toEqual(expected);
  });
});

describe("countByCountry()", () => {
  test("should return an object where the keys are countries and the values are the number of networks in that country", () => {
    const actual = countByCountry(networks);
    const expected = {
      AU: 2,
      BE: 1,
      BR: 6,
      CA: 4,
      CL: 1,
      CY: 1,
      ES: 5,
      FR: 1,
      GR: 15,
      IT: 32,
      MX: 2,
      SE: 1,
      UK: 1,
      US: 44,
    };
    expect(actual).toEqual(expected);
  });

  test("should work with an alternate input", () => {
    const actual = countByCountry(alternative);
    const expected = {
      DK: 1,
      ES: 42,
      GB: 2,
      GR: 11,
      IE: 3,
      IT: 9,
      NL: 1,
      NO: 2,
      PL: 2,
      TH: 1,
      US: 1,
    };
    expect(actual).toEqual(expected);
  });

  test("should return an empty object if the input is empty", () => {
    const actual = countByCountry([]);
    const expected = {};
    expect(actual).toEqual(expected);
  });
});

describe("findById()", () => {
  test("should find the network by the given ID", () => {
    const actual = findById(networks, "indego");
    const expected = {
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
    };
    expect(actual).toEqual(expected);
  });

  test("should work for alternative IDs", () => {
    expect(findById(networks, "boulder")).toEqual({
      company: ["BCycle, LLC"],
      gbfs_href: "https://gbfs.bcycle.com/bcycle_boulder/gbfs.json",
      href: "/v2/networks/boulder",
      id: "boulder",
      location: {
        city: "Boulder, CO",
        country: "US",
        latitude: 40.00811,
        longitude: -105.26385,
      },
      name: "Boulder B-cycle",
    });

    expect(findById(networks, "easybike-didymoteicho")).toEqual({
      company: ["Brainbox Technology", "Smoove SAS"],
      href: "/v2/networks/easybike-didymoteicho",
      id: "easybike-didymoteicho",
      location: {
        city: "Didymoteicho",
        country: "GR",
        latitude: 41.3502539849,
        longitude: 26.4972960949,
      },
      name: "EasyBike",
    });
  });

  test("should work for alternative networks", () => {
    expect(findById(alternative, "galway")).toEqual({
      company: ["The National Transport Authority"],
      href: "/v2/networks/galway",
      id: "galway",
      location: {
        city: "Galway",
        country: "IE",
        latitude: 53.2783491544,
        longitude: -9.05069143207,
      },
      name: "Coca-Cola Zero\u00ae Bikes",
    });

    expect(findById(alternative, "onroll-las-palmas")).toEqual({
      company: ["Domoblue"],
      href: "/v2/networks/onroll-las-palmas",
      id: "onroll-las-palmas",
      location: {
        city: "Las Palmas de Gran Canaria",
        country: "ES",
        latitude: 28.124302,
        longitude: -15.425994,
      },
      name: "Onroll",
    });
  });

  test("should return `null` if no network can be found in the list", () => {
    const actual = findById(networks, "incorrect-id");
    const expected = null;
    expect(actual).toEqual(expected);
  });

  test("should return `null` if the networks list is empty", () => {
    const actual = findById([], "indego");
    const expected = null;
    expect(actual).toEqual(expected);
  });
});

describe.only("filterByCountry()", () => {
  test("should return all of the networks from the given country", () => {
    const actual = filterByCountry(networks, "AU");
    const expected = [
      {
        company: ["Social Bicycles Inc."],
        gbfs_href: "http://curtinbikeshare.com/opendata/gbfs.json",
        href: "/v2/networks/curtin-bike-share",
        id: "curtin-bike-share",
        location: {
          city: "Curtin University, Perth, WA",
          country: "AU",
          latitude: -32.0034172153127,
          longitude: 115.89431270956993,
        },
        name: "Curtin Bike Share",
      },
      {
        company: ["Social Bicycles Inc."],
        gbfs_href: "https://monashbikeshare.com/opendata/gbfs.json",
        href: "/v2/networks/monash-bikeshare",
        id: "monash-bikeshare",
        location: {
          city: "Melbourne, AU",
          country: "AU",
          latitude: -37.91238410208696,
          longitude: 145.1362281292677,
        },
        name: "Monash BikeShare",
      },
    ];

    expect(actual).toEqual(expected);
  });

  test("should work for other countries", () => {
    expect(filterByCountry(networks, "MX")).toEqual([
      {
        company: ["ClearChannel"],
        href: "/v2/networks/ecobici",
        id: "ecobici",
        location: {
          city: "Cd de M\u00e9xico",
          country: "MX",
          latitude: 19.4326077,
          longitude: -99.133208,
        },
        name: "EcoBici",
      },
      {
        company: ["BKT bici publica S.A. de C.V.", "PBSC Urban Solutions"],
        gbfs_href: "https://guad.publicbikesystem.net/ube/gbfs/v1/",
        href: "/v2/networks/mibici-guadalajara",
        id: "mibici-guadalajara",
        location: {
          city: "Guadalajara",
          country: "MX",
          latitude: 20.6737883,
          longitude: -103.3704325,
        },
        name: "MIBICI",
      },
    ]);
  });

  test("should work for other alternative networks", () => {
    expect(filterByCountry(alternative, "GB")).toEqual([
      {
        company: ["Groundwork", "Slough Borough Council", "ITS"],
        href: "/v2/networks/cycle-hire-slough",
        id: "cycle-hire-slough",
        location: {
          city: "Slough",
          country: "GB",
          latitude: 51.51135,
          longitude: -0.591562,
        },
        name: "Cycle Hire",
      },
      {
        company: ["PBSC", "Serco Group plc"],
        href: "/v2/networks/santander-cycles",
        id: "santander-cycles",
        location: {
          city: "London",
          country: "GB",
          latitude: 51.51121389999999,
          longitude: -0.1198244,
        },
        name: "Santander Cycles",
      },
    ]);

    expect(filterByCountry(alternative, "PL")).toEqual([
      {
        company: ["Bike U Sp. z o.o."],
        href: "/v2/networks/bbbike",
        id: "bbbike",
        location: {
          city: "Bielsko-Bia\u0142a",
          country: "PL",
          latitude: 49.8225,
          longitude: 19.044444,
        },
        name: "BBBike",
      },
      {
        company: ["Bike U Sp. z o.o."],
        href: "/v2/networks/bikeu-bra",
        id: "bikeu-bra",
        location: {
          city: "Bydgoszcz",
          country: "PL",
          latitude: 53.12193,
          longitude: 18.00038,
        },
        name: "Bydgoski rower aglomeracyjny",
      },
    ]);
  });

  test("should return an empty array if there are networks from that country", () => {
    const actual = filterByCountry(networks, "PL");
    const expected = [];

    expect(actual).toEqual(expected);
  });

  test("should return an empty array if the input is empty", () => {
    const actual = filterByCountry([], "PL");
    const expected = [];

    expect(actual).toEqual(expected);
  });
});

describe("transformNetworks()", () => {
  test("should return an array of all networks, transformed into a different format", () => {
    const actual = transformNetworks(networks);
    expect(actual.length).toEqual(116);
    expect(actual[0]).toEqual({
      id: "velib",
      name: "Velib' M\u00e9trop\u00f4le",
      location: "Paris, FR",
      companies: "Smovengo",
    });
  });

  test("if there are two or more companies, it should join the companies with commas", () => {
    const actual = transformNetworks(networks);
    expect(actual.length).toEqual(116);
    expect(actual[actual.length - 1]).toEqual({
      id: "edinburgh-cycle-hire",
      name: "Just Eat Cycles",
      location: "Edinburgh, UK",
      companies: "Your Bike, Urban Sharing",
    });
    expect(actual[actual.length - 21]).toEqual({
      id: "metro-bike-share",
      name: "Metro Bike Share",
      location: "Los Angeles, CA, US",
      companies:
        "Los Angeles County Metropolitan Transportation Authority (Metro), Bicycle Transit Systems, BCycle, LLC",
    });
  });

  test("should work for alternate inputs", () => {
    const actual = transformNetworks(alternative);
    expect(actual.length).toEqual(75);
    expect(actual[0]).toEqual({
      id: "bycyklen",
      name: "Bycyklen",
      location: "Copenhagen, DK",
      companies: "Gobike A/S",
    });
    expect(actual[actual.length - 1]).toEqual({
      id: "we-cycle",
      name: "WE-cycle",
      location: "Aspen, CO, US",
      companies: "PBSC, Alta Bicycle Share, Inc",
    });
  });

  test("should return an empty array if the input is empty", () => {
    const actual = transformNetworks([]);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});
