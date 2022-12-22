function createNode(id, type, division) {
    type = document.createElement(type);
    type.id = id
    division.appendChild(type);
    return type;
}

function createDiv_avecTexteEtInput(textvalue, idDiv, name, type, id, division, required) {
    let div = createNode(idDiv, 'label', division);
    div.innerHTML = textvalue;
    let input = createInput(id, name, type, div);
    input.required = required;
    input.setAttribute("onclick", "this.input.click()")
    return input;
}

function createInput(id, name, type, node) {
    const input = document.createElement("input");
    input.id = id;
    input.name = name;
    input.title = name;
    input.type = type;
    node.appendChild(input);
    return input;
}

function createRaison(value) {
    var raison = document.getElementById("Raisons");
    createNode("Titre", 'h1', raison).innerHTML = value['topTitle'];
    value['members'].forEach(element => {
        let node = createNode(element['id'], 'h4', document.getElementById("Raisons"));
        node.style.margin = '30px 0px 0px';
        node.name = element['name'];
        node.innerHTML = element['name'] + ' : ' + element['title'];
        element['options'].forEach(option => {
            let input = createDiv_avecTexteEtInput(option['op_label'], "", 'raison', 'checkbox', option["op_id"], document.getElementById("Raisons"), "");
            input.value = option["op_id"];
            input.title = option['op_label'];
        });
    });
    return raison;
}

function recupererFormulaire(cle) {
    let url = window.location.search.substring(1);
    let varUrl = url.split('&');
    varUrl.forEach(element => {
        let choix = element.split('=');
        if (choix[0] == cle) { value = choix[1] }
    });
    return value;
}