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


let counter = 0;
fetch("/api/nav", {})
  .then((response) => {
    return response.json();
  })
  .then((jsonData) => {
    console.log(jsonData)
    for (let i = 0; i < jsonData.length; i++) {
      let marqueeImgDiv=document.querySelector("marquee")
      let marqueeImg = document.createElement("img");
      marqueeImg.className = "marquee_icon";
      marqueeImg.src = "/static/image/dinosaur_left.gif";
      marqueeImg.setAttribute("width", 25);
    
      let marqueeNode= document.createTextNode(" " + jsonData[i] + " ");
      marqueeImgDiv.appendChild(marqueeImg);
      marqueeImgDiv.appendChild(marqueeNode);
    }
});