const BASE_URL = "https://api.unsplash.com/photos/";
const container = document.querySelector(".container");
const loader = document.querySelector("#loader");
let pagecount = Math.floor(Math.random() * 30);
let img_per_page = 4;
let details = navigator.userAgent;
let imageOrientation = "portrait";
let regexp = /android|iphone|kindle|ipad/i;
let isMobileDevice = regexp.test(details)
if (isMobileDevice) {
  img_per_page = 2;
}

async function getImages() {
  try {
    const API_KEY = "VCjBjrHX4as4FGG9mCamCS4tbGcyg6VOdzDxWofx-P0";
    const res = await fetch(
      `${BASE_URL}?orientation=${imageOrientation}&page=${pagecount}&per_page=${img_per_page}&client_id=${API_KEY}`
    );
      const data = await res.json();
      return data;
    
  } catch (e) {
    console.log("Error: " + e);
    return null;
  }
}

async function showImages() {
  loader.style.display = "block";
  const images = await getImages();
  if (images !== null) {
    for (const img of images) {
      const imghtml = document.createElement("img");
     const likediv = createLikeContainer();
      imgUrl = img.urls.regular;
      imghtml.src = imgUrl;
      imghtml.alt = img.alt_description;
      container.insertAdjacentElement("beforeend", imghtml);
      imghtml.classList.add("border");
      imghtml.insertAdjacentElement("afterend",likediv);
      likediv.style.display = "flex"
    }
  } else {
    container.textContent = "Something went wrong";
    loader.style.display = "none";
  }
};
function createLikeContainer(){
  const div = document.createElement("div");
  div.classList.add("likediv");
  const ratinginfo = "Rate this image";
  div.append(ratinginfo);
  const select = document.createElement("select");
  select.value = "Rate";
  div.appendChild(select);
  for (let i = 1; i < 6; i++) {
    const option = document.createElement("option");
    option.textContent = i ;
    option.value = i;
    select.appendChild(option);
  }
  return div;
}
function update_page_count() {
  setTimeout(() => {
    showImages();
    pagecount++;
  }, 300);
}
window.addEventListener("scroll", () => {
  const clientHeight = document.documentElement.clientHeight;
  const scrolltop = document.documentElement.scrollTop;
  const fullheight = document.documentElement.scrollHeight;
  if (clientHeight + scrolltop >= fullheight) {
    update_page_count();
  }
});
showImages();
