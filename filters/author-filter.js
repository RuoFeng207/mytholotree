import { createSearch } from "../components/searchbar.js";

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

    search.value = "All";


    function populateAuthors(filter = "") {

        dropdown.innerHTML = "";


        const clear = document.createElement("div");

        clear.className = "author-option";
        clear.textContent = "Clear searchbar";


        clear.onclick = (e) => {

            e.stopPropagation();

            search.value = "";

            populateAuthors("");

            dropdown.style.display = "block";

            search.focus();

        };


        const all = document.createElement("div");

        all.className = "author-option";
        all.textContent = "All";


        all.onclick = () => {

            selectedAuthor = "all";

            search.value = "All";

            dropdown.style.display = "none";

            applyAuthorFilter();

        };


        const filtered = authors.filter(author =>
            author.toLowerCase()
                .includes(filter.toLowerCase())
        );

        if (
            filtered.length === 0 &&
            filter !== "" &&
            filter.toLowerCase() !== "all"
        ) {

            const error = document.createElement("div");

            error.className = "author-option error-option";
            error.textContent =
                `No author "${filter}" found.`;

            dropdown.appendChild(error);

            dropdown.appendChild(clear);

            return;

        }
        
        if (filter !== "") {
            dropdown.appendChild(clear);
        }

        if (
            filter === "" ||
            filter.toLowerCase() === "all"
        ) {
            dropdown.appendChild(all);
        }


        filtered.forEach(author => {

            const option = document.createElement("div");

            option.className = "author-option";


            option.textContent =
                author.charAt(0).toUpperCase() + author.slice(1);


            option.onclick = () => {

                selectedAuthor = author.toLowerCase();


                search.value =
                    author.charAt(0).toUpperCase() + author.slice(1);


                dropdown.style.display = "none";


                applyAuthorFilter();

            };


            dropdown.appendChild(option);

        });

    }

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



    createSearch(
        search,
        dropdown,
        ".author-picker",
        populateAuthors
    );



    search.addEventListener("keydown", (e) => {

        if (e.key !== "Enter") return;


        const query = search.value.trim().toLowerCase();


        if (query === "" || query === "all") {

            selectedAuthor = "all";

            search.value = "All";

            dropdown.style.display = "none";

            applyAuthorFilter();

            return;

        }


        const match = authors.find(author =>
            author.toLowerCase() === query
        );


        if (match) {

            selectedAuthor = match.toLowerCase();


            search.value =
                match.charAt(0).toUpperCase() + match.slice(1);


            dropdown.style.display = "none";


            applyAuthorFilter();

        }
        else {

            populateAuthors(query);

            dropdown.style.display = "block";

        }

    });



    applyAuthorFilter();

});