console.log("author filter loaded");

window.addEventListener("load", () => {

    const cy = window.graph;
    const select = document.getElementById("authorSelect");

    if (!cy || !select) {
        console.error("Graph or select not found");
        return;
    }

    function applyAuthorFilter() {

        const selectedAuthor = select.value.toLowerCase();

        cy.elements().style("display", "none");

        if (selectedAuthor === "all") {
            cy.elements().style("display", "element");
            return;
        }

        let visible = cy.collection();

        cy.edges().forEach(edge => {

            const author = (edge.data("author") || "").toLowerCase();

            if (author === selectedAuthor) {

                visible = visible.union(edge);
                visible = visible.union(edge.source());
                visible = visible.union(edge.target());
            }
        });

        visible.style("display", "element");
        // visible.style("opacity", 1);

    }

    applyAuthorFilter();
    select.addEventListener("change", applyAuthorFilter);
});