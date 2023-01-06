import { fetchCity, cityTransfer, resetPageCount } from "./index2.js"
import { getWeatherAndRender, area } from "./activity.js"

const html = document.querySelector("html");
const wrapper = document.querySelector(".wrapper");
const attractionBox = document.querySelector(".attraction_box");
const waiting = document.querySelector(".waiting");

const northBox = document.querySelector(".north_box");
const westBox = document.querySelector(".west_box");
const southBox = document.querySelector(".south_box");
const eastBox = document.querySelector(".east_box");
const fourBox = [northBox, westBox, southBox, eastBox]

const north = document.querySelector(".north");
const west = document.querySelector(".west");
const south = document.querySelector(".south");
const east = document.querySelector(".east");

const northTitle = document.querySelector(".north_title");
const westTitle = document.querySelector(".west_title");
const southTitle = document.querySelector(".south_title");
const eastTitle = document.querySelector(".east_title");
const titles = document.querySelectorAll(".title");
const initTitles = document.querySelectorAll(".title_init");


// insideBox 不需要做
const northInsideBox = document.querySelector(".north_inside_box");
const westInsideBox = document.querySelector(".west_inside_box");
const southInsideBox = document.querySelector(".south_inside_box");
const eastInsideBox = document.querySelector(".east_inside_box");

const keelung = document.querySelector(".keelung");
const taipei = document.querySelector(".taipei");
const newtaipeicity = document.querySelector(".newtaipeicity");
const taoyuan = document.querySelector(".taoyuan");
const hsinchu = document.querySelector(".hsinchuCounty");
const northCityLst = [keelung, taipei, newtaipeicity, taoyuan, hsinchu];

const miaoliCounty = document.querySelector(".miaoliCounty");
const taichung = document.querySelector(".taichung");
const changhuaCounty = document.querySelector(".changhuaCounty");
const yunlinCounty = document.querySelector(".yunlinCounty");
const nantouCounty = document.querySelector(".nantouCounty");
const westCityLst = [miaoliCounty, taichung, changhuaCounty, yunlinCounty, nantouCounty];

const chiayi = document.querySelector(".chiayi");
const tainan = document.querySelector(".tainan");
const kaohsiung = document.querySelector(".kaohsiung");
const pingtungCounty = document.querySelector(".pingtungCounty");
const southCityLst = [chiayi, tainan, kaohsiung, pingtungCounty];

const yilanCounty = document.querySelector(".yilanCounty");
const hualienCounty = document.querySelector(".hualienCounty");
const taitungCounty = document.querySelector(".taitungCounty");
const eastCityLst = [yilanCounty, hualienCounty, taitungCounty];

const keelungClickBox = document.querySelector(".keelung_click_box");
const taipeiClickBox = document.querySelector(".taipei_click_box");
const newtaipeicityClickBox = document.querySelector(".newtaipeicity_click_box");
const taoyuanClickBox = document.querySelector(".taoyuan_click_box");
const hsinchuCountyClickBox = document.querySelector(".hsinchuCounty_click_box");
const northClickBoxtLst = [keelungClickBox, taipeiClickBox, newtaipeicityClickBox, taoyuanClickBox, hsinchuCountyClickBox]

const miaoliCountyClickBox = document.querySelector(".miaoliCounty_click_box");
const taichungClickBox = document.querySelector(".taichung_click_box");
const changhuaCountyClickBox = document.querySelector(".changhuaCounty_click_box");
const yunlinCountyClickBox = document.querySelector(".yunlinCounty_click_box");
const nantouCountyClickBox = document.querySelector(".nantouCounty_click_box");
const westClickBoxLst = [miaoliCountyClickBox, taichungClickBox, changhuaCountyClickBox, yunlinCountyClickBox, nantouCountyClickBox];

const chiayiClickBox = document.querySelector(".chiayi_click_box");
const tainanClickBox = document.querySelector(".tainan_click_box");
const kaohsiungClickBox = document.querySelector(".kaohsiung_click_box");
const pingtungCountyClickBox = document.querySelector(".pingtungCounty_click_box");
const southClickBoxLst = [chiayiClickBox, tainanClickBox, kaohsiungClickBox, pingtungCountyClickBox];

const yilanCountyClickBox = document.querySelector(".yilanCounty_click_box");
const hualienCountyClickBox = document.querySelector(".hualienCounty_click_box");
const taitungCountyClickBox = document.querySelector(".taitungCounty_click_box");
const eastClickBoxLst = [yilanCountyClickBox, hualienCountyClickBox, taitungCountyClickBox];

const north_districts = document.querySelectorAll(".north_district");
const west_districts = document.querySelectorAll(".west_district");
const south_districts = document.querySelectorAll(".south_district");
const east_districts = document.querySelectorAll(".east_district");

const nor_clickboxs = document.querySelectorAll(".nor_clickbox");
const west_clickboxs = document.querySelectorAll(".west_clickbox");
const south_clickboxs = document.querySelectorAll(".south_clickbox");
const east_clickboxs = document.querySelectorAll(".east_clickbox");

const detailBox = document.querySelector(".detail_box");


let cityIsClick = false;
let tempNorth;
let tempWest;
let tempSouth;
let tempEast;

getEightCities();
titleInit();
taiwanInit();
districtClickInit();

function taiwanInit(){
  northBox.addEventListener("click", ()=>{
    north.classList.add("img_click");
    west.classList.add("img_fade");
    south.classList.add("img_fade");
    east.classList.add("img_fade");

    fourBox.forEach(box => {
      box.style = "pointer-events: none;"; 
    })

    setTimeout(()=>{
      titles.forEach(title => {
        title.classList.add("title_off");
      });
      
      northTitle.classList.remove("title_off");
    }, 100)

    setTimeout(()=>{
      northCityLst.forEach(norCity => {
        norCity.classList.add("show");
      })
      northClickBoxtLst.forEach(norClickbox => {
        norClickbox.classList.add("show");
      })
    }, 800)

    setTimeout(()=>{
      html.addEventListener("click", function out(e){
        if(!detailBox.contains(e.target) && 
        !keelungClickBox.contains(e.target)&&
        !taipeiClickBox.contains(e.target)&&
        !newtaipeicityClickBox.contains(e.target)&&
        !taoyuanClickBox.contains(e.target)&&
        !hsinchuCountyClickBox.contains(e.target)){
          north.classList.remove("img_click");
          setTimeout(()=>{
            west.classList.remove("img_fade");
            south.classList.remove("img_fade");
            east.classList.remove("img_fade");

            north_districts.forEach((district) => {
              district.classList.remove("active");
            })
          }, 200)

          fourBox.forEach(box => {
            box.style = "pointer-events: auto;"; 
          })

          northCityLst.forEach(norCity => {
            norCity.classList.remove("show");
          })
    
          northClickBoxtLst.forEach(norClickbox => {
            norClickbox.classList.remove("show");
          })

          setTimeout(()=>{
            attractionBox.classList.remove("big_district_out");
            northTitle.classList.remove("title_off");
          }, 300)
          setTimeout(()=>{
            detailBox.replaceChildren();
          }, 400)

          document.querySelector(".detail_box").classList.remove("show");   
          cityIsClick = false;
          tempNorth = null;
          resetPageCount();

          html.removeEventListener("click", out);
        }
      })
    }, 1000)
  })

  westBox.addEventListener("click", ()=>{
    north.classList.add("img_fade");
    west.classList.add("img_click");
    south.classList.add("img_fade");
    east.classList.add("img_fade");

    fourBox.forEach(box => {
      box.style = "pointer-events: none;"; 
    });

    setTimeout(() => {
      titles.forEach(title => {
        title.classList.add("title_off");
      });
      westTitle.classList.remove("title_off");
    }, 100);

    setTimeout(()=>{
      westCityLst.forEach(westCity => {
        westCity.classList.add("show");
      });
      westClickBoxLst.forEach(westClickbox => {
        westClickbox.classList.add("show");
      });
    }, 800)

    setTimeout(()=>{
      html.addEventListener("click", function out(e){
        if(!detailBox.contains(e.target) && 
        !miaoliCountyClickBox.contains(e.target) &&
        !taichungClickBox.contains(e.target) &&
        !changhuaCountyClickBox.contains(e.target) &&
        !yunlinCountyClickBox.contains(e.target) &&
        !nantouCountyClickBox.contains(e.target)){
          west.classList.remove("img_click");
          setTimeout(()=>{
            north.classList.remove("img_fade");
            south.classList.remove("img_fade");
            east.classList.remove("img_fade");
            west_districts.forEach((district) => {
              district.classList.remove("active");
            })
          }, 200);

          fourBox.forEach(box => {
            box.style = "pointer-events: auto;"; 
          });

          westCityLst.forEach(westCity => {
            westCity.classList.remove("show");
          });

          westClickBoxLst.forEach(westClickbox => {
            westClickbox.classList.remove('show');
          });

          setTimeout(()=>{
            attractionBox.classList.remove("big_district_out");
            westTitle.classList.remove("title_off");
          }, 300);
          setTimeout(()=>{
            detailBox.replaceChildren();
          }, 400);

          detailBox.classList.remove("show");
          cityIsClick = false;
          tempWest = null;
          resetPageCount();

          html.removeEventListener("click", out);
        }
      })
    }, 1000)
  })

  southBox.addEventListener("click", ()=>{
    north.classList.add("img_fade");
    west.classList.add("img_fade");
    south.classList.add("img_click");
    east.classList.add("img_fade");

    fourBox.forEach(box => {
      box.style = "pointer-events: none;"; 
    })

    setTimeout(()=>{
      titles.forEach(title => {
        title.classList.add("title_off");
      });
      southTitle.classList.remove("title_off");
    }, 100)

    setTimeout(()=>{
      southCityLst.forEach(southCity => {
        southCity.classList.add("show");
      })
      southClickBoxLst.forEach(southClickbox => {
        southClickbox.classList.add("show");
      })
    }, 800)

    setTimeout(()=>{
      html.addEventListener("click", function out(e){
        if(!detailBox.contains(e.target) && 
        !chiayiClickBox.contains(e.target) &&
        !tainanClickBox.contains(e.target) &&
        !kaohsiungClickBox.contains(e.target) &&
        !pingtungCountyClickBox.contains(e.target)){
          south.classList.remove("img_click");
          setTimeout(()=>{
            north.classList.remove("img_fade");
            west.classList.remove("img_fade");
            east.classList.remove("img_fade");
            south_districts.forEach((district) => {
              district.classList.remove("active");
            });
          }, 200);

          fourBox.forEach(box => {
            box.style = "pointer-events: auto;"; 
          });

          southCityLst.forEach(southCity => {
            southCity.classList.remove("show");
          });
    
          southClickBoxLst.forEach(southClickbox => {
            southClickbox.classList.remove("show");
          });

          setTimeout(()=>{
            attractionBox.classList.remove("big_district_out");
            southTitle.classList.remove("title_off");
          }, 300)
          setTimeout(()=>{
            detailBox.replaceChildren();
          }, 400)

          detailBox.classList.remove("show");   
          cityIsClick = false;
          tempSouth = null;
          resetPageCount();

          html.removeEventListener("click", out);
        }
      });
    }, 1000)
  })

  eastBox.addEventListener("click", ()=>{
    north.classList.add("img_fade");
    west.classList.add("img_fade");
    south.classList.add("img_fade");
    east.classList.add("img_click");
    fourBox.forEach(box => {
      box.style = "pointer-events: none;"; 
    })

    setTimeout(()=>{
      titles.forEach(title => {
        title.classList.add("title_off");
      });
      eastTitle.classList.remove("title_off");
    }, 100)

    setTimeout(()=>{
      eastCityLst.forEach(eastCity => {
        eastCity.classList.add("show");
      });
      eastClickBoxLst.forEach(eastClickbox => {
        eastClickbox.classList.add("show");
      });
    }, 800)

    setTimeout(()=>{
      html.addEventListener("click", function out(e){
        if(!detailBox.contains(e.target) && 
        !yilanCountyClickBox.contains(e.target) &&
        !hualienCountyClickBox.contains(e.target) &&
        !taitungCountyClickBox.contains(e.target)){
          east.classList.remove("img_click");
          setTimeout(()=>{
            north.classList.remove("img_fade");
            west.classList.remove("img_fade");
            south.classList.remove("img_fade");
            east_districts.forEach((district) => {
              district.classList.remove("active");
            });
          }, 200);

          fourBox.forEach(box => {
            box.style = "pointer-events: auto;"; 
          });

          eastCityLst.forEach(eastCity => {
            eastCity.classList.remove("show");
          });

          eastClickBoxLst.forEach(eastClickbox => {
            eastClickbox.classList.remove("show");
          });

          setTimeout(()=>{
            attractionBox.classList.remove("big_district_out");
            eastTitle.classList.remove("title_off");
          }, 300)
          setTimeout(()=>{
            detailBox.replaceChildren();
          }, 400)

          detailBox.classList.remove("show");   
          cityIsClick = false;
          tempEast = null;
          resetPageCount();

          html.removeEventListener("click", out);
        };
      })
    }, 1000)
  })
}

function districtClickInit(){
  nor_clickboxs.forEach((nor_clickbox, index)=>{
    nor_clickbox.onclick = ()=>{
      north_districts[index].classList.add("active");
      attractionBox.classList.add("big_district_out");
      resetPageCount();

      // keelung
      if(index == 0){
        if(tempNorth == index){
          return
        }
        cityClick("keelung");
        tempNorth = index;
      }
      // taipei
      if(index == 1){ 
        if(tempNorth == index){
          return
        }
        cityClick("taipei");
        tempNorth = index;

      }
      // newTaipei
      if(index == 2){ 
        if(tempNorth == index){
          return
        }
        cityClick("newTaipei");
        tempNorth = index;
      }
      // taoyuan
      if(index == 3){ 
        if(tempNorth == index){
          return
        }
        cityClick("taoyuan");
        tempNorth = index;
      }
      // hsinchuCounty
      if(index == 4){ 
        if(tempNorth == index){
          return
        }
        cityClick("hsinchuCounty");
        tempNorth = index;
      }

      north_districts.forEach((dis, j)=>{
        if(index != j){
          dis.classList.remove("active");
        }
      })
    }
  })
  west_clickboxs.forEach((west_clickbox, index)=>{
    west_clickbox.onclick = ()=>{
      west_districts[index].classList.add("active");
      attractionBox.classList.add("big_district_out");
      resetPageCount();

      // miaoli
      if(index == 0){
        if(tempWest == index){
          return
        }
        cityClick("miaoliCounty");
        tempWest = index;
      }
      // taichung
      if(index == 1){ 
        if(tempWest == index){
          return
        }
        cityClick("taichung");
        tempWest = index;
      }
      // changhua
      if(index == 2){ 
        if(tempWest == index){
          return
        }
        cityClick("changhuaCounty");
        tempWest = index;
      }
      // yunlin
      if(index == 3){ 
        if(tempWest == index){
          return
        }
        cityClick("yunlinCounty");
        tempWest = index;
      }
      // nantou
      if(index == 4){ 
        if(tempWest == index){
          return
        }
        cityClick("nantouCounty");
        tempWest = index;
      }

      west_districts.forEach((dis, j)=>{
        if(index != j){
          dis.classList.remove("active");
        }
      })
    }
  })
  south_clickboxs.forEach((south_clickbox, index)=>{
    south_clickbox.onclick = ()=>{
      south_districts[index].classList.add("active");
      attractionBox.classList.add("big_district_out");
      resetPageCount();

      // chiayi
      if(index == 0){
        if(tempSouth == index){
          return
        }
        cityClick("chiayi");
        tempSouth = index;
      }
      // tainan
      if(index == 1){ 
        if(tempSouth == index){
          return
        }
        cityClick("tainan");
        tempSouth = index;
      }
      // kaohsiung
      if(index == 2){ 
        if(tempSouth == index){
          return
        }
        cityClick("kaohsiung");
        tempSouth = index;
      }
      // pingtungCounty
      if(index == 3){ 
        if(tempSouth == index){
          return
        }
        cityClick("pingtungCounty");
        tempSouth = index;
      }

      south_districts.forEach((dis, j)=>{
        if(index != j){
          dis.classList.remove("active");
        }
      })
    }
  })
  east_clickboxs.forEach((east_clickbox, index)=>{
    east_clickbox.onclick = ()=>{
      east_districts[index].classList.add("active");
      attractionBox.classList.add("big_district_out");
      resetPageCount();

      // yilanCounty
      if(index == 0){
        if(tempEast == index){
          return
        }
        cityClick("yilanCounty");
        tempEast = index;
      }
      // hualienCounty
      if(index == 1){ 
        if(tempEast == index){
          return
        }
        cityClick("hualienCounty");
        tempEast = index;
      }
      // taitungCounty
      if(index == 2){ 
        if(tempEast == index){
          return
        }
        cityClick("taitungCounty");
        tempEast = index;
      }

      east_districts.forEach((dis, j)=>{
        if(index != j){
          dis.classList.remove("active");
        }
      })
    }
  })
}

async function cityClick(city){
  if(cityIsClick){
    document.querySelector(".detail_box").classList.remove("show");
  }
  titles.forEach(title => {
    title.classList.add("title_off");
  })
  // setTimeout(()=>{
  await fetchCity(city);

  let weatherInfo = await getWeatherAndRender(area[`${city}`]);

  let weatherStatus = document.querySelector(".weather_status");
  let celsius = document.querySelector(".celsius");
  let rain = document.querySelector(".rain");
  weatherStatus.textContent = `天氣：${weatherInfo[0]}`
  celsius.textContent = `氣溫：${weatherInfo[1]} ~ ${weatherInfo[2]}`
  rain.textContent = `降雨：${weatherInfo[3]}`

  // }, 300)
  cityIsClick = true;
}



function titleInit(){
  let titleH2Lst = document.querySelectorAll(".title h2")
  titleH2Lst.forEach((titleH2, i)=>{
    titleH2.onclick = ()=>{
      if(i == 0 && northTitle.classList.contains("title_off")){
        setTimeout(()=>{
          northTitle.classList.remove("title_off");
        }, 100)
        westTitle.classList.add("title_off");
        southTitle.classList.add("title_off");
        eastTitle.classList.add("title_off");
      }else if(i == 1 && westTitle.classList.contains("title_off")){
        setTimeout(()=>{
          westTitle.classList.remove("title_off");
        }, 100)
        northTitle.classList.add("title_off");
        southTitle.classList.add("title_off");
        eastTitle.classList.add("title_off");
      }else if(i == 2 && southTitle.classList.contains("title_off")){
        setTimeout(()=>{
          southTitle.classList.remove("title_off");
        }, 100)
        northTitle.classList.add("title_off");
        westTitle.classList.add("title_off");
        eastTitle.classList.add("title_off");
      }else if(i == 3 && eastTitle.classList.contains("title_off")){
        setTimeout(()=>{
          eastTitle.classList.remove("title_off");
        }, 100)
        northTitle.classList.add("title_off");
        westTitle.classList.add("title_off");
        southTitle.classList.add("title_off");
      }
    }
  })
}



function getEightCities(){
  fetch("/api/home/activities")
  .then((response) => response.json())
  .then((data) => {
    if(data){
      titles.forEach((title, i) => {
        let pic1 = data.data[2*i].Picture.PictureUrl1;
        if(pic1 === undefined){
          pic1 = "/static/image/picture404_2.svg";
        }
  
        let pic2 = data.data[2*i+1].Picture.PictureUrl1;
        if(pic2 === undefined){
          pic2 = "/static/image/picture404_2.svg";
        }
  
        let location1 = data.data[2*i].Location;
        if(location1 === "to see the official site"){
          location1 = "請查詢官網"
        }else{
          let temp = location1.split(" ")[1]
          if(temp !== undefined){
            location1 = temp
          }else{
            location1 = ""
          }
        }
  
        let location2 = data.data[2*i+1].Location;
        if(location2 === "to see the official site"){
          location2 = "請查詢官網"
        }else{
          let temp = location2.split(" ")[1]
          if(temp !== undefined){
            location2 = temp
          }else{
            location2 = ""
          }
        }

  
        let city1 = cityTransfer(data.data[2*i].City)
        let city2 = cityTransfer(data.data[2*i+1].City)
  
        let html = `
        <div class="title_rows">
          <div class="attraction">
            <a href="/activity?city=${city1}&activityID=${data.data[2*i].ActivityID}">
              <div class="attraction_img_box">
                <div class="attraction_img notfound"></div>
                <div class="attraction_img found" style="background-image: url('${pic1}');"></div>
              </div>
            </a>
            <h5 class="attraction_name">${data.data[2*i].ActivityName}</h5>
            <h6 class="attraction_district">${data.data[2*i].City} ${location1}</h6>
          </div>
          <div class="attraction">
            <a href="/activity?city=${city2}&activityID=${data.data[2*i+1].ActivityID}">
              <div class="attraction_img_box">
                <div class="attraction_img notfound"></div>
                <div class="attraction_img found" style="background-image: url('${pic2}');"></div>
              </div>
            </a>
            <h5 class="attraction_name">${data.data[2*i+1].ActivityName}</h5>
            <h6 class="attraction_district">${data.data[2*i+1].City} ${location2}</h6>
          </div>
        </div>
        `;
        title.insertAdjacentHTML('beforeEnd', html);
        waiting.remove();
        initTitles.forEach(title => {
          title.style = "display: block;";
        })
        setTimeout(()=>{
          northTitle.classList.remove("title_off");
        }, 100)
      })
    }
  })
}




