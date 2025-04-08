const state = {
    view: {
        /* Views - Alterar elementos visuais visuais */
        squares: document.querySelectorAll(".square"),
        /* querySelectorAll pega todos os elementos que combinam com o seletor (ex.: .square). */
        enemy: document.querySelector(".enemy"),
        /* querySelector pega o primeiro elemento que combina com o seletor (ex.: .enemy). */
        timeLeft: document.querySelector("#time-left"),
        /* tempo */
        score: document.querySelector("#score"),
        /* pontuação */
    },
    values: {
        /* Value - Alterações internas */
        gameVelocity: 1000,
        /* Velocidade do jogo (1 segundo). */
        hitPosition: 0, /* posição enemy */
        result: 0, /* pontuação */
        curretTime: 60, /* tempo atual */
    },

    actions: {
        /* actions - executa ações */
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
    /* atualizando tempo */
}

    if (state.values.curretTime < 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Gamer Over! O seu resultado foi: " + state.values.result);
}

function playSound(audioName) {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2; /* volume do audio */
    audio.play ();
}

function randomSquare() {
    /* Remove a classe "enemy" do quadrado atual. */
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    /* Adiciona a classe "enemy (Ralph)" ao quadrado aleatório. */
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        /* Adicione lógica para lidar com cliques nos quadrados aqui. */
        square.addEventListener("mousedown", () => {
            /* mousedown - quando o mouse for clicado */
            if (square.id === state.values.hitPosition) {
                // Se o quadrado clicado for o mesmo onde o inimigo está:
                state.values.result++;
                /* Adiciona 1 à pontuação. */
                state.view.score.textContent = state.values.result;
                // Atualiza a pontuação na tela.
                state.values.hitPosition = null;
                // Reseta a posição do inimigo.
                playSound("hit"); /* som com a pontuação */
            }
        });
    });
}

function initialize() {
    addListenerHitBox();
    /* Adiciona o evento de clique aos quadrados. */
}


initialize();
/* Inicializa o jogo. */