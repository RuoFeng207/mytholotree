import { createSearch } from "../components/searchbar.js";

console.log("node search loaded");

window.addEventListener("load", () => {

    const cy = window.graph;
    const search = document.getElementById("nodeSearch");
    const dropdown = document.getElementById("nodeDropdown");

    if (!cy || !search || !dropdown) {
        console.error("Node search not found");
        return;
    }

    function getAvailableNodes() {

        return [...cy.nodes()]
            .filter(node =>
                node.style("display") !== "none"
            )
            .sort((a, b) =>
                a.id().localeCompare(b.id())
            );
    }

    function focusNode(node) {

        if (!node || node.length === 0) {
            console.error("Node not found");
            return;
        }

        window.selectedNode = node;

        if (window.highlightSelectedNode) {
            window.highlightSelectedNode();
        }

        cy.animate({
            fit: {
                eles: node,
                padding: 270
            },
            duration: 500
        });

    }

    function populateNodes(filter = "") {

        dropdown.innerHTML = "";

        const clear = document.createElement("div");

        clear.className = "author-option";
        clear.textContent = "Clear search";

        clear.onclick = (e) => {
            e.stopPropagation();

            search.value = "";
            window.selectedNode = null;
            cy.elements().style("opacity", 1);

            populateNodes("");

            dropdown.style.display = "block";
            search.focus();
        };

        if (filter !== "") {
            dropdown.appendChild(clear);
        }
        
        const nodes = getAvailableNodes();
        const filtered = nodes.filter(node =>
            node.id().toLowerCase().includes(filter.toLowerCase())
        );

        filtered.forEach(node => {

            const option = document.createElement("div");

            option.className = "author-option";

            option.textContent =
                node.id().charAt(0).toUpperCase() + node.id().slice(1);

            option.onclick = () => {

                search.value =
                    node.id().charAt(0).toUpperCase() + node.id().slice(1);

                dropdown.style.display = "none";

                focusNode(node);

            };

            dropdown.appendChild(option);

        });

    }

    createSearch(
        search,
        dropdown,
        ".node-picker",
        populateNodes
    );

    search.addEventListener("keydown", (e) => {

        if (e.key !== "Enter") return;

        const query = search.value.toLowerCase();

        const match = getAvailableNodes().find(node =>
            node.id().toLowerCase() === query
        );


        if (match) {

            search.value =
                match.id().charAt(0).toUpperCase() + match.id().slice(1);

            dropdown.style.display = "none";

            focusNode(match);

        }

    });

});