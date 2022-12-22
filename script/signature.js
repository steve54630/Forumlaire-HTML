var ponct = document.getElementById("ponctuel");
var longue = document.getElementById("longue");
createNode('date', 'div', document.getElementById("Duree"));

//---------------------------------------------------Fonction pour remplir le champ durée-----------------------------------------------------------

function remplirDuree() {

    date = document.getElementById("date")
    date.innerHTML = "";
    date.className = "date";

    //verification si "Absence ponctuel" est choisi
    if (ponct.checked) {
        createDiv_avecTexteEtInput('Le ', 'dateAbsence', 'date', 'date', 'jour_absence', document.getElementById("date"), "required");
        createDiv_avecTexteEtInput('Heure début ', 'debut', 'debut', 'text', 'heure_deb', document.getElementById("date"), "required");
        createDiv_avecTexteEtInput('Heure fin ', 'fin', 'fin', 'text', 'heure_fin', document.getElementById("date"), "required");
    }

    //verification si "Absence longue est choisi"
    if (longue.checked) {
        createDiv_avecTexteEtInput('Du ', 'dateAbsence', 'date', 'date', 'jour_deb', document.getElementById("date"), "required");
        createDiv_avecTexteEtInput('Au ', 'debut', 'date', 'date', 'jour_fin', document.getElementById("date"), "required");
        createDiv_avecTexteEtInput('Soit ', 'fin', 'date', 'text', 'nombre_jour', document.getElementById("date"), "required");
    }
}

//---------------------------------------------------Fonction pour créer les champs motifs----------------------------------------------------------

let url = 'ressources/motif.json';
fetch(url)
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((value) => {
        createRaison(value);
        document.getElementById("nom").value = recupererFormulaire("nom");
        document.getElementById("prenom").value = recupererFormulaire("prenom");
        document.getElementById("listeFormation").value = recupererFormulaire("listeFormation");
        if (recupererFormulaire("absence") == "ponctuel") {
            ponct.click();
            document.getElementById("jour_absence").value = recupererFormulaire("date");
            document.getElementById("heure_deb").value = recupererFormulaire("debut").replace("%3A", ":");
            document.getElementById("heure_fin").value = recupererFormulaire("fin").replace("%3A", ":");
        }
        else {
            longue.click()
            document.getElementById("jour_deb").value = recupererFormulaire("date_debut");
            document.getElementById("jour_fin").value = recupererFormulaire("date_fin");
            let debut = new Date(recupererFormulaire("date_debut"));
            let fin = new Date(recupererFormulaire("date_fin"));
            document.getElementById("nombre_jour").value = ((fin-debut)/(86400000)) + " jours complets";
        };
        document.getElementById("choixAbsence").remove();
        document.getElementsByName("raison").forEach(element => {
            if (element.value == recupererFormulaire("raison")) { element.checked = true; }
        });
        let input = document.getElementById("form").querySelectorAll("input");
        input.forEach(element => {
            element.disabled = "true";
        });
        let input2 = document.getElementById("Raisons").querySelectorAll("input");
        input2.forEach(element => {
            element.disabled = "true";
        });
        document.querySelector("select").disabled = "true";
    })
    .catch((err) => {
        console.error(err);
    });