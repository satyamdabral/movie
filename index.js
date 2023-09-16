let currentPage = 1;
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");

nextButton.addEventListener("click", ()=>{
    currentPage++;
    updatePage();
    if (currentPage <= 1) {
        prevButton.disabled = false;
    }
})

prevButton.addEventListener("click", ()=>{
    if(currentPage > 1 ){
        currentPage--;
        updatePage();
    }
    
    if (currentPage < 1) {
        currentPage=1;
        prevButton.disabled = true;
    }
   
})


const APIURL =
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${currentPage}`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const moiveBox = document.querySelector("#movie-box")
const getMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    showMovies(data)
}
getMovies(APIURL);


const showMovies = (data) => {
    moiveBox.innerHTML = "";
    data.results.forEach(
        (result) => {
            const imagePath = result.poster_path === null ? "image-missing.png" : IMGPATH + result.poster_path;

            const box = document.createElement("div")
            box.classList.add("box")
            box.innerHTML = `
                <img src="${imagePath}" alt="" />
                <div class="overlay">
                    <div class="title"> 
                        <h2> ${result.original_title}  </h2>
                        <span> ${result.vote_average} <span>
                    </div>
                    <h3>Overview:</h3>
                    <p> 
                        ${result.overview}
                    </p>
                 </div>
            `
            moiveBox.appendChild(box)
        }
    )
}

document.querySelector("#search").addEventListener(
    "keyup",
    function (event) {
        if (event.target.value != "") {
            getMovies(SEARCHAPI + event.target.value)
        } else {
            getMovies(APIURL);
        }
    }
)
const updatePage = () => {
    const updatedUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${currentPage}`;
    getMovies(updatedUrl);
    window.scrollTo(0, 0);
  };
