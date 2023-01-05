const hr1 = document.querySelector("#hr1");// 第一條分隔線 放北區資料
const taipeiDistrict = document.querySelector(".taipei_click_box");
const keelungDistrict = document.querySelector(".keelung_click_box");
const newTaipeiDistrict = document.querySelector(".newtaipeicity_click_box");
const taoyuanDistrict = document.querySelector(".taoyuan_click_box");
const hsinchuCountyDistrict = document.querySelector(".hsinchuCounty_click_box");

const hr2 = document.querySelector("#hr2");// 第二條分隔線 放中區資料
const miaoliCountyDistrict = document.querySelector(".miaoliCounty_click_box");
const taichungDistrict = document.querySelector(".taichung_click_box");
const changhuaCountyDistrict = document.querySelector(".changhuaCounty_click_box");
const yunlinCountyDistrict = document.querySelector(".yunlinCounty_click_box");
const nantouCountyDistrict = document.querySelector(".nantouCounty_click_box");

const hr3 = document.querySelector("#hr3");// 第三條分隔線 放南區資料
const chiayiDistrict = document.querySelector(".chiayi");
const tainanDistrict = document.querySelector(".tainan");
const kaohsiungDistrict = document.querySelector(".kaohsiung");
const pingtungCountyDistrict = document.querySelector(".pingtungCounty");

const hr4 = document.querySelector("#hr4");// 第四條分隔線 放東區資料
const yilanCountyDistrict = document.querySelector(".yilanCounty");
const hualienCountyDistrict = document.querySelector(".hualienCounty");
const taitungCountyDistrict = document.querySelector(".taitungCounty");

/*
// 北區活動資料
getActivityAndRender(taipeiDistrict, hr1);
getActivityAndRender(keelungDistrict, hr1);
getActivityAndRender(newTaipeiDistrict, hr1);
getActivityAndRender(taoyuanDistrict, hr1);
getActivityAndRender(hsinchuCountyDistrict, hr1);

// 中區活動資料
getActivityAndRender(miaoliCountyDistrict, hr2);
getActivityAndRender(taichungDistrict, hr2);
getActivityAndRender(changhuaCountyDistrict, hr2);
getActivityAndRender(yunlinCountyDistrict, hr2);
getActivityAndRender(nantouCountyDistrict, hr2);

// 南區活動資料
getActivityAndRender(chiayiDistrict, hr3);
getActivityAndRender(tainanDistrict, hr3);
getActivityAndRender(kaohsiungDistrict, hr3);
getActivityAndRender(pingtungCountyDistrict, hr3);

// 東區活動資料
getActivityAndRender(yilanCountyDistrict, hr4);
getActivityAndRender(hualienCountyDistrict, hr4);
getActivityAndRender(taitungCountyDistrict, hr4);
*/

// --- 各縣市天氣資料 --- //

/*
// 北區天氣
getWeatherAndRender(taipeiDistrict);
getWeatherAndRender(keelungDistrict);
getWeatherAndRender(newTaipeiDistrict);
getWeatherAndRender(taoyuanDistrict);
getWeatherAndRender(hsinchuCountyDistrict);

// 中區天氣
getWeatherAndRender(miaoliCountyDistrict);
getWeatherAndRender(taichungDistrict);
getWeatherAndRender(changhuaCountyDistrict);
getWeatherAndRender(yunlinCountyDistrict);
getWeatherAndRender(nantouCountyDistrict);

// 南區天氣
getWeatherAndRender(chiayiDistrict);
getWeatherAndRender(tainanDistrict);
getWeatherAndRender(kaohsiungDistrict);
getWeatherAndRender(pingtungCountyDistrict);

// 東區天氣
getWeatherAndRender(yilanCountyDistrict);
getWeatherAndRender(hualienCountyDistrict);
getWeatherAndRender(taitungCountyDistrict);
*/

const CWB_API_KEY = "CWB-E0104986-D708-4C9A-BDE5-EEBAB6F55A12";
const area = {
    "keelung":"基隆市",
    "taipei":"臺北市",
    // "newtaipeicity":"新北市",
    "newTaipei":"新北市",
    "taoyuan":"桃園市",
    "hsinchuCounty":"新竹縣",
    "miaoliCounty":"苗栗縣",
    "taichung":"臺中市",
    "changhuaCounty":"彰化縣",
    "yunlinCounty":"雲林縣",
    "nantouCounty":"南投縣",
    "chiayi":"嘉義市",
    "tainan":"臺南市",
    "kaohsiung":"高雄市",
    "pingtungCounty":"屏東縣",
    "yilanCounty":"宜蘭縣",
    "hualienCounty":"花蓮縣",
    "taitungCounty":"臺東縣"
}

function getActivityAndRender(param, hr){
    param.addEventListener("click", function(event){
        const hasTitleRows = document.querySelector(".title_rows");
        if ( hasTitleRows ){
            hasTitleRows.remove();
        }
        const divAttribute = param.getAttribute("class");
        let county = divAttribute.split("_")[0];
        if (county === "newtaipeicity"){
            county = "newTaipei";
        }
        // url = `https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity/${county}?%24top=30&%24format=JSON`
        url = `/api/activities/${county}`
        fetch(url).then((response)=>(response.json())).then((responseData)=>{
            // 大容器
            const titleRows = document.createElement("div");
            titleRows.className = "title_rows";
            responseData.forEach(element => {
                // 活動小容器
                const attraction = document.createElement("div");
                attraction.className = "attraction";
                attraction.style.cursor = "pointer";
                attraction.setAttribute("city", county);
                attraction.setAttribute("activityid", element.ActivityID)

                // 活動照片容器
                const attractionImgBox = document.createElement("div");
                attractionImgBox.className = "attraction_img_box";
                const attractionImg = document.createElement("img");
                attractionImg.setAttribute("class", "attraction_img found");
                attractionImg.src = element.Picture.PictureUrl1;
                attractionImgBox.appendChild(attractionImg);
                
                const imgNotFound = document.createElement("img");
                imgNotFound.setAttribute("class", "attraction_img notfound");
                attractionImgBox.appendChild(imgNotFound)

                attraction.appendChild(attractionImgBox);

                // 活動名稱
                const attractionName = document.createElement("h5");
                attractionName.className = "attraction_name";
                attractionName.textContent = `${element.ActivityName}`;
                attraction.appendChild(attractionName);

                // 活動地點
                const attractionDistrict = document.createElement("h6");
                attractionDistrict.className = "attraction_district";
                attractionDistrict.textContent = `${element.Location}`;
                attraction.appendChild(attractionDistrict);

                titleRows.appendChild(attraction);

                attraction.addEventListener("click", (event)=>{
                    location.href = `/activity?city=${county}&activityID=${element.ActivityID}`
                });
            });
            hr.insertAdjacentElement("afterend", titleRows);
        })
    })
}

function getWeatherAndRender(city){
    // param.addEventListener("click", (event)=>{
        // const divAttribute = param.getAttribute("class");
        // let county = divAttribute.split("_")[0];
        // let city = area[county];
        let url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${CWB_API_KEY}&locationName=${city}`;
        return fetch(url).then((response) => (response.json())).then((resoonseData) => {
            
            // console.log(resoonseData)
            const weatherData = resoonseData.records.location[0].weatherElement;
            const weatherCondition = weatherData[0].time[1].parameter.parameterName;
            const rainyCondition = `${weatherData[1].time[1].parameter.parameterName}%`;
            const minTemperature = `${weatherData[2].time[1].parameter.parameterName}度`;
            const maxTemperature = `${weatherData[4].time[1].parameter.parameterName}度`;

            // let info = `天氣狀況：${weatherCondition} 氣溫：${minTemperature} ~ ${maxTemperature} 降雨機率：${rainyCondition}` 
            let info = [weatherCondition, minTemperature, maxTemperature, rainyCondition]
            return info
            
            // const weatherdisapear = document.querySelector(".weatherdisapear");
            // weatherdisapear.style.display = "block"
            // const attractionBox = document.querySelector(".ability_outter");
            
            // const weathercontainer = document.createElement("div");
            // weathercontainer.className = "weathercontainer";
            // weathercontainer.id = "weather";
            // weathercontainer.textContent = `天氣狀況：${weatherCondition} 氣溫：${minTemperature} ~ ${maxTemperature} 降雨機率：${rainyCondition}`;

            // attractionBox.appendChild(weathercontainer);
            
            // weatherdisapear.addEventListener("click", (event)=>{
            //     weathercontainer.remove();
            //     weatherdisapear.style.display = "none";
            // })
        })
    // })
}

export {
    getWeatherAndRender,
    area
}