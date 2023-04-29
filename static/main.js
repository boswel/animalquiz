import md5Hex from 'https://cdn.jsdelivr.net/npm/md5-hex@4.0.0/+esm'


async function get_query_urls(int) {
  return fetch("/info?number=" + int)
  .then(response => response.json())
}

async function get_image_url(query_url) {
  return fetch(query_url)
  .then(response => response.json())
  .then(object => {
    let image_name = object['P18'][0]['value']['content'];
    let image_name_underline = image_name.replaceAll(" ", "_");

    let md5 = md5Hex(image_name_underline)
    let md5_1 = md5[0]
    let md5_2 = md5[1]

    return "https://upload.wikimedia.org/wikipedia/commons/thumb/" + md5_1 + "/" + md5_1 + md5_2 + "/" + 
    image_name_underline + "/320px-" + image_name_underline
  })
}

async function get_label(query_url) {
  return fetch(query_url)
  .then(response => response.json())
}

async function get_info(int) {
  let urls = await get_query_urls(int);
  
  let info = [];

  for (let item of urls) {
    let image_url = await get_image_url(item['image_query_url']);
    let label = await get_label(item['label_query_url']);

    info.push({'image_url': image_url, 'label': label})
  }

  return info;
}


let images = await get_info(9);

let imageContainer = document.getElementById("image-container");

for (let image of images) {
  let img = document.createElement('img');
  img.src = image['image_url'];
  img.classList = "image";
  imageContainer.appendChild(img);
}

