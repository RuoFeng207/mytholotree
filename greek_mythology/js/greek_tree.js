console.log("script loaded");

import { nodes } from "../data/primordial_nodes.js";
import { edges as allEdges } from "../data/primordial_edges.js";

// Remove duplicate spouse/procreation edges
const seen = new Set();

const edges = allEdges.filter(e => {

    if (e.type !== "spouse" && e.type !== "procreation") {
        return true;
    }

    const key = [e.from, e.to].sort().join("-") + "-" + e.type;

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
});

const COLORS = {
    node: "#042349",
    hover: "#063976",
    text: "#ffffff",
    parent_edge: "#1aff00",
    spouse_edge: "#fe03e9",
    procreation_edge: "#c400ff",
    affair_edge: "#ff8000"

};

window.graph = cytoscape({
    container: document.getElementById("cy"),

    elements: [
        ...nodes.map(n => ({
            data: {
                id: n.id,
                label: n.label,
                group: n.group
            }
        })),

        ...edges.map((e, i) => ({
            data: {
                id: "e" + i,
                source: e.from,
                target: e.to,
                type: e.type,
                author: Array.isArray(e.author) ? e.author : [e.author]

            }
        }))
    ],

    style: [

        {
            selector: "node",
            style: {
                "label": "data(label)",
                "background-color": "#042349",
                "color": COLORS.text,
                "text-valign": "center",
                "text-halign": "center",
                "width": 40,
                "height": 40,
                "overlay-opacity": 0,
                "overlay-padding": 0
            }
        },

        {
            selector: "node:selected",
            style: {
                "background-color": "#063976",
            }
        },

        {
            selector: "node.hovered",
            style: {
                "background-color": "#063976"
            }
        },

        {
            selector: "edge",
            style: {
                "width": 2,
                "line-color": "#2f3230",
                "target-arrow-color": "#2f3230",
                "target-arrow-shape": "triangle",
                "curve-style": "bezier",
                "label": "",
                "overlay-opacity": 0,
                "overlay-padding": 0
            }
        },

        {
            selector: "edge:selected",
            style: {
                "label": "data(type)",
                "font-size": "10px",
                "color": "#ffffff"
            }
        },
        {
            selector: "edge.hovered",
            style: {
                "label": "data(type)",
                "font-size": "10px",
                "color": "#ffffff",
                "width": 5,
                "text-opacity": 1
            }
        },

        // Parents
        {
            selector: 'edge[type = "mother"], edge[type = "father"], edge[type = "parent"], edge[type = "emerged"]',
            style: {
                "line-color": "#1aff00",
                "target-arrow-color": "#1aff00"
            }
        },

        // Spouse
        {
            selector: 'edge[type = "spouse"]',
            style: {
                "line-color": "#fe03e9",
                "target-arrow-shape": "none",
                "source-arrow-shape": "none"
            }
        },

        // Procreation (lighter pink)
        {
            selector: 'edge[type = "procreation"]',
            style: {
                "line-color": "#c400ff",
                "width": 3,
                "target-arrow-shape": "none",
                "source-arrow-shape": "none"
            }
        },

        // Affair
        {
            selector: 'edge[type = "affair"]',
            style: {
                "line-color": "#ff8000",
                "line-style": "dashed",
                "target-arrow-shape": "none",
                "source-arrow-shape": "none"
            }
        }
    ],
});

window.graph.layout({
    name: "circle",
    animate: false,
    fit: true
}).run();

window.graph.layout({
    name: "fcose",
    animate: false,
    randomize: false,
    fit: false,
    gravity: 0,
    nodeRepulsion: 250000,
    idealEdgeLength: 50,
    numIter: 50
}).run();

window.graph.ready(() => {

    const chaos = window.graph.$id("chaos");

    window.graph.fit(chaos, 270);

    window.graph.on("mouseover", "node", (evt) => {
        evt.target.addClass("hovered");
    });

    window.graph.on("mouseout", "node", (evt) => {
        evt.target.removeClass("hovered");
    });

    window.graph.on("mouseover", "edge", (evt) => {

        const edge = evt.target;

        edge.data("oldWidth", edge.style("width"));

        edge.style("width", parseFloat(edge.style("width")) * 2);

    });

    window.graph.on("mouseout", "edge", (evt) => {

        const edge = evt.target;

        edge.style("width", edge.data("oldWidth"));

    });

});