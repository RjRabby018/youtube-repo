
function romoveClass() {
     const removeActiveClass=document.getElementsByClassName('active');
    for (let btn of removeActiveClass ){
        btn.classList.remove('active')
    }
}

function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
}

// function for load videos
function loadVideos(textInput='') {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${textInput}`)
        .then((res) => res.json())
        .then((data) => {
            romoveClass();
            document.getElementById('btn-all').classList.add('active');
            displayVideos(data.videos)
        })
}

const loadCategoryVideos = (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            romoveClass();
            const clickButton = document.getElementById(`btn-${id}`);
            clickButton.classList.add('active')
            console.log(clickButton)
            displayVideos(data.category)
        })
}
const loadVideoDetails=(videoId)=>{
      const url=`
      https://openapi.programming-hero.com/api/phero-tube/video/${videoId}
      `
      fetch(url)
      .then(res=>res.json())
      .then(data=> displayVideoDetails(data.video))
}
const displayVideoDetails=(video)=>{
    console.log(video);
    document.getElementById('video_details').showModal();
    const displayModal=document.getElementById('modal_container');
    displayModal.innerHTML=`
    <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>
    `
}

function displayCategories(categories) {
    // first i have to take the container of the buttons
    const categoryContainer = document.getElementById('category-container');
    // akhon  3 ta API k loop kore kore nie aste hobe one by one
    for (let cat of categories) {
        // console.log(cat);
        // akhon div create korbo
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoryContainer.appendChild(categoryDiv)
    }
}
const displayVideos = (videos) => {
    //    now i have to call the video container
    const videoContainer = document.getElementById('video-container')
    if (videos.length == 0) {
        videoContainer.innerHTML = `
         <div class="col-span-full flex flex-col justify-center items-center py-6">
        <img class="w-[120px]" src="assets/Icon.png" alt="">
        <h2 class="text-2xl font-bold text-center">Oops!! Sorry, There is no content here</h2>
       </div>
        `
        return;
    }
    videoContainer.innerHTML = "";
    videos.forEach((video) => {
        console.log(video)
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
            <div class="card bg-base-100 ">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover"
                src="${video.thumbnail}" />
                <span class="absolute bottom-2 right-2 text-white bg-black rounded text-sm">3hrs 56 min ago</span>
            </figure>
            <div class=" flex  gap-2 px-0 py-5">
             <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
             </div>
             <div class="intro">
                <h2 class="text-sm font-semibold">Midnight Serenade</h2>
                <p class="text-sm text-gray-500 flex gap-1">${video.authors[0].profile_name}
                ${video.authors[0].verified==true? `
                    <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""
                    `:``}
                </p>
                <p class="text-sm text-gray-500">${video.others.views} views</p>
             </div>
             <div></div>
            </div>
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Display Details</button>
          </div> 
    `
        videoContainer.appendChild(videoCard)
    })
}
document.getElementById('search-input').addEventListener('keyup',(event)=>{
    const input=event.target.value;
    loadVideos(input);
})

loadCategories()