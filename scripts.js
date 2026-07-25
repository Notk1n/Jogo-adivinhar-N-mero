const tentativasMax = 10;
// 1. Cria o numero maximo de tentativas permitidas

let jogoGanho = false; 
// 2. Cria a variavel para controlar o estado do jogo, ele para quando o valor for true, sem essa variavel o codigo não saberia se o jogo já terminou

let numeroSecreto = null;
// 3. Guarda o numero aleatorio 

let tentativasRestantes = tentativasMax;
// 4. Conta quantas tentativas ainda faltam, ela recebe a variavel tentativasMax para que o valor de tentativas maximas não seja ultrapassado

let historicoTentativas = [];
// 4.1 Guarda todos os palpites válidos feitos pelo jogador

const formJogo = document.getElementById('formJogo');
const palpiteInput = document.getElementById('palpite');
const botaoChutar = document.getElementById('enviar');
const botaoReiniciar = document.getElementById('reiniciar');
const textoTentativas = document.getElementById('tentativas');
const textoDicas = document.getElementById('dicas');
const textoTentativasAnteriores = document.getElementById('tentativas-ant');
const textoResultado = document.getElementById('resultado');
// 5. DOM

function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    jogoGanho = false;
    tentativasRestantes = tentativasMax;
    /* 6. Cria a função para iniciar o jogo
       6.1  Gera um número decimal aleatório entre 0 e 1
    o * 100 multiplica esse valor para ficar entre 0 e 100
    + 1 faz o resultado ficar entre 1 e 101
    Math.floor(...) arredonda para baixo, deixando um número inteiro entre 1 e 100
    */

    palpiteInput.value = ''; 
    // 7. limpa o campo de entrada do input, removendo o numero digitado antes
    palpiteInput.disabled = false; 
    // 7.1 Reativa o campo de entrada, permitind o usuario digitar de novo
    botaoChutar.disabled = false ;
    // 7.2 Reativa o botão para um novo palpite

    historicoTentativas = [];
    textoTentativasAnteriores.textContent = 'Tentativas anteriores: ';
    textoTentativas.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    // 8. Mostra as tentativas restantes
    textoResultado.textContent = '';
    // 9. Deixa o texto de resultado vazio
    palpiteInput.focus();
    // 10. Faz o cursor ficar no input de palpite sem precisar clicar nele.
}   

function verificarPalpite(event) {
    event.preventDefault();
    // 11; Impede que a pagina seja recarregada 

    if (jogoGanho || tentativasRestantes === 0) {
        return;
    }

    /*
    12: Isso impedi que o jogo continue após o fim da rodada.

    Ele faz duas verificações:

    jogoGanho:
    se o jogador já acertou, o jogo terminou com vitória

    tentativasRestantes === 0:
    se acabaram as tentativas, o jogo terminou com derrota

    Quando uma dessas condições for verdadeira, o código executa return, ou seja, “para aqui e não faz mais nada”.
    */

    const palpite = Number(palpiteInput.value);
    // 13. Transforma o valor "numero"(string) digitado em um numero(number)

    if(!Number.isInteger(palpite) || palpite < 1 || palpite > 100) {
        textoDicas.textContent = 'Digite um número entre 1 e 100.';
        return;
        // 14. Verificar se o numero digitado é um numero inteiro e se esta entre 1 e 100
    }

    historicoTentativas.push(palpite);
    textoTentativasAnteriores.textContent = `Tentativas anteriores: ${historicoTentativas.join(', ')}`;

    tentativasRestantes -= 1;
    // 15. Reduz uma tentativa após cada chute

    if (palpite === numeroSecreto) {
        jogoGanho = true;
        textoResultado.textContent = 'Parabéns você acertou!';
        textoDicas.textContent = `O número secreto era ${numeroSecreto}.`;
        textoTentativas.textContent = `Você acertou com ${tentativasMax - tentativasRestantes} tentativa(s)`;
        palpiteInput.disabled = true;
        botaoChutar.disabled = true;
        return;

        /*
        16. Verifica se o numero que o usuario digitou é o mesmo do numero sorteado, o jogo acaba e aparecerá a mensagem informando qual era o numero sorteado.
        16.1 Mostra com quantas tentativas o usario acertou.
        16.2 Impede que novos palpites sejam feitos.
        */
    }

    if (tentativasRestantes === 0) {
        textoResultado.textContent = 'Fim de Jogo!';
        textoDicas.textContent = `O número secreto era ${numeroSecreto}`;
        textoTentativas.textContent = 'Suas tentativas acabaram!';
        palpiteInput.disabled = true;
        botaoChutar.disabled = true;
        return;
    
        /*
        17. Verifica se as tentativas do usuario acabaram, se sim, a mensagem informando que as tentativas acabaram irá aparecer e finalizar o jogo, impedindo que o usario faça novos palpites
        */
    }
    textoDicas.textContent = palpite < numeroSecreto 
    ? 'Muito baixo! Tente um número maior.'
    : 'Muito alto! Tente um número menor';
    textoDicas.style.alignSelf = 'center';

    textoTentativas.textContent = `Tentativas Restantes ${tentativasRestantes}`; 
    palpiteInput.value = '';
    palpiteInput.focus();
}

formJogo.addEventListener('submit', verificarPalpite);
botaoReiniciar.addEventListener('click', iniciarJogo);

iniciarJogo();
