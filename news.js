let news = [];
let newsBoard = document.querySelector("#news-board");
let menus = document.querySelectorAll(".menus button");
let searchButton = document.querySelector("#search-button");
let url;

menus.forEach((item) =>
  item.addEventListener("click", (event) => getByTopics(event))
);

//각 함수에서 필요한 url을 만든다
//api 호출 함수를 부른다

const getNews = async () => {
  try {
    let header = new Headers({
      "x-api-key": "hZRQ8BrCqtlcAEney7A_iH0nMiloEigdr_CvlYvZxhY",
    });
    let response = await fetch(url, { headers: header });
    let data = await response.json();

    if (response.status === 200) {
      if (data.total_hits === 0) {
        throw new Error("검색된 결과값이 없습니다.");
      }
      news = data.articles;
      console.log(news);
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("잡힌 에러는:", error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport`
  );
  getNews();
};

const getByTopics = async (event) => {
  const topics = event.target.textContent.toLowerCase();

  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${topics}`
  );
  getNews();
};

const getByKewords = async () => {
  let keyWord = document.querySelector("#search-input").value;
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyWord}&page_size=10`
  );
  getNews();
};
const render = () => {
  let newsHTML = "";

  newsHTML = news.map((item) => {
    return `<div class="row news">
    <div class="col-lg-4">
      <img
        class="news-img-size"
        src="${item.media}"
        alt=""
      />
    </div>
    <div class="col-lg-8">
      <h2>${item.title}</h2>
      <p>${item.summary}</p>
      <div>${item.published_date} ${item.rights}</div>
    </div>
  </div>`;
  });
  newsBoard.innerHTML = newsHTML;
};

const errorRender = (message) => {
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">
  ${message}
</div>`;
  document.querySelector("#news-board").innerHTML = errorHTML;
};

searchButton.addEventListener("click", getByKewords);
getLatestNews();
