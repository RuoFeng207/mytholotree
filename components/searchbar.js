console.log("searchbar loaded");


export function createSearch(input, getItems, onResults) {

    input.addEventListener("input", () => {

        const query = input.value.toLowerCase();


        const items = getItems();

        const results = items.filter(item =>
            item.toLowerCase().includes(query)
        );
        onResults(results);

    });

}