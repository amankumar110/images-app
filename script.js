const BASE_URL = "https://api.unsplash.com/photos/";
const container = document.querySelector(".container");
const loader = document.querySelector("#loader");
let pagecount = 1;
const img_per_page = 4;
let topheading = 1;
let imageOrientation = "portrait";

const details = navigator.userAgent;
const regexp = /android|iphone|kindle|ipad/i;

const isMobileDevice = regexp.test(details);

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
  const images = await getImages();
  if (images !== null) {
    for (const img of images) {
      const imgUrl = isMobileDevice ? img.urls.regular : img.urls.regular;
      const html = document.createElement("img");
      html.src = imgUrl;
      container.insertAdjacentElement("beforeend", html);
      html.classList.add("border");
    }
  }
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
