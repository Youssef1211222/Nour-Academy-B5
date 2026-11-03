

const bouttonajout = document.getElementById("ouvrir-formulaire")
const dialogajout = document.getElementById("dialog-ajout")

bouttonajout.addEventListener("click" , function() {
    dialogajout.showModal();
})

const annulerbutton = document.getElementById("annuler-ajout")

annulerbutton.addEventListener("click" , function() {
    dialogajout.close();
})

const listeEleves = document.getElementById("liste-eleves")
const groupefiltre = document.getElementById("filtre-groupe")
const recherche = document.getElementById("recherche")

function creerLigne(eleve) {
    const card = document.createElement("li");
    card.classList.add("student-card");
    const nomEleve = document.createElement("h3");
    nomEleve.textContent = eleve.prenom + " " + eleve.nom
    card.append(nomEleve)
    const absencesEleve = document.createElement("p")
    absencesEleve.textContent = "Absences :" + " " +eleve.absences
    card.append(absencesEleve)
    const moyennEleve = document.createElement("p")
    if (eleve.notes.length > 0) {
        const somme = eleve.notes.reduce((total , note) => total + note , 0);
        const moyenn = somme / eleve.notes.length;
        moyennEleve.textContent = "Moyenne :" + " " + moyenn.toFixed(2)
        
    }else {
        moyennEleve.textContent = "Moyenne : —";
    }
    card.append(moyennEleve) 
    return card;   
}

function afficherElevesFiltres() {
    const nomRecherche = recherche.value.toLowerCase();
    const groupeChoisi = groupefiltre.value;
    const resultat = eleves.filter(function(eleve) {
        const nomComplet = eleve.prenom + " " + eleve.nom
        const correspondNom = nomComplet.toLowerCase().includes(nomRecherche)
        const correspondGroupe = (groupeChoisi === "" || Number(groupeChoisi) === eleve.groupeId)
        return correspondGroupe && correspondNom
    })
    listeEleves.replaceChildren();
    const cards = resultat.map(creerLigne)
    listeEleves.append(...cards)
    if (resultat.length === 0) {
    const aucuneleve  = document.createElement("p");
    aucuneleve.textContent = "Aucun élève trouvé"
    listeEleves.append(aucuneleve)
    aucuneleve.classList.add("aucuneleve")
}
const compteur = document.getElementById("compteur")
const nombreEleve = resultat.length
compteur.textContent = nombreEleve + " " + "élèves"
}   

recherche.addEventListener("input", afficherElevesFiltres);
groupefiltre.addEventListener("change", afficherElevesFiltres);


groupes.forEach(function (groupe) {
    const groupeoption = document.createElement("option")
    groupeoption.value = groupe.id
    groupeoption.textContent = groupe.nom
    groupefiltre.append(groupeoption)
}) 
afficherElevesFiltres();








