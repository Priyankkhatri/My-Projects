var searchInput = document.querySelector("#search");
var searchBtn = document.querySelector("#btn");
var loadBtn = document.querySelector("#btn1");
var data1 = document.querySelector(".container");

var preview = document.querySelector(".preview");
var bigImg = document.querySelector("#bigImg");
var download = document.querySelector("#download");

var page = 1;
var query = "nature";
var API_KEY = "Z5RDZiXd3W1uCWqPm8uzCCyT8HRukKqefZ3Boxq6BpgsHfYxbg08zA0k";

function loadImages() {
    fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`, {
        headers: {
            Authorization: API_KEY
        }
    })
    .then(res => res.json())
    .then(data => {
        for (var i = 0; i < data.photos.length; i++) {
            var img = document.createElement("img");
            img.src = data.photos[i].src.medium;

            img.addEventListener("click", function () {
                showImage(this.src);
            });

            data1.appendChild(img);
        }
    });
}

searchBtn.addEventListener("click", function () {
    data1.innerHTML = "";
    page = 1;
    query = searchInput.value;
    loadImages();
});

loadBtn.addEventListener("click", function () {
    page++;
    loadImages();
});

function showImage(src) {
    preview.style.display = "flex";
    bigImg.src = src;
    download.onclick = function () {
        window.open(src);
    };
}

preview.addEventListener("click", function () {
    preview.style.display = "none";
});
