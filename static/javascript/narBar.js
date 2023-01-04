let logoDiv=document.querySelector(".logo")
let img = document.createElement("img");
img.className = "icon_logo";
img.src = "/static/image/logo.png";
img.setAttribute("width", 50);
logoDiv.appendChild(img);

let textDiv = document.createElement("div");
textDiv.className = "icon_text";
let textNode= document.createTextNode("們去郊遊 ");
textDiv.appendChild(textNode);
logoDiv.appendChild(textDiv);


// let marquee_data = [];

// const url = "https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24skip=1&%24format=JSON";

// fetch(url, {})
//   .then((response) => {
//     return response.json();
//   })
//   .then((jsonData) => {
//     for (let i = 0; i < jsonData.length; i++) {
//       const activityName = jsonData[i].ActivityName;
//       const city = jsonData[i].City;
//       const result = `${city}:${activityName}`;
//       marquee_data.push(result);
//     }
//     let counter = 0;

//     window.addEventListener("load", () => {
//       setInterval(updateMarquee, 1000);
//     });

//     function updateMarquee() {
//       const marqueeElement = document.querySelector(".marquee");
//       const textElement = marqueeElement.querySelector("marquee");

//       textElement.innerHTML += `&nbsp;<img class="marquee_icon" src="/static/image/dinosaur_left.gif" width="25" > ${marquee_data[counter]}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;`; // 在文字前後加上空白字元

//       counter++;
//       if (counter >= marquee_data.length) {
//         counter = 0;
//       }
//     }

// });
let marquee_data = [];
let counter = 0;
fetch("/api/nav", {})
  .then((response) => {
    return response.json();
  })
  .then((jsonData) => {
    console.log(jsonData)
    for (let i = 0; i < jsonData.length; i++) {
      let activityName = jsonData[i].ActivityName;
      let city = jsonData[i].City;
      let result = `${city}:${activityName}`;
      marquee_data.push(result);
    }


    window.addEventListener("load", () => {
      setInterval(updateMarquee, 2000);
    });

    function updateMarquee() {
      const marqueeElement = document.querySelector(".marquee");
      const textElement = marqueeElement.querySelector("marquee");

      textElement.innerHTML += `&nbsp;<img class="marquee_icon" src="/static/image/dinosaur_left.gif" width="25" > ${marquee_data[counter]}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp;`; // 在文字前後加上空白字元

      counter++;
      if (counter >= marquee_data.length) {
        counter = 0;

      }

    }

});