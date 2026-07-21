console.log("author filter loaded");

window.addEventListener("load", () => {

    const cy = window.graph;
    const search = document.getElementById("authorSearch");
    const dropdown = document.getElementById("authorDropdown");

    if (!cy || !search || !dropdown) {
        console.error("Graph or author elements missing");
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


    let selectedAuthor = "all";

    function applyAuthorFilter() {


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

    }

    search.addEventListener("input", () => {
        populateAuthors(search.value);
    });
    
    document.addEventListener("click", (event) => {

        if (!event.target.closest(".author-picker")) {

            dropdown.style.display = "none";

        }

    });


    applyAuthorFilter();

});