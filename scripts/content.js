/**
 Array.from(document.getElementsByClassName("p-table-row")).slice(1).reduce((acc, e) => Number(e.children[1].innerText.replace(/,/g, '.')) + acc, 0)
 */
 console.log("content.js initiated", window.location.href);

if (window.location.href.includes("app.employes.nl/employee/") && window.location.href.includes("/time-registration")) {
    window.addEventListener('load', function(e) {
        setTimeout(() => {
            // observe the table for changes (get node of table)
            const list = document.querySelector("p-table-container > :nth-child(3)");

            // create an observer instance
            const observer = new MutationObserver(function() {
                // only update once per mutation
                updateTotal();
            });

            // pass in the target node, as well as the observer options
            observer.observe(list, {
                childList: true,
                subtree: true
            });

            console.log("content.js loaded", e);

            updateTotal();
        }, 1000);


    }, false);
} else {
    console.log("content.js not loaded");

}

// Update the total based on the rows
function updateTotal() {
    setTimeout(() => {
        const rows = Array.from(document.getElementsByClassName("p-table-row")).filter(e => e.classList.contains("injected-total-element") == false);

        // get total elements on page
        const total = rows.slice(1).reduce((acc, e) => Number(e.children[1].innerText.replace(/,/g, '.')) + acc, 0).toLocaleString("nl-NL", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        // check if total element already exists
        let totalElement = document.getElementsByClassName("injected-total-element");

        if (totalElement && totalElement.length > 0) {
            console.log("total element already exists");
            totalElement[0].children[1].innerText = total;
            totalElement[0].children[3].innerText = total;
            return;
        }

        console.log("total element does not exist")

        totalElement = rows[0].cloneNode(true);
        totalElement.classList.add("injected-total-element");
        totalElement.classList.remove("p-table-row");
        for (let i = 0; i < totalElement.children.length; i++) {
            if (i == 0) {
                totalElement.children[i].innerText = "Total";
                continue;
            }

            if (i == 1 || i == 3) {
                totalElement.children[i].innerText = total;
                totalElement.children[i].style.fontWeight = "bold";
                continue;
            }

            totalElement.children[i].innerText = "";
        }

        // add the total to the second column
        const footer = document.getElementsByClassName("p-table-footer")[0];
        footer.insertAdjacentElement("afterend", totalElement);
    }, 250);
}