console.log("script loaded");

Promise.all([
    fetch("../json/primordial_nodes.json").then(r => r.json()),
    fetch("../json/primordial_edges.json").then(r => r.json())
])
    .then(([nodes, edges]) => {

        console.log("nodes:", nodes);
        console.log("edges:", edges);

        const cy = cytoscape({
            container: document.getElementById("cy"),

            elements: [
                // nodes
                ...nodes.map(n => ({
                    data: {
                        id: n.id,
                        label: n.label
                    }
                })),

                // edges
                ...edges.map((e, i) => ({
                    data: {
                        id: "e" + i,
                        source: e.from,
                        target: e.to,
                        type: e.type
                    }
                }))
            ],

            style: [
                {
                    selector: "node",
                    style: {
                        "label": "data(label)",
                        "background-color": "#60a5fa",
                        "color": "#ffffff",
                        "text-valign": "center",
                        "text-halign": "center",
                        "width": 40,
                        "height": 40
                    }
                },
                {
                    selector: 'edge[type = "parent"], edge[type = "mother"], edge[type = "father"], edge[type = "emerged"]',
                    style: {
                        "label": "data(type)",
                        "line-color": "#0dd847",
                        "color": "#ffffff",
                        "target-arrow-shape": "triangle",
                        "target-arrow-color": "#0dd847",
                        "curve-style": "bezier"
                    }
                },
                {
                    selector: 'edge[type = "spouse"]',
                    style: {
                        "line-color": "#f97316",
                        "target-arrow-color": "#f97316",
                        "width": 3
                    }
                }
            ],

            layout: {
                name: "fcose",
                animate: false,
                randomize: true,
                idealEdgeLength: 150,
                fit: true
            }
        });

    })
    .catch(err => console.error("ERROR:", err));