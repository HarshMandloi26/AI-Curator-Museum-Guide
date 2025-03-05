const searchForm = document.getElementById("searchForm");
const resultsDiv = document.getElementById("results");
const bookmarkedToursList = document.getElementById("bookmarkedTours");
const darkModeToggle = document.getElementById("darkModeToggle");
const loadingDiv = document.getElementById("loading");
const filterOptionsDiv = document.getElementById("filterOptions");

const museumData = [
    { title: "The Louvre", category: "Art", link: "https://www.louvre.fr/en" },
    { title: "Smithsonian Museum", category: "History", link: "https://www.si.edu/museums" },
    { title: "Museum of Science", category: "Science", link: "https://mos.org/" },
    { title: "British Museum", category: "History", link: "https://www.britishmuseum.org/" },
    { title: "AI & Robotics Expo", category: "Technology", link: "https://ai-expo.com/" },
    { title: "Natural History Museum", category: "Science", link: "https://www.nhm.ac.uk/" }
];

searchForm.onsubmit = function (e) {
    e.preventDefault();
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!searchInput) return;

    resultsDiv.innerHTML = "";
    filterOptionsDiv.innerHTML = ""; 
    loadingDiv.style.display = "block";

    const matchedResults = museumData.filter(item =>
        item.title.toLowerCase().includes(searchInput) || 
        item.category.toLowerCase().includes(searchInput)
    );

    if (matchedResults.length === 0) {
        resultsDiv.innerHTML = "<p>❌ No results found. Try another search.</p>";
    } else {
        
        createFilterButtons([...new Set(matchedResults.map(item => item.category))]);

        resultsDiv.innerHTML = "<h3>🔍 Search Results:</h3><ul>";
        matchedResults.forEach(item => {
            resultsDiv.innerHTML += `<li><a href="${item.link}" target="_blank">${item.title} (${item.category})</a></li>`;
        });
        resultsDiv.innerHTML += "</ul>";
    }

    loadingDiv.style.display = "none";  
};


function createFilterButtons(categories) {
    categories.forEach(category => {
        const button = document.createElement("button");
        button.classList.add("filter-btn");
        button.textContent = category;
        button.onclick = () => filterResults(category);
        filterOptionsDiv.appendChild(button);
    });
}


function filterResults(category) {
    resultsDiv.innerHTML = "<h3>🔍 Filtered Results:</h3><ul>";
    museumData.filter(item => item.category === category).forEach(item => {
        resultsDiv.innerHTML += `<li><a href="${item.link}" target="_blank">${item.title} (${item.category})</a></li>`;
    });
    resultsDiv.innerHTML += "</ul>";
}


darkModeToggle.onclick = function () {
    document.body.classList.toggle("dark-mode");
};
