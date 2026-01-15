var searchInput = document.querySelector("#search");
var searchBtn = document.querySelector("#btn");
var loadBtn = document.querySelector("#btn1");
var data1 = document.querySelector(".container");
var preview = document.querySelector(".preview");
var overlayImg = document.querySelector("#overlayImg");


var page = 1;
var query = "nature";
var API_KEY = "Z5RDZiXd3W1uCWqPm8uzCCyT8HRukKqefZ3Boxq6BpgsHfYxbg08zA0k";

function loadImages() {
  fetch(
    `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=12`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      for (var i = 0; i < data.photos.length; i++) {
        var img = document.createElement("img");
        img.src = data.photos[i].src.medium;
        img.addEventListener("click", function () {
          showPreview(this.src);
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
searchInput.addEventListener('keypress',(enter)=> {
  if (enter.key === 'Enter') {
    data1.innerHTML = '';
    page = 1;
    query = searchInput.value;
    loadImages();
  }
});

loadBtn.addEventListener("click", function () {
  page++;
  loadImages();
});


function showPreview(src){
    preview.style.display = "flex";
    overlayImg.src = src;
}

closeBtn.addEventListener("click",()=>{
    preview.style.display = "none";
});

document.addEventListener("keydown", function(close){
  if (close.key === "Escape") {
    preview.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function() {
    var categoryDivs = document.querySelectorAll('.categories div');
    
    categoryDivs.forEach(function(categoryDiv) {
        categoryDiv.addEventListener('click', function() {
            var categoryName = this.getAttribute('data-category');
          
            searchInput.value = categoryName;
            data1.innerHTML = "";
            page = 1;
            query = categoryName;
            loadImages();
        });
    });
});
