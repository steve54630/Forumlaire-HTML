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
        createDiv_avecTexteEtInput('Heure début ', 'debut', 'debut', 'time', 'heure_deb', document.getElementById("date"), "required");
        createDiv_avecTexteEtInput('Heure fin ', 'fin', 'fin', 'time', 'heure_fin', document.getElementById("date"), "required");
    }

    //verification si "Absence longue est choisi"
    if (longue.checked) {
        createDiv_avecTexteEtInput('Du ', 'dateAbsence', 'date_debut', 'date', 'jour_deb', document.getElementById("date"), "required");
        createDiv_avecTexteEtInput('Au ', 'debut', 'date_fin', 'date', 'jour_fin', document.getElementById("date"), "required");
    }
}

ponct.click();


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
})
.catch((err) => {
    console.error(err);
});

//----------------------------------------------------Fonction pour vérifier qu'un seul motif est sélectionné-----------------------------------------
document.getElementById("submit").addEventListener("click", (e) => {
    //------------------------------------------------Méthode pour vérifier qu'un seul motif a été sélectionné----------------------------------------
    let choix = document.getElementsByName("raison");
    let count = 0;
    choix.forEach(element => {
        if (element.checked === true) { count = count + 1; }
    });
    if (count < 1) {
        alert("Aucun motif sélectionné");
        e.preventDefault();
    }
    else if (count > 1) {
        alert("Un seul motif sélectionnable");
        e.preventDefault();
    }
    //-----------------------------------------------Méthode pour vérifier les heures------------------------------------------------------------------
    var value = [document.getElementById("heure_deb").value, document.getElementById("heure_fin").value];
    console.log(value[0] +" "+ value[1]);
    if (value[0] > value[1]) {
        alert("L'heure de début ne peut pas être supérieur ou égale à l'heure de fin");
        e.preventDefault();
    };
    value.forEach(element => {
        if (element<8)
        {
            alert("Début des cours : 8h");
            e.preventDefault();
        }
        else if (element>17) {
            alert("Fin des cours : 17h");
            e.preventDefault();
        }
    });
});
