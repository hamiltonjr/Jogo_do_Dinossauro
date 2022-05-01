const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;


/**
 * Detecta se usuário pressionou teclas.
 * @param {*} event 
 */
let handleKeyUp = (event) => {
  // se pressionou esdpaço (32) ou seta para cima (38)
  if (event.keyCode === 32 || event.keyCode === 38) {
    if (!isJumping) { 
      jump();
    } 
  }

  // se pressionou ENTER (13)
  if (event.keyCode === 13) {
    window.location.href = 'index.html';
    } 
}


/**
 * Implementa o pulo do dino.
 */
let jump = () => {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}


/**
 * Cria e anima o cactus.
 */
let createCactus = () => {
  // configura o cactus
  const cactus = document.createElement('div');
  let cactusPosition = 1000;

  // gera o cactus aleatoriamente
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  // mostra o cactus
  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  // anima o cactus
  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}


/**
 * Inicia o jogo.
 */
createCactus();
document.addEventListener('keyup', handleKeyUp);
