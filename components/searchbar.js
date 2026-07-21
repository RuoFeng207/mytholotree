console.log("searchbar loaded");

export function createSearch(input, dropdown, container, populate) {

    input.addEventListener("focus", () => {

        populate(input.value);

        dropdown.style.display = "block";

    });

    input.addEventListener("input", () => {

        populate(input.value);

        dropdown.style.display = "block";

    });

    document.addEventListener("click", (event) => {

        if (!event.target.closest(container)) {

            dropdown.style.display = "none";

        }

    });

}