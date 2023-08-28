const accessKey = "3Ddh_NCe3omD5Lu1bI1XTGEgCUoDLVu0cAXG-iCxJLY"

const formElement = document.querySelector("form")
const inputElement = document.getElementById("search_input")
const searchResults = document.querySelector(".search_results")
const showmore = document.getElementById("show-more-button")

let inputdata = ""
let page = 1;

async function searchImages(){
    inputdata = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if(page === 1){
        searchResults.innerHTML = ""
    }

    results.map((results) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search_result");
        const image = document.createElement('img');
        image.src = results.urls.small;
        image.alt = results.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = results.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = results.description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        imageWrapper.appendChild(imageWrapper);
    });

    page++
    if(page > 1){
        showmore.style.display = "block"
    }
}


formElement.addEventListener("submit",(event) =>{
    event.preventDefault()
    page = 1
    searchImages()

})