fetch("/api/nav", {})
  .then((response) => {
    return response.json();
  })
  .then((jsonData) => {

    let logoDiv=document.querySelector(".logo")
    let img = document.createElement("img");
    img.className = "icon_logo";
    img.src = "/static/image/logo.png";
    img.setAttribute("width", 50);
    logoDiv.appendChild(img);

    let textDiv = document.createElement("div");
    textDiv.className = "icon_text";
    let textNode = document.createTextNode("們去郊遊 ");
    textDiv.appendChild(textNode);
    logoDiv.appendChild(textDiv);

    let marqueeImgDiv = document.querySelector(".marquee");
    let marquee = document.createElement("div");
    marqueeImgDiv.appendChild(marquee);

    for (let i = 0; i < jsonData.length; i++) {

      let marqueeImg = document.createElement("img");
      marqueeImg.className = "marquee_icon";
      marqueeImg.src = "/static/image/dinosaur_left.gif";
      marqueeImg.setAttribute("width", 30);
      marqueeImg.style = "margin-right: 12px; position: relative; top: 1px;";
      marquee.appendChild(marqueeImg);
      let marqueeP = document.createElement("p");
      marqueeP.style = "display: inline-block; margin-right: 20px";
      marqueeP.textContent = jsonData[i];
      marquee.appendChild(marqueeP);

    }
    marquee.style = "animation: marquee 250s linear infinite;";
});