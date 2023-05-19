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
  
  let info_promises = []; 

  for (let item of urls) {
    info_promises.push(get_image_url(item['image_query_url']));
    info_promises.push(get_label(item['label_query_url']));

  }
  
  let results = await Promise.all(info_promises);

  let info = []; 

  for (let i = 0; i < results.length; i += 2) {
    let obj = {'image_url': results[i], 'label': results[i + 1]};
    info.push(obj);
  }
  
  return info;
}


let animalInfos = await get_info(9);

let animalName = document.getElementById("animal-name");
let target = animalInfos[Math.floor(Math.random() * 9)];
animalName.textContent = target.label;

let imageContainer = document.getElementById("image-container");

function evaluateAnswer(info, target, img) {
	if (info.label === target.label) {
		img.classList.add('correct');
	}
	else {
		img.classList.add('incorrect');
	}
  }

for (let info of animalInfos) {
  let img = document.createElement('img');
  img.src = info['image_url'];
  img.classList = "image";
  imageContainer.appendChild(img);
  
  img.addEventListener('click', () => evaluateAnswer(info, target, img));
  
}

