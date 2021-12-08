
let image = '';




function clearCharacter() {
    location.reload();
}

function putOnScreen(name, life, stability, totalLife, totalStability, image) {
    let personagem = document.getElementById('personagem');
    personagem.innerHTML = personagem.innerHTML + `
        <section class="card-panel section col s12">
        <div class="row" id="player${name}">
            <div class="col s4">
                <label class="white-text" id="nick">Player:</label>
                <span id="nickSpan${name}" name="${name}">${name}</span>
            </div><br>
            <div class="col s4">
                    <img class="col s9" id="profileImage" alt="Imagem do Jogador" src="http://localhost:8081/uploads/${image}"/>
            </div>
            <div class="col s4">
                <label class="white-text" id="saude">Vida:</label>
                <span id="spanCurrentLife${name}" name="${life}">${life}</span>/<span id="spanTotalLife${name}" name="${totalLife}">${totalLife}</span>
                <input name="dano" id="currentLife${name}"/>
            </div>
            <div class="col s4">
                <label class="white-text" id="sanidade">Sanidade:</label>
                <span id="spanCurrentStability${name}" name="${stability}">${stability}</span>/<span id="spanTotalStability${name}" name="${totalStability}">${totalStability}</span>
                <input name="dano" id="currentStability${name}">
                <button id="currentStabilityButton" class="btn-small waves-effect waves-light red darken-4 right" type="button" onclick="updateStatus('${name}')" >Alterar saúde</button>
            </div>
        </div>
        <div class=row>
            <div class="col s12">
                <p id="link"></p>
                <a href="http://localhost:8081/${name}" target="_blank"> http://localhost:8081/${name}</a>
            </div>
        </div>
    </section>`
    
}

function criarPersonagem(){
    let name = document.getElementById('nickname').value;
    let life = document.getElementById('life').value;
    let stability = document.getElementById('stability').value;
    
        if (!name || !life || !stability) {
            alert('missing fields:name or life or stability');
        return;
    }
    
    putOnScreen(name, life, stability, life, stability, image)
    
    sender({
        name: name,
        currentLife: life,
        totalLife: life,
        currentStability: stability,
        totalStability: stability,
        image: image
    })
    clear();
}

function clear () {
    document.getElementById('nickname').value = '';
    document.getElementById('life').value = '';
    document.getElementById('stability').value = '';
    image = '';
    base64 = '';
}

function sender(personagem) {
    if(!personagem.hasOwnProperty('name') || !personagem.name) {
        alert('falta nome no sender')
        return;
    }

    axios({
        method: 'post',
        url: 'http://localhost:8081/new',
        data: personagem
    })
    .then(function (resposnse) {
        console.log(resposnse)
    })
    .catch(function(error) {
        console.log(error)
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    })
}

function update(personagem) {
    if (!personagem.hasOwnProperty('name') || !personagem.name) {
        alert('falta nome no sender')
        return;
    }
        axios({
        method: 'post',
        url: 'http://localhost:8081/update',
        data: personagem
    })
        .then( response => {
            console.log(response)
            setTimeout(() => {
                location.reload(true)
            }, 4000);
        })
        .catch(function (error) {
            console.log(error)
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })
}

function updateStatus(player) {
    let personagem = document.getElementById('personagem');
    console.log(player)
    let name = document.getElementById('nickSpan'+ player).attributes.name.value;
    let totalLife = document.getElementById('spanTotalLife'+ player).attributes.name.value;
    let currentLife = document.getElementById('currentLife'+ player).value;
    let currentStability = document.getElementById('currentStability'+ player).value;
    let totalStability = document.getElementById('spanTotalStability'+ player).attributes.name.value;

    if(!currentLife) currentLife = document.getElementById('spanCurrentLife').attributes.name.value;
    if(!currentStability) currentStability = document.getElementById('spanCurrentStability').attributes.name.value;


    console.log({
        name,
        currentLife,
        totalLife,
        currentStability,
        totalStability
    })
    update({
        name,
        currentLife,
        totalLife,
        currentStability,
        totalStability
    })

}

function show(){
    axios({
        method: 'post',
        url: 'http://localhost:8081/data',
    })
    .then(function (response){
        for(let personagem of response.data){
            if(personagem){
                putOnScreen(personagem.name, personagem.currentLife, personagem.currentStability, personagem.totalLife, personagem.totalStability, personagem.image)
            }
        }
    })
    .catch(function(error){
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    })
}

Dropzone.options.logoDropZone = {
    paramName: "perfilPhoto",
    maxFilesize: '2mb',
    autoDiscover: false,
    url: 'file-upload',
    success: function(file, response) {
        image = response.filename;
        console.log("Successfully uploaded :", image);
    },
    error: function (file, response) {
        console.log("ERROR uploaded :", response);
    }
}




show();
