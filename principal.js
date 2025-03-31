let des = document.getElementById('des').getContext('2d') //des é o contexto de desenho no canvas, onde os elementos do jogo serão renderizados.
let pontos = 0; //Guarda a pontuação do jogador.
let vida = 5; //Número de vidas.
let texto1 = new Text(); 
let texto2 = new Text();
//------------------------------------------------------//
let bg = new Bg(0, 0, 800, 600, './img/piscina.jpg');
let bg2 = new Bg(800, 0, 800, 600, './img/piscina.jpg');
let bg3 = new Bg(1600, 0, 800, 600, './img/piscina.jpg');
let nadador = new Nadador(20, 20, 220, 50, './img/nadador1.png');
let b1 = new Boia(500, 20, 70, 70, './img/boia4.png');
let b2 = new Boia(650, 125, 70, 70, './img/boia1.png');
let b3 = new Boia(800, 225, 70, 70, './img/boia2.png');
let b4 = new Boia(900, 225, 70, 70, './img/boia3.png');
let b5 = new Boia(750, 315, 70, 70, './img/boia5.png');
let b6 = new Boia(640, 515, 70, 70, './img/boia6.png');
let b7 = new Boia(950, 415, 70, 70, './img/boia7.png');
// Cria o fundo do jogo (bg).
// Cria o nadador (nadador).
// Cria várias bóias (b1, b2, etc.) que serão obstáculos.
//-----------------------------------------------------------//

let jogoAtivo = true; //Define se o jogo está rodando.
let level = 1; // Nível atual do jogo.
let cap = 10; // Quantidade de pontos necessários para subir de nível.
let velocidadeBoias = 2; // Velocidade inicial das bóias
let textoNivel = new Text();
let colisaoSound = new Audio('./assets/batida3.wav'); // Caminho para o arquivo de áudio
let levelUpSound = new Audio('./assets/nivel.wav'); // Caminho para o arquivo de áudio
let gameOverSound = new Audio('./assets/gameOverSound.mp3'); // Certifique-se de que o caminho está correto

// Adicionando o som do nadador nadando
let musicaFundo = new Audio('./assets/piscina_agua.mp3'); // Caminho para o arquivo de música
musicaFundo.loop = true; // Faz a música tocar em loop
musicaFundo.volume = 0.5; // Define o volume (0.0 a 1.0)

// Começa a música de fundo quando o jogo começar
musicaFundo.play();

//---------------------------------------------//
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        nadador.dir = -5;
    } else if (e.key === 'ArrowDown') {
        nadador.dir = 5;
    }
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') {
        nadador.dir = 0;
    } else if (e.key === 'ArrowDown') {
        nadador.dir = 0;
    }
})// keydown: Se pressionar seta para cima, o nadador sobe.
// Se pressionar seta para baixo, ele desce.
// keyup:Para o nadador quando a tecla é solta.

//---------------------------------------------//
function colisao() {
    if (nadador.colid(b1)) {
        b1.recomeca();
        if (pontos < cap) pontos += 1; // Incrementa pontos só se for menor que o cap
        vida -= 1;
        colisaoSound.play(); // Toca o som de colisão
    } else if (nadador.colid(b2)) {
        b2.recomeca();
        if (pontos < cap) pontos += 1; // Incrementa pontos só se for menor que o cap
        vida -= 1;
        colisaoSound.play(); // Toca o som de colisão
    } else if (nadador.colid(b3)) {
        b3.recomeca();
        if (pontos < cap) pontos += 1; // Incrementa pontos só se for menor que o cap
        vida -= 1;
        colisaoSound.play(); // Toca o som de colisão
    } else if (nadador.colid(b4)) {
        b4.recomeca();
        if (pontos < cap) pontos += 1; // Incrementa pontos só se for menor que o cap
        vida -= 1;
        colisaoSound.play(); // Toca o som de colisão
    } else if (nadador.colid(b5)) {
        b5.recomeca();
        if (pontos < cap) pontos += 1; // Incrementa pontos só se for menor que o cap
        vida -= 1;
        colisaoSound.play(); // Toca o som de colisão
    } else if (nadador.colid(b6)) {
        b6.recomeca();
        if (pontos < cap) pontos += 1; // Incrementa pontos só se for menor que o cap
        vida -= 1;
        colisaoSound.play(); // Toca o som de colisão
    } else if (nadador.colid(b7)) {
        b7.recomeca();
        if (pontos < cap) pontos += 1; // Incrementa pontos só se for menor que o cap
        vida -= 1;
        colisaoSound.play(); // Toca o som de colisão
    }
}// A bóia reaparece no lado direito (recomeca()).
// O jogador perde 1 vida.
// Toca o som de colisão.

//---------------------------------------------//

function nextLevel() {
    if (pontos >= cap) {
        level += 1;
        cap = 10; // Aumenta a quantidade de pontos necessária para o próximo nível
        pontos = 0; // Zera os pontos ao passar de nível
        textoNivel.des_text("Level: " + level, 350, 250, 'red', '40px Times');
        
        // Toca o som de "level up"
        levelUpSound.play();

        // Aumenta a velocidade de todas as bóias
        [b1, b2, b3, b4, b5, b6, b7].forEach(boia => {
            boia.velocidade += 2;
        });
    }
}

function nextLevel() {
    if (pontos >= cap) {  // Se os pontos do jogador atingirem o limite necessário para subir de nível
        level += 1;       // Aumenta o nível do jogo
        cap = 10;        // Aumenta a quantidade de pontos necessários para o próximo nível
        pontos = 0;       // Zera os pontos do jogador

        textoNivel.des_text("Level: " + level, 350, 250, 'red', '40px Times');  // Mostra o novo nível na tela

        levelUpSound.play();  // Toca o som de "Level Up" para indicar a progressão

        [b1, b2, b3, b4, b5, b6, b7].forEach(boia => {  
            boia.velocidade += 2;  // Aumenta a velocidade de todas as bóias, tornando o jogo mais difícil
        });
    }
}

function gameOver() {
    if (vida <= 0) {  // Se a quantidade de vidas for 0 ou menor, o jogo acaba
        jogoAtivo = false;  // Define que o jogo não está mais ativo (para interromper o loop do jogo)
        musicaFundo.pause();  // Pausa a música de fundo
        gameOverSound.play();  // Toca o som de "Game Over"

        let gameOverImg = new Image();  // Cria um novo objeto de imagem
        gameOverImg.src = './img/perdeu.png';  // Define a imagem de "Game Over"

        gameOverImg.onload = function() {  // Quando a imagem carregar completamente...
            des.clearRect(0, 0, 800, 600);  // Limpa o canvas para remover todos os elementos do jogo
            des.drawImage(gameOverImg, 0, 0, 800, 600);  // Desenha a imagem de "Game Over" no canvas
        }
    }
}


function reiniciarJogo() {
    pontos = 0;  // Reseta a pontuação do jogador para 0
    vida = 5;  // Reinicia o número de vidas do jogador para o valor inicial
    level = 1;  // Define o nível do jogo de volta para o primeiro nível
    jogoAtivo = true;  // Ativa o jogo novamente (permitindo que ele continue rodando)

    // Reinicia as posições das bóias para que elas reapareçam fora da tela
    [b1, b2, b3, b4, b5, b6, b7].forEach(boia => {
        boia.x = Math.random() * 800 + 800;  // Define uma nova posição X fora da tela, garantindo que elas "voltem"
        boia.y = Math.random() * (600 - boia.h);  // Define uma nova posição Y aleatória dentro da altura da tela
    });

    // Reinicia a posição do nadador para a posição inicial
    nadador.x = 20;  
    nadador.y = 20;

    musicaFundo.play();  // Recomeça a música de fundo
    main();  // Recomeça o loop principal do jogo
}



function atualizar() {
    if (!jogoAtivo) return;

    bg.mov();
    bg2.mov();
    bg3.mov();
    nadador.mov();
    nadador.anim('nadador');
    b1.mov();
    b2.mov();
    b3.mov();
    b4.mov();
    b5.mov();
    b6.mov();
    b7.mov();

    colisao(); // Verificando as colisões
    nextLevel(); // Verificando se o jogador subiu de nível
    gameOver(); // Verificando se o jogo acabou
}

function desenhar() {
    bg.des_img();
    bg2.des_img();
    bg3.des_img();
    nadador.des_img();
    b1.des_img();
    b2.des_img();
    b3.des_img();
    b4.des_img();
    b5.des_img();
    b6.des_img();
    b7.des_img();
    
    if (jogoAtivo) {
        texto1.des_text("Pontos: " + pontos, 10, 25, 'black', '24px Times');
        texto2.des_text("Vidas: " + vida, 10, 50, 'black', '24px Times');
        textoNivel.des_text("Level: " + level, 10, 75, 'black', '24px Times');
    }
}

function main() {
    des.clearRect(0, 0, 800, 600);
    atualizar();
    desenhar();
    if (jogoAtivo) {
        requestAnimationFrame(main);
    }
}

main()
