console.log("author filter loaded");

window.addEventListener("load", () => {

    const cy = window.graph;
    const select = document.getElementById("authorSelect");

    if (!cy || !select) {
        console.error("Graph or select not found");
        return;
    }

    const authorsSet = new Set();

    cy.edges().forEach(edge => {

        const value = edge.data("author");

        if (!value) return;

        const list = Array.isArray(value)
            ? value
            : [value];

        list.forEach(author => {
            authorsSet.add(author);
        });
    });

    const authors = [...authorsSet].sort((a, b) =>
        a.localeCompare(b)
    );

    select.innerHTML = `<option value="all">All</option>`;

    authors.forEach(author => {

        const option = document.createElement("option");

        option.value = author;
        option.textContent = author.charAt(0).toUpperCase() + author.slice(1);

        select.appendChild(option);
    });

    function applyAuthorFilter() {

        const selectedAuthor = select.value.toLowerCase();

        cy.elements().style("display", "none");

        if (selectedAuthor === "all") {

            cy.elements().style("display", "element");

            if (window.highlightSelectedNode) {
                window.highlightSelectedNode();
            }

            return;
        }

        let visible = cy.collection();

        cy.edges().forEach(edge => {

            const author = edge.data("author") || [];

            if (author.includes(selectedAuthor)) {

                visible = visible.union(edge);
                visible = visible.union(edge.source());
                visible = visible.union(edge.target());
            }
        });

        visible.style("display", "element");
        if (window.highlightSelectedNode) {
            window.highlightSelectedNode();
        }
        // visible.style("opacity", 1);


        window.graph.edges().forEach(e =>
            console.log(e.data("author"))
        );
    }

    applyAuthorFilter();
    select.addEventListener("change", applyAuthorFilter);
});