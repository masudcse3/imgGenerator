/** @format */

const onSubmit = (e) => {
  e.preventDefault();
  let msg = document.getElementById("msg");
  msg.textContent = "";
  const prompt = document.getElementById("prompt").value;
  const size = document.getElementById("size").value;
  const count = document.getElementById("count").value;
  if (prompt === "") {
    alert("Please enter a perfect title");
    return;
  }
  getData(prompt, size, count);
};
const getData = async (prompt, size, count) => {
  showSpainer();
  if (count > 10) {
    hideSpainer();
    alert("The count must be less than or equal to 10");
    return;
  }
  try {
    const response = await fetch("/image/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
        count,
      }),
    });
    if (!response.ok) {
      hideSpainer();
      throw new Error("Failed to generate a image");
    }
    const data = await response.json();
    const image_url = data.data;
    // console.log(image_url);
    generateImg(image_url);
    hideSpainer();
  } catch (error) {
    msg.textContent = error;
  }
};
const generateImg = (image_url) => {
  const imgGallery = document.getElementById("img-gallery");
  for (let i = 0; i < image_url.length; i++) {
    const img = document.createElement("img");
    img.src = image_url[i].url;

    imgGallery.appendChild(img);
  }
  return imgGallery;
};
const showSpainer = () => {
  document.getElementById("spainner").classList.add("show");
};
const hideSpainer = () => {
  document.getElementById("spainner").classList.remove("show");
};

document.getElementById("imageForm").addEventListener("submit", onSubmit);
