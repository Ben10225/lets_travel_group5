const hr1 = document.querySelector("#hr1");// 第一條分隔線 放北區資料
const taipeiDistrict = document.querySelector(".taipei");
const keelungDistrict = document.querySelector(".keelung");
const newTaipeiDistrict = document.querySelector(".newtaipeicity");
const taoyuanDistrict = document.querySelector(".taoyuan");
const hsinchuCountyDistrict = document.querySelector(".hsinchuCounty");

const hr2 = document.querySelector("#hr2");// 第二條分隔線 放中區資料
const miaoliCountyDistrict = document.querySelector(".miaoliCounty");
const taichungDistrict = document.querySelector(".taichung");
const changhuaCountyDistrict = document.querySelector(".changhuaCounty");
const yunlinCountyDistrict = document.querySelector(".yunlinCounty");
const nantouCountyDistrict = document.querySelector(".nantouCounty");

const hr3 = document.querySelector("#hr3");// 第三條分隔線 放南區資料
const chiayiDistrict = document.querySelector(".chiayi");
const tainanDistrict = document.querySelector(".tainan");
const kaohsiungDistrict = document.querySelector(".kaohsiung");
const pingtungCountyDistrict = document.querySelector(".pingtungCounty");

const hr4 = document.querySelector("#hr4");// 第四條分隔線 放東區資料
const yilanCountyDistrict = document.querySelector(".yilanCounty");
const hualienCountyDistrict = document.querySelector(".hualienCounty");
const taitungCountyDistrict = document.querySelector(".taitungCounty");

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


function getActivityAndRender(param, hr){
    param.addEventListener("click", function(event){
        const hasTitleRows = document.querySelector(".title_rows");
        if ( hasTitleRows ){
            hasTitleRows.remove();
        }
        const divAttribute = param.getAttribute("class");
        let county = divAttribute.split(" ")[0];
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

