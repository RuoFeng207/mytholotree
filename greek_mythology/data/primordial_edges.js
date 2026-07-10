export const edges = [

    // Chaos
    { from: "chaos", to: "nyx", type: "emerged", author: ["hesiod","hyginus"] },
    { from: "chaos", to: "erebus", type: "emerged", author: ["hesiod", "hyginus"] },
    { from: "chaos", to: "aether", type: "emerged", author: "hyginus" },
    { from: "chaos", to: "hemera", type: "emerged", author: "hyginus" },
    { from: "chaos", to: "eros", type: "emerged", author: "oppian" },
    { from: "chaos", to: "moirai", type: "emerged", author: "quintus" },


    // Gaia
    { from: "gaia", to: "uranus", type: "mother", author: "hesiod" },
    { from: "gaia", to: "uranus", type: "spouse", author: "hesiod", primary: true },
    { from: "gaia", to: "tartarus", type: "procreation", author: "hesiod", primary: true },


    // Tartarus
    { from: "tartarus", to: "gaia", type: "procreation", author: "hesiod", primary: false },

    // Nyx
    { from: "nyx", to: "erebus", type: "spouse", author: "hesiod", primary: true },
    { from: "nyx", to: "aether", type: "mother", author: "hesiod" },
    { from: "nyx", to: "hemera", type: "mother", author: "hesiod" },


    // Erebus
    { from: "erebus", to: "nyx", type: "spouse", author: "hesiod", primary: false },
    { from: "erebus", to: "aether", type: "father", author: "hesiod" },
    { from: "erebus", to: "hemera", type: "father", author: "hesiod" },

    // Aether
    { from: "aether", to: "hemera", type: "spouse", author: ["hesiod", "hyginus"], primary: true },



];