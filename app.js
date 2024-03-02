const btnContainer = document.getElementById("btn-container");
const cardContainer = document.getElementById("card-container");
const errorElement = document.getElementById("error-element");
let selectedCategory = 1000;

const fetchCatagories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  data.data.forEach((card) => {
    // console.log(card);
    const newBtn = document.createElement("button");
    newBtn.innerText = card.category;
    newBtn.className = "btn bg-state-700 text-lg";
    newBtn.addEventListener("click", () =>
      fetchDataByCategories(card.category_id)
    );
    btnContainer.appendChild(newBtn);
  });
};

const fetchDataByCategories = async (catId) => {
  selectedCategory = catId;
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${catId}`
  );
  const data = await response.json();
  cardContainer.innerHTML = "";
  data.data.forEach((video) => {
    let verifiedBadge = "";
    if (video.authors[0].verified) {
      verifiedBadge = `<img src="./Group 3.svg" />`;
    }
    const newCard = document.createElement("div");
    newCard.innerHTML = `
    <div class="card  bg-base-100 mt-4 gap-4">
    <figure >
      <img class="w-[400px] h-[252px] rounded-t-lg"
        src="${video.thumbnail}"
      />
    </figure>
    <div class="card-body">
      <div class="flex gap-3">
        <div>
          <img class=" rounded-full h-8 w-8"
            src="${video.authors[0].profile_picture}"
            alt=""
          />
        </div>
        <h2 class="card-title">${video.title}</h2>
      </div>
      <div class="flex gap-2 ml-11">
        <span>${video.authors[0].profile_name}</span>
          ${verifiedBadge}
      </div>
      <p class="ml-11">${video.others.views}</p>
    </div>
  </div>
    `;
    cardContainer.appendChild(newCard);
  });
};

fetchCatagories();
fetchDataByCategories(selectedCategory);
