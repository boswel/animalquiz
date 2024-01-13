import { Quiz } from './Quiz.js'

let animalNames = document.querySelectorAll('.animal-name');
let images = document.getElementById('images');
let evalPos = document.getElementById('eval-pos');
let evalNeg = document.getElementById('eval-neg');
let againButton = document.getElementById('again');


let quiz = new Quiz();

let animalInfos = await quiz.get_all_animal_data(quiz.numberOfPictures);

let target = animalInfos[Math.floor(Math.random() * quiz.numberOfPictures)];

for (let name of animalNames) {
  name.textContent = target.label;
}


for (let info of animalInfos) {
  let img = document.createElement('img');
  img.src = info['image_url'];
  img.classList.add('image');

  let div = document.createElement('div');
  div.appendChild(img);
  images.appendChild(div);

  img.addEventListener('click', () => {
    if (info.label === target.label) {
      img.classList.add('correct');
      evalPos.hidden = false;
    }
    else {
      img.classList.add('incorrect');
      evalNeg.hidden = false;

      setTimeout(() => { evalNeg.hidden = true }, 1000);
    }
  });
}


againButton.addEventListener('click', () => {
  location.reload();
});
