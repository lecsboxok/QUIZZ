const perguntas = [
    {
        pergunta: "Qual o nome do cientista que descobriu o processo de pasteurização e a vacina contra a raiva?",
        resposta: [
            {text: "Marie Curie", correto: false},
            {text: "Blaise Pascal", correto: false},
            {text: "Louis Pasteur", correto: true},
            {text: "Antoine Lavoisier", correto: false},
        ]
    },
    {
        pergunta: "Qual a função da ONU?",
        resposta: [
            {text: "Zelar pela cultura em todas as nações", correto: false},
            {text: "Unir as nações com o objetivo de manter a paz e a segurança mundial", correto: true},
            {text: "Financiar países em desenvolvimento", correto: false},
            {text: "Gerenciar acordos de comércio entre os países", correto: false},
        ]
    },
    {
        pergunta: "O que é o Acordo de Paris?",
        resposta: [
            {text: "Acordo internacional que trata do Desenvolvimento Sustentável", correto: false},
            {text: "Acordo internacional que trata da restrição de imigrantes em Paris", correto: false},
            {text: "Acordo internacional que trata da poluição radioativa", correto: false},
            {text: "Acordo internacional que trata do aquecimento global", correto: true},
        ]
    },
    {
        pergunta: "O que é Brexit?",
        resposta: [
            {text: "Fim da monarquia no Reino Unido", correto: false},
            {text: "Mudança do sistema de governo no Reino Unido", correto: false},
            {text: "Saída do Reino Unido da União Europeia", correto: true},
            {text: "Saída da Inglaterra do Reino Unido", correto: false},
        ]
    },
    {
        pergunta: "A que temperatura a água ferve?",
        resposta: [
            {text: "100 ºC", correto: true},
            {text: "180 ºC", correto: false},
            {text: "-10 ºC", correto: false},
            {text: "0 ºC", correto: false},
        ]
    }
];

const elementoPergunta = document.getElementById("pergunta");
const questoes = document.getElementById("perguntas");
const proximo = document.getElementById("proximo");

let mudandoPerguntaIndex = 0; 
let score = 0;

function comecaQuiz() {
    mudandoPerguntaIndex = 0;
    score = 0;
    proximo.innerHTML = "Próximo";
    mostrarPerguntas();
}

let icone = '<div class="icone"><i class="fa-solid fa-diamond"></i></div>'

function mostrarPerguntas() {
    resetaTudo();
    let mudandoPergunta = perguntas[mudandoPerguntaIndex];
    let semPergunta = mudandoPerguntaIndex + 1;
    elementoPergunta.innerHTML = semPergunta + ". "+ mudandoPergunta.pergunta;
    

    mudandoPergunta.resposta.forEach(respostas => {
        const botoes = document.createElement("button");
        botoes.innerHTML = respostas.text;
        botoes.classList.add("botoes");
        questoes.appendChild(botoes);
        if(respostas.correto) {
            botoes.dataset.correto = respostas.correto;
        }
        botoes.addEventListener("click", selecionaResposta);
    });
}

function resetaTudo(){
    proximo.style.display = "none";
    while(questoes.firstChild){
        questoes.removeChild(questoes.firstChild);
    }
}

function selecionaResposta(e){
    const selecionaBtn = e.target;
    const eCorreto = selecionaBtn.dataset.correto === "true";
    if(eCorreto){
        selecionaBtn.classList.add("correto");
        score++;
    }else{
        selecionaBtn.classList.add("incorreto");
    }
    Array.from(questoes.children).forEach(botoes => {
        if(botoes.dataset.correto === "true"){
            botoes.classList.add("correto");
        }
        botoes.disabled = true;
    });
    proximo.style.display = "block";
}

function mostrarScore(){
    resetaTudo();
    elementoPergunta.innerHTML = `Seu score ${score} de ${perguntas.length}!`;
    proximo.innerHTML = "Jogue Novamente";
    proximo.style.display = "Block";
}

function tocarProximoBotao(){
    mudandoPerguntaIndex++;
    if(mudandoPerguntaIndex < perguntas.length){
        mostrarPerguntas();
    }else{
        mostrarScore();
    }
}

proximo.addEventListener("click", ()=>{
    if(mudandoPerguntaIndex < perguntas.length){
        tocarProximoBotao();
    }else{
        comecaQuiz();
    }
});

comecaQuiz();