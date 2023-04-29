let imagesX = ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Binturong_in_Overloon.jpg/320px-Binturong_in_Overloon.jpg", 
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Wied's_Marmoset_at_Blank_Park_Zoo.gk.jpg/320px-Wied's_Marmoset_at_Blank_Park_Zoo.gk.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Rousettus_leschenaultii_Harvard.jpg/320px-Rousettus_leschenaultii_Harvard.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Lutra_nippon.jpg/320px-Lutra_nippon.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Galemys_pyrenaicus_01_by-dpc.jpg/320px-Galemys_pyrenaicus_01_by-dpc.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Ant_lucp.jpg/320px-Ant_lucp.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/DirkvdM_tamandua.jpg/320px-DirkvdM_tamandua.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Microcavia_australis_86705488.jpg/320px-Microcavia_australis_86705488.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Texas_pocket_gopher.jpg/320px-Texas_pocket_gopher.jpg"]

async function get_info(int) {
  return fetch("/info?number=" + int)
  .then(response => response.json())
}

let images = await get_info(9);

let imageContainer = document.getElementById("image-container");

for (let image of images) {
  let img = document.createElement('img');
  img.src = image['image_url'];
  img.classList = "image";
  imageContainer.appendChild(img);
}

