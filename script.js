function criarPersonagem(){
    let nome = document.querySelector('input#nickname')
    let vidaMax = document.querySelector('input#life')
    let saniMax = document.querySelector('input#sani')
    let vida = vidaMax
    let sani = saniMax
    //let img = document.querySelector('input#image')

    if (nome.value == "") {
        alert("Nome inválido")
    }else{
    personagem.innerHTML = personagem.innerHTML + `
    <section>
    <div id="res" >
    <p id="nick">Player: ${nome.value}</p>
    <p id="saude">Vida: ${vida.value}/${vidaMax.value} <input type="number" name="dano" id="danoV">
    <button id="danovida" type="button" onclick="vidaAtual()" >Saúde atual</button></p>
    <p id="sanidade">Sanidade: ${sani.value}/${saniMax.value} <input type="number" name="dano" id="danoS">
    <button id="danosani" type="button" onclick="saniAtual()" >Sanidade atual</button></p>
    <p id="link"></p>
    </div>
    </section>`
    link.innerHTML = "http://localhost:3000/" + nome.value + "/" + vida.value + "/" + sani.value
}
}

function vidaAtual() {
    let vida = document.querySelector('input#life')
    let vAtual = document.querySelector('input#danoV')
    saude.innerHTML = `Vida: ${vAtual.value}/${vida.value} <input type="number" name="dano" id="danoV">
    <button id="danovida" type="button" onclick="vidaAtual()" >Saúde atual</button>`
    
}
        
function saniAtual() {
    let sani = document.querySelector('input#sani')
    let sAtual = document.querySelector('input#danoS')
    sanidade.innerHTML = `Sanidade: ${sAtual.value}/${sani.value} <input type="number" name="dano" id="danoS">
    <button id="danosani" type="button" onclick="saniAtual()" >Sanidade atual</button>`
}


function newplayer() {
    sessao.innerHTML = `
    <section>
    <div>
    <strong><p>Insira os dados do personagem:</p></strong>
    <p>Nome: <input type="text" name="personagem" id="nickname"></p>
    <p>Vida: <input type="number" name="vida" id="life"></p>
    <p>Sanidade: <input type="number" name="sanidade" id="sani"></p>
    <p><button class="botao" id="teste" onclick="criarPersonagem()" >Criar personagem</button>
    </div>
    </section>
    `
}
    //<p>Imagem: <input type="file" accept="image/*" id="image"></p>
    //<img id="foto" src="" alt="">