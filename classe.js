class Obj {
    constructor(x, y, w, h, a) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }
//     Essa classe é a base para todos os objetos do jogo (bóias, nadador, etc.).
// Ela tem propriedades como posição, tamanho e imagem.

    des_img() {
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    } // O método des_img() desenha o objeto na tela.
}
//---------------------------------------------//
class Boia extends Obj {
    constructor(x, y, w, h, a) {
        super(x, y, w, h, a);
        this.velocidade = 2; // Velocidade inicial
    } 
    mov() {
        this.x -= this.velocidade;
        if (this.x <= -80) {
            this.x = 880;
            pontos += 1;
            console.log(pontos);
            this.recomeca();
        }
    }

    recomeca() {
        this.x = 800;
        this.y = Math.floor(Math.random() * ((730 - 2 + 1) + 2));
    }
}//As bóias se movem para a esquerda.
// Quando saem da tela, elas reaparecem no lado direito.
// A posição vertical é aleatória para aumentar o desafio.
// A pontuação aumenta sempre que uma bóia some da tela.

//----------------------------------------------------------------------//

class Nadador extends Obj {
    dir = 0
    frame = 1
    tempo = 0

    mov() {
        this.y += this.dir
        if (this.y <= 2) {
            this.y = 2
        } else if (this.y >= 546) {
            this.y = 546
        }
    }//O nadador pode se mover para cima e para baixo.
//Ele não pode sair dos limites superiores e inferiores da tela.
//A propriedade dir será modificada por outro código para movimentá-lo.

//----------------------------------------------------------------------------//
    colid(objeto) {
        if ((this.x < objeto.x + objeto.w) &&
            (this.x + this.w > objeto.x) &&
            (this.y < objeto.y + objeto.h) &&
            (this.y + this.h > objeto.y)) {
            return true
        } else {
            return false
        }
    }

    anim(nome) {
        this.tempo += 1
        if (this.tempo > 12) {
            this.tempo = 0
            this.frame += 1
        }
        if (this.frame > 4) {
            this.frame = 1
        }
        this.a = "img/" + nome + this.frame + ".png"
    }
}

class Bg extends Obj {
    mov() {
        this.x -= 5
        if (this.x <= -800) {
            this.x = 1600
        }
    }
}

class Text {
    des_text(text, x, y, cor, font) {
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text, x, y)
    }
}