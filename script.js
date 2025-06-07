function MAIOR_MENOR_FUNC(a, b, c, d, e) {
    const maior = Math.max(a, b, c, d, e);
    const menor = Math.min(a, b, c, d, e);
    return { maior: maior, menor: menor };
}

function VOGAL_FUNC(c) {
    if (typeof c !== 'string' || c.length === 0) {
        return 0;
    }
    const char = c.toLowerCase()[0];
    const vogais = "aeiouàáâãéêíóôõúü";
    return vogais.includes(char) ? 1 : 0;
}

function LIMITES_FUNC(li, ls) {
    let resultado = {
        pares: [],
        somatorio: 0,
        mensagemErro: ""
    };

    li = parseInt(li);
    ls = parseInt(ls);

    if (isNaN(li) || isNaN(ls)) {
        resultado.mensagemErro = "Limites inválidos. Por favor, insira números inteiros.";
        return resultado;
    }

    if (li >= ls) {
        resultado.mensagemErro = "Intervalo inválido. O limite inferior deve ser menor que o superior.";
        return resultado;
    }

    for (let i = li + 1; i < ls; i++) {
        if (i % 2 === 0) {
            resultado.pares.push(i);
            resultado.somatorio += i;
        }
    }
    return resultado;
}

function ORDEM_FUNC(a, b, c) {
    const numeros = [parseFloat(a), parseFloat(b), parseFloat(c)];
    if (numeros.some(isNaN)) {
        return null;
    }
    numeros.sort((x, y) => x - y);
    return numeros;
}

function POSITIVO_NEGATIVO_FUNC(x) {
    return x > 0;
}

function PAR_IMPAR_FUNC(x) {
    return x % 2 === 0;
}

function exibirMensagem(resDiv, mensagem, tipo = "normal") {
    resDiv.innerHTML = mensagem;
    if (tipo === "erro") {
        resDiv.classList.add('error-display');
    } else {
        resDiv.classList.remove('error-display');
    }
}

document.getElementById('btn_ex1').addEventListener('click', function() {
    const inputs = [
        document.getElementById('ex1_num1').value,
        document.getElementById('ex1_num2').value,
        document.getElementById('ex1_num3').value,
        document.getElementById('ex1_num4').value,
        document.getElementById('ex1_num5').value
    ];
    const resDiv = document.getElementById('res_ex1');
    
    const numeros = inputs.map(val => parseInt(val));

    if (numeros.some(isNaN)) {
        exibirMensagem(resDiv, "Por favor, insira 5 números inteiros válidos.", "erro");
        return;
    }
    const resultado = MAIOR_MENOR_FUNC(...numeros);
    exibirMensagem(resDiv, `Maior valor: <strong>${resultado.maior}</strong><br>Menor valor: <strong>${resultado.menor}</strong>`);
});

document.getElementById('btn_ex2').addEventListener('click', function() {
    const charInput = document.getElementById('ex2_char').value;
    const resDiv = document.getElementById('res_ex2');

    if (!charInput || charInput.trim().length === 0) {
        exibirMensagem(resDiv, "Por favor, digite um caractere.", "erro");
        return;
    }
    const resultado = VOGAL_FUNC(charInput);
    exibirMensagem(resDiv, `O caractere '${charInput[0]}' ${resultado === 1 ? "<strong>É uma vogal</strong>" : "<strong>NÃO é uma vogal</strong>"}.`);
});

document.getElementById('btn_ex3').addEventListener('click', function() {
    const liStr = document.getElementById('ex3_li').value;
    const lsStr = document.getElementById('ex3_ls').value;
    const resDiv = document.getElementById('res_ex3');

    const resultado = LIMITES_FUNC(liStr, lsStr);

    if (resultado.mensagemErro) {
        exibirMensagem(resDiv, resultado.mensagemErro, "erro");
    } else {
        let htmlOutput = `Números pares no intervalo aberto (${parseInt(liStr)}, ${parseInt(lsStr)}):<br>`;
        if (resultado.pares.length > 0) {
            htmlOutput += `<strong>${resultado.pares.join(", ")}</strong><br>`;
        } else {
            htmlOutput += "Nenhum número par encontrado no intervalo aberto.<br>";
        }
        htmlOutput += `Somatório dos números pares: <strong>${resultado.somatorio}</strong>`;
        exibirMensagem(resDiv, htmlOutput);
    }
});

document.getElementById('btn_ex4').addEventListener('click', function() {
    const valA = document.getElementById('ex4_valA').value;
    const valB = document.getElementById('ex4_valB').value;
    const valC = document.getElementById('ex4_valC').value;
    const resDiv = document.getElementById('res_ex4');
    
    const resultado = ORDEM_FUNC(valA, valB, valC);

    if (resultado === null) {
        exibirMensagem(resDiv, "Por favor, insira 3 números válidos.", "erro");
        return;
    }
    exibirMensagem(resDiv, `Valores ordenados: <strong>${resultado.join(", ")}</strong>.`);
});

document.getElementById('btn_ex5').addEventListener('click', function() {
    const numXStr = document.getElementById('ex5_numX').value;
    const resDiv = document.getElementById('res_ex5');
    const numX = parseFloat(numXStr);

    if (isNaN(numX)) {
        exibirMensagem(resDiv, "Por favor, insira um número válido.", "erro");
        return;
    }
    const ehPositivo = POSITIVO_NEGATIVO_FUNC(numX);
    let mensagem;
    if (ehPositivo) {
        mensagem = `O número ${numX} <strong>é positivo</strong>.`;
    } else if (numX < 0) {
        mensagem = `O número ${numX} <strong>é negativo</strong>.`;
    } else {
         mensagem = `O número ${numX} <strong>é zero</strong>.`;
    }
    exibirMensagem(resDiv, mensagem);
});

document.getElementById('btn_ex6').addEventListener('click', function() {
    const numYStr = document.getElementById('ex6_numY').value;
    const resDiv = document.getElementById('res_ex6');
    const numY = parseFloat(numYStr);
                                                                   
    if (isNaN(numY)) {
        exibirMensagem(resDiv, "Por favor, insira um número válido.", "erro");
        return;
    }
    
    if (!Number.isInteger(numY)) {
         exibirMensagem(resDiv, `O número ${numY} não é um inteiro válido para esta operação. <br>Considerando a parte inteira (${Math.trunc(numY)}): ${Math.trunc(numY)} <strong>é ${PAR_IMPAR_FUNC(Math.trunc(numY)) ? "Par" : "Ímpar"}</strong>.`, "erro");
         return;
    }

    const ehPar = PAR_IMPAR_FUNC(numY);
    exibirMensagem(resDiv, `O número ${numY} <strong>é ${ehPar ? "Par" : "Ímpar"}</strong>.`);
});