const perguntas = [
    {
        pergunta: "Qual o nome do cientista que descobriu o processo de pasteurização e a vacina contra a raiva?",
        imagem: 'Imagem1.jpg',
        resposta: [
            {text: " Marie Curie", correto: false, icone: "fa-diamond"},
            {text: " Blaise Pascal", correto: false, icone: "fa-circle"},
            {text: " Louis Pasteur", correto: true, icone: "fa-heart"},
            {text: " Antoine Lavoisier", correto: false, icone: "fa-square"},
        ]
    },
    {
        pergunta: "Qual a função da ONU?",
        imagem: 'Imagem2.jpg',
        resposta: [
            {text: " Zelar pela cultura em todas as nações", correto: false, icone: "fa-diamond"},
            {text: " Unir as nações com o objetivo de manter a paz e a segurança mundial", correto: true, icone: "fa-circle"},
            {text: " Financiar países em desenvolvimento", correto: false, icone: "fa-heart"},
            {text: " Gerenciar acordos de comércio entre os países", correto: false, icone: "fa-square"},
        ]
    },
    {
        pergunta: "O que é o Acordo de Paris?",
        imagem: 'Imagem3.jpg',
        resposta: [
            {text: " Acordo internacional que trata do Desenvolvimento Sustentável", correto: false, icone: "fa-diamond"},
            {text: " Acordo internacional que trata da restrição de imigrantes em Paris", correto: false, icone: "fa-circle"},
            {text: " Acordo internacional que trata da poluição radioativa", correto: false, icone: "fa-heart"},
            {text: " Acordo internacional que trata do aquecimento global", correto: true, icone: "fa-square"},
        ]
    },
    {
        pergunta: "O que é Brexit?",
        imagem: 'Imagem4.jpeg',
        resposta: [
            {text: " Fim da monarquia no Reino Unido", correto: false, icone: "fa-diamond"},
            {text: " Mudança do sistema de governo no Reino Unido", correto: false, icone: "fa-circle"},
            {text: " Saída do Reino Unido da União Europeia", correto: true, icone: "fa-heart"},
            {text: " Saída da Inglaterra do Reino Unido", correto: false, icone: "fa-square"},
        ]
    },
    {
        pergunta: "A que temperatura a água ferve?",
        imagem: 'Imagem5.jpeg',
        resposta: [
            {text: " 100 ºC", correto: true, icone: "fa-diamond"},
            {text: " 180 ºC", correto: false, icone: "fa-circle"},
            {text: " -10 ºC", correto: false, icone: "fa-heart"},
            {text: " 0 ºC", correto: false, icone: "fa-square"},
        ]
    }
];

const elementoPergunta = document.getElementById("pergunta");
const questoes = document.getElementById("perguntas");
const proximo = document.getElementById("proximo");

let mudandoPerguntaIndex = 0; 
let score = 0;
const imagemPergunta = document.getElementById("imagemDif");


function comecaQuiz() {
    mudandoPerguntaIndex = 0;
    score = 0;
    proximo.innerHTML = "Próximo";
    mostrarPerguntas();
}


function mostrarPerguntas() {
    resetaTudo();
    let mudandoPergunta = perguntas[mudandoPerguntaIndex];
    let semPergunta = mudandoPerguntaIndex + 1;
    elementoPergunta.innerHTML = semPergunta + ". "+ mudandoPergunta.pergunta;
    imagemPergunta.src = mudandoPergunta.imagem;

    mudandoPergunta.resposta.forEach(respostas => {
        const botoes = document.createElement("button");
        const icones = `<i class="fa-solid ${respostas.icone}"></i>`
        botoes.innerHTML = icones + respostas.text;
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
    imagemPergunta.style.display = "none"
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