export async function getYoutubeData(id) {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyBGH7LSFRX6a3Kyo9z0vcKUgJKE0BNEGPw`
  );
  const data = await res.json();
  console.log(data);
  return data;
}

export async function getRecipe() {
  const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
  const data = await res.json();
  console.log(data);
  return data;
}

export async function getProductData() {
  const res = await fetch(
    "https://dummyjson.com/products/category/groceries?limit=0"
  );
  const data = await res.json();
  console.log(data);
  return data;
}

//------Set and Get Local Storage------//

export function getStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
