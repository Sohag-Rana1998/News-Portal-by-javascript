const buttonContainer = document.getElementById("button-container");
const newsContainer = document.getElementById('news-container');
const inputField = document.getElementById('search-field');
const searchButton = document.getElementById("search");


const loadCategory = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
  const data = await response.json();
  const categoryAll = data.data.news_category;
  let number = 0;
  console.log(number);
  // console.log(categoryAll);
  categoryAll.forEach(category => {
    number++;
    const catButton = document.createElement('button');
    catButton.classList = 'btn btn-accent';
    const categoryName = category.category_name;
    let categoryId = category.category_id;
    catButton.innerText = `${number}: ${categoryName}`;
    buttonContainer.appendChild(catButton);
    console.log(number);
    catButton.addEventListener('click', () => {
      displayNews(categoryId);
      const spinner = document.getElementById('spinner');
      spinner.classList.remove('hidden');
    }
    )
  });


}



const displayNews = async (category) => {
  const detailsContainer = document.getElementById('details-container');
  const allNewsContainer = document.getElementById('news-container');
  detailsContainer.classList.add('hidden');
  allNewsContainer.classList.remove('hidden');

  const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${category}`);

  const data = await response.json();
  const allNews = data.data;
  // console.log(allNews)
  newsContainer.innerHTML = '';

  if (allNews.length === 0) {
    newsContainer.innerText = 'No news found.....'
  }
  allNews.forEach((news) => {

    const singleNews = document.createElement('div');
    singleNews.className = "flex justify-between gap-3 border-2 border-blue-500 rounded-xl p-4 mt-5";
    singleNews.innerHTML = `
    <div class="w-[30%]">
          <img class="rounded-xl h-full " src="${news.image_url
      }" alt="">
        </div>
        <div class="w-[65%]">
          <div id="news-title" class="font-bold text-left">
            ${news.title}
          </div>
          <div class="new-details ">${news.details.slice(0, 200)}</div>
          <div class="flex items-center justify-between ">
            <div class="autor-name mt-3 font-bold">
              <h6>${news.author?.name}</h6>
              <h6>${news.author?.published_date}</h6>
            </div>
            <div>
              <button onclick="showDetails('${news._id}')" class="btn">Details
              </button>
            </div>
          </div>

        </div>
    `;

    newsContainer.appendChild(singleNews);
  })

  const spinner = document.getElementById('spinner');
  spinner.classList.add('hidden');
}



const showDetails = async (id) => {
  console.log(id)
  const response = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
  const data = await response.json();
  const details = data.data[0];
  console.log(details);
  const detailsContainer = document.getElementById('details-container');
  const allNewsContainer = document.getElementById('news-container');
  detailsContainer.classList.remove('hidden');
  allNewsContainer.classList.add('hidden');

  detailsContainer.innerHTML = `
<div class="w-full">
          <img class="rounded-xl h-full " src="${details.image_url
    }" alt="">
        </div>
        <div class="w-full">
          <div id="news-title" class="font-bold text-left">
            ${details.title}
          </div>
          <div class="new-details ">${details.details}</div>
          <div class="flex items-center justify-between ">
            <div class="autor-name mt-3 font-bold">
              <h6>${details.author?.name}</h6>
              <h6>${details.author?.published_date}</h6>
            </div>
            <div>
              <button id="back" onclick="backToHome()" class="btn">Back to Home
              </button>
            </div>
          </div>

        </div>
  `;
}


const backToHome = () => {
  displayNews('01');
  const detailsContainer = document.getElementById('details-container');
  const allNewsContainer = document.getElementById('news-container');
  detailsContainer.classList.add('hidden');
  allNewsContainer.classList.remove('hidden');

}

const searchById = () => {
  const inputText = inputField.value;
  const searchId = `0${inputText}`
  displayNews(searchId);

}



displayNews('08');

loadCategory();
