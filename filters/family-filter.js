console.log("family filter loaded");

window.selectedNode = null;

window.addEventListener("load", () => {

    const cy = window.graph;

    if (!cy) {
        console.error("Graph not found");
        return;
    }

    window.highlightSelectedNode = () => {

        if (!window.selectedNode) return;

        const root = window.selectedNode;

        // Dim everything
        cy.elements().style("opacity", 0.3);

        // Collection of elements to highlight
        let highlight = cy.collection();

        // Self
        highlight = highlight.union(root);

        // Direct parents
        const visibleEdges = cy.edges().filter(edge =>
            edge.style("display") !== "none"
        );

        const parents = visibleEdges
            .filter(edge => edge.target() === root)
            .sources();

        highlight = highlight.union(parents);

        // Direct children
        const children = visibleEdges
            .filter(edge => edge.source() === root)
            .targets();

        highlight = highlight.union(children);

        // Direct siblings (nodes that share a parent)
        let siblings = cy.collection();

        parents.forEach(parent => {

            const parentChildren = visibleEdges
                .filter(edge => edge.source() === parent)
                .targets();

            siblings = siblings.union(parentChildren);
        });

        highlight = highlight.union(siblings);

        // Highlight edges only when both endpoints are visible
        cy.edges().forEach(edge => {

            const source = edge.source();
            const target = edge.target();

            if (
                highlight.contains(source) &&
                highlight.contains(target) &&
                edge.style("display") !== "none"
            ) {
                highlight = highlight.union(edge);
            }
        });

        // Apply highlight
        highlight.style("opacity", 1);
    };

    // Handle node clicks
    cy.on("tap", "node", (evt) => {

        const root = evt.target;

        window.selectedNode = root;

        window.highlightSelectedNode();
    });

    // Reset when clicking empty space
    cy.on("tap", (evt) => {

        if (evt.target === cy) {

            window.selectedNode = null;

            cy.elements().style("opacity", 1);
        }
    });

});