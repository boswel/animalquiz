import { Quiz } from './Quiz.js'

let question = document.getElementById('question');
let imageGrid = document.getElementById('image-grid');
let evalPos = document.getElementById('eval-pos');
let name = document.getElementById('name');
let infoLink = document.getElementById('info-link');
let evalNeg = document.getElementById('eval-neg');
let againButton = document.getElementById('again');


let quiz = new Quiz();

let animalInfos = await quiz.get_all_animal_data(quiz.numberOfPictures);

let target = animalInfos[Math.floor(Math.random() * quiz.numberOfPictures)];

question.innerHTML = 'Which of the pictures shows (something related to) the <span class="animal-name">' + target.label + '</span>?';

for (let info of animalInfos) {
  let img = document.createElement('img');
  img.src = info['image_url'];
  img.classList.add('image');

  let div = document.createElement('div');
  div.appendChild(img);
  imageGrid.appendChild(div);

  img.addEventListener('click', () => {
    if (info.label === target.label) {
      img.classList.add('correct');
      name.textContent = target.label;
      infoLink.href = info.wiki_url;
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
