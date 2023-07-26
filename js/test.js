const rootPath = window.location.href.split("#")[0] + "#"; // Dynamic root path based on the current URL
const indexFile = "http://sdwebau.shopainternal.com.s3-website-ap-southeast-2.amazonaws.com/json/aaa_productlist.json";

let productData = []; // To store the fetched product list
let currentPage = 0; // Current page index
const itemsPerPage = 10; // Display only one product per page

// Fetch the index file to get the list of products
fetch(indexFile)
    .then(response => response.json())
    .then(data => {
        productData = data;

        // Handle the initial URL
        const initialProduct = window.location.hash.slice(1); // Get the product name from the URL
        const initialProductIndex = productData.findIndex(product => product.ProductName.replace(/\s+/g, "-").toLowerCase() === initialProduct);
        if (initialProductIndex !== -1) {
            currentPage = Math.floor(initialProductIndex / itemsPerPage);
            loadProductPage(currentPage);
        } else {
            loadProductData();
        }
    })
    .catch(error => console.error("Error fetching index file:", error));

// Function to load product data dynamically
function loadProductData() {
    currentPage = 0; // Reset to the first page when loading product data

    loadProductPage(currentPage);
}

// Function to load a specific page of product data
function loadProductPage(page) {
    currentPage = page;

    // Calculate the index of the product to display on the current page
    const productIndex = currentPage * itemsPerPage;
    const product = productData[productIndex];

    const productInfoDiv = document.getElementById("productInfo");
    productInfoDiv.innerHTML = ""; // Clear existing content

    // Display the product on the current page
    productInfoDiv.innerHTML = `
        <h2>${product.Headline}</h2>
        
        <p><strong>Product Name:</strong> ${product.ProductName.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}</p>
        <p><strong>Advertiser:</strong> ${product.Advertiser}</p>
        <hr>
    `;

    // Update the pagination buttons
    const paginationDiv = document.getElementById("pagination");
    const prevButton = paginationDiv.querySelector("button:nth-child(1)");
    const nextButton = paginationDiv.querySelector("button:nth-child(2)");

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === Math.floor(productData.length / itemsPerPage);

    // Update the URL with the product name
    const productNameInURL = product.ProductName.replace(/\s+/g, "-").toLowerCase();
    const productURL = rootPath + productNameInURL;
    history.pushState(null, null, productURL);
}

// Function to load the previous page of product data
function loadPreviousProduct() {
    if (currentPage > 0) {
        loadProductPage(currentPage - 1);
    }
}

// Function to load the next page of product data
function loadNextProduct() {
    if (currentPage < Math.floor(productData.length / itemsPerPage)) {
        loadProductPage(currentPage + 1);
    }
}
