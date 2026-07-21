export const edges = [

    // Test
    { from: "testA", to: "testB", type: "spouse", author: "test", primary: false },
    // Chaos
    { from: "chaos", to: "nyx", type: "emerged", author: "hesiod" },
    { from: "chaos", to: "erebus", type: "emerged", author: "hesiod" },

    // Gaia
    { from: "gaia", to: "uranus", type: "mother", author: "hesiod" },
    { from: "gaia", to: "uranus", type: "spouse", author: "hesiod", primary: true },
    { from: "gaia", to: "tartarus", type: "procreation", author: "hesiod", primary: true },


    // Tartarus
    { from: "tartarus", to: "gaia", type: "procreation", author: "hesiod", primary: false },

    // Nyx
    { from: "nyx", to: "erebus", type: "spouse", author: "hesiod", primary: true },
    { from: "nyx", to: "aether", type: "mother", author: "hesiod"},
    { from: "nyx", to: "hemera", type: "mother", author: "hesiod"},

    
    // Erebus
    { from: "erebus", to: "nyx", type: "spouse", author: "hesiod", primary: false },
    { from: "erebus", to: "aether", type: "father", author: "hesiod"},
    { from: "erebus", to: "hemera", type: "father", author: "hesiod"},

    // Aether
    { from: "aether", to: "hemera", type: "spouse", author: ["hesiod","hyginus","a","b","c","d"], primary: true },



];