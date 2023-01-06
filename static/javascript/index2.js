const detailBox = document.querySelector(".detail_box");
let page = 0;
let city = null;

function fetchCity(city, status){
  return fetch(`/api/activities/${city}`, {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "page": page,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    if(data.data){
      page = data.page;
      detailBox.replaceChildren();
      createCityDetails(data.data);
      observerInit(data.city);
      if(page === null){
        let loadBtn = document.querySelector(".can_load_btn");
        loadBtn.replaceChildren();
        loadBtn.insertAdjacentHTML('beforeEnd', "<div style='width:20px; height: -20px;'></div>");
        page = 0;
        return
      }
    }
  })
}


function fetchCityBehind(city, status){
  return fetch(`/api/activities/${city}`, {
    method: "post",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "page": page,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    if(data.data){
      createCityDetailsBehind(data.data);
      if(data.page === -1){
        let loadBtn = document.querySelector(".can_load_btn");
        loadBtn.replaceChildren();
        loadBtn.insertAdjacentHTML('beforeEnd', "<div style='width:20px; height: -20px;'></div>");
        page = 0;
        return;
      }
      page = data.page;
    }
  })
}


function createCityDetailsBehind(data){
  let detail = "";
  data.forEach(el => {
    let pic = el.Picture.PictureUrl1;
    if(pic === undefined){
      pic = "/static/image/picture404_2.svg";
    }
    let location = el.Location;
    if(location === undefined || location === "to see the official site"){
      location = "請查詢官網"
    }
    let city = cityTransfer(el.City);

    let txt = `
    <div class="attraction">
      <a href="/activity?city=${city}&activityID=${el.ActivityID}">
        <div class="attraction_img_box">
          <div class="attraction_img notfound"></div>
          <div class="attraction_img found" style="background-image: url('${pic}');"></div>
        </div>
      </a>
      <h5 class="attraction_name found">${el.ActivityName}</h5>
      <h6 class="attraction_district">${location}</h6>
    </div>
    `
    detail += txt;
  });

  let titleRows = document.querySelector(".detail_box .title .title_rows")
  titleRows.insertAdjacentHTML('beforeEnd', detail);
}


function createCityDetails(data){
  let detail = "";
  data.forEach(el => {
    let pic = el.Picture.PictureUrl1;
    if(pic === undefined){
      pic = "/static/image/picture404_2.svg";
    }
    let location = el.Location;
    if(location === undefined || location === "to see the official site"){
      location = "請查詢官網"
    }
    let city = cityTransfer(el.City);

    let txt = `
    <div class="attraction">
      <a href="/activity?city=${city}&activityID=${el.ActivityID}">
        <div class="attraction_img_box">
          <div class="attraction_img notfound"></div>
          <div class="attraction_img found" style="background-image: url('${pic}');"></div>
        </div>
      </a>
      <h5 class="attraction_name found">${el.ActivityName}</h5>
      <h6 class="attraction_district">${location}</h6>
    </div>
    `
    detail += txt;
  });

  let html = `
  <div class="north_title title title_off">
    <h2>${data[0].City.slice(0,2)}</h2>
    <div class="weather">
      <span class="weather_txt weather_status"></span>
      <span class="weather_txt celsius"></span>
      <span class="weather_txt rain"></span>
    </div>
    <hr id="hr1">
    <div class="title_rows">
      ${detail}
    </div>
    <div class="can_load_btn">
      <h3>載入中</h3>
      <div class="loading_gif"></div>
      <div class="target"></div>
    </div>
  </div>
  `;
  detailBox.insertAdjacentHTML('beforeEnd', html);

  setTimeout(()=>{
    detailBox.classList.add("show");
  }, 200)

  setTimeout(()=>{
    document.querySelector(".detail_box .title").classList.remove("title_off");
  }, 300)
}


function observerInit(city){
  let ct = 0;

  let options = {
    root: null,
    rootMargin: "50px 50px 50px 50px",
    threshold: 0.5,
  }
  
  let callback = (entries, observer) => {
    entries.forEach(entry => {
      ct ++;
      if(ct > 2 && ct % 2 == 1){
        document.querySelector(".can_load_btn").classList.add("show");
        setTimeout(()=>{
          fetchCityBehind(city);
        }, 1500) 
        // observer.unobserve(target);
      }
    })
  }
  
  let observer = new IntersectionObserver(callback, options);
  const target = document.querySelector(".target");

  observer.observe(target);
};


function resetPageCount(){
  page = 0;
}


function cityTransfer(chinese){
  if(chinese === "基隆市"){
    return "keelung"
  }
  if(chinese === "臺北市"){
    return "taipei"
  }
  if(chinese === "新北市"){
    return "newTaipei"
  }
  if(chinese === "桃園市"){
    return "taoyuan"
  }
  if(chinese === "新竹縣"){
    return "hsinchuCounty"
  }

  if(chinese === "苗栗縣"){
    return "miaoliCounty"
  }
  if(chinese === "臺中市"){
    return "taichung"
  }
  if(chinese === "彰化縣"){
    return "changhuaCounty"
  }
  if(chinese === "雲林縣"){
    return "yunlinCounty"
  }
  if(chinese === "南投縣"){
    return "nantouCounty"
  }

  if(chinese === "嘉義市"){
    return "chiayi"
  }
  if(chinese === "嘉義縣"){
    return "chiayiCounty"
  }
  if(chinese === "臺南市"){
    return "tainan"
  }
  if(chinese === "高雄市"){
    return "kaohsiung"
  }
  if(chinese === "屏東縣"){
    return "pingtungCounty"
  }

  if(chinese === "宜蘭縣"){
    return "yilanCounty"
  }
  if(chinese === "花蓮縣"){
    return "hualienCounty"
  }
  if(chinese === "臺東縣"){
    return "taitungCounty"
  }
}


export {
  fetchCity,
  cityTransfer,
  resetPageCount,
}