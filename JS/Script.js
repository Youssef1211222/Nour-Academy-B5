

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
        card.append(moyennEleve) 
    }
    return card;   
}

function afficherElevesFiltres() {
    
}

const cards = eleves.map(creerLigne);
listeEleves.append(...cards);

if (eleves.length === 0) {
    const aucuneleve  = document.createElement("p");
    aucuneleve.textContent = "Aucun élève trouvé"
    listeEleves.append(aucuneleve)
    aucuneleve.classList.add("aucuneleve")
}

const compteur = document.getElementById("compteur")
const nombreEleve = eleves.length
compteur.textContent = nombreEleve + " " + "éléves"


const groupefiltre = document.getElementById("filtre-groupe")
 


groupes.forEach(function (groupe) {
    const groupeoption = document.createElement("option")
    groupeoption.value = groupe.id
    groupeoption.textContent = groupe.nom
    groupefiltre.append(groupeoption)
}) 

const recherche = document.getElementById("recherche")
recherche.addEventListener("input" , function(event) {
    const elevenom = event.target.value.toLowerCase()
    const resultat = eleves.filter(function(eleve) {
    const nomComplet = eleve.prenom + " " + eleve.nom;
    return nomComplet.toLowerCase().includes(elevenom);
    })
    listeEleves.replaceChildren();
    const filternom = resultat.map(creerLigne)
    listeEleves.append(...filternom)
})




groupefiltre.addEventListener("change" , function(event) {
    const groupeChoisi = Number(event.target.value);
    const resultat = eleves.filter(function(eleve) {
    if (event.target.value === "") return true;
    return (eleve.groupeId === groupeChoisi)
    
})
    listeEleves.replaceChildren();
    const fillterafiche = resultat.map(creerLigne);
    listeEleves.append(...fillterafiche)
})


