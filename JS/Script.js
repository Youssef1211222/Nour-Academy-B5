

const bouttonajout = document.getElementById("ouvrir-formulaire")
const dialogajout = document.getElementById("dialog-ajout")
const dialognote =document.getElementById("dialog-note")

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
    if (eleve.absences >= 3) {
        card.classList.add("absence-alert")
    }
    const nomEleve = document.createElement("h3");
    nomEleve.textContent = eleve.prenom + " " + eleve.nom
    card.append(nomEleve)
    const absencesEleve = document.createElement("p")
    absencesEleve.textContent = "Absences :" + " " + eleve.absences
    if (eleve.absences >= 3) {
    absencesEleve.classList.add("absence-text-alert");
    
    }
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
    const boutonAbsence = document.createElement("button")
    boutonAbsence.textContent = "Ajouter une absence"
    boutonAbsence.classList.add("btn-Absence")
    card.append(boutonAbsence)
    boutonAbsence.dataset.id = eleve.id;

    const boutonNote = document.createElement("button")
    boutonNote.textContent = "Ajouter une note"
    boutonNote.classList.add("btn-Note")
    card.append(boutonNote)
    boutonNote.dataset.id = eleve.id

    return card;   
}
let idEleveSelectionne = null;
listeEleves.addEventListener("click" , function(event) {
    const bouton = event.target.closest(".btn-Absence");
    const Nbouton = event.target.closest(".btn-Note")
    const noteD = document.getElementById("dialog-note")

    if (Nbouton) {
        noteD.showModal();
        dialognote.classList.remove("hidden")
        dialognote.classList.add("show")
        const idEleve = Number(Nbouton.dataset.id)
        idEleveSelectionne = idEleve
        eleves.find(function(eleve) {
            return eleve.id === idEleve
        })
    }
    if (bouton) {
        const idEleve = Number(bouton.dataset.id);
        const eleveTrouve  = eleves.find(function (eleve) {
            return eleve.id === idEleve
        })
        if (eleveTrouve) {
            eleveTrouve.absences += 1;
            afficherParentsAAppeler();
            afficherElevesFiltres();
        }
        
    }
})
const annulerA = document.getElementById("annuler-note")
const noteD = document.getElementById("dialog-note")
annulerA.addEventListener("click" ,function(){
    noteD.close();
    dialognote.classList.add("hidden")
dialognote.classList.remove("show")

})
const confirm = document.getElementById("confirmer-note")
confirm.addEventListener("click", function() {
        dialognote.classList.add("hidden")
        dialognote.classList.remove("show")
    const input = document.getElementById("input-note")
    const inputNote = Number(input.value)
    if (inputNote < 0 || inputNote > 20) return
    const eleveTrouve = eleves.find(function(eleve) {
        return idEleveSelectionne === eleve.id
    })
    if (eleveTrouve) {
        eleveTrouve.notes.push(inputNote)
        afficherElevesFiltres();
        noteD.close();
        input.value = ""
    }
})

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

function afficherParentsAAppeler() {
    const elevesAlertes = eleves.filter(function (eleve) {
        return eleve.absences >= 3;
    })
    const parentsSection = document.getElementById("liste-parents");
    parentsSection.replaceChildren();
    if (elevesAlertes.length === 0) {
        const acounalert = document.createElement("li");
        acounalert.classList.add("acoun-css")
        acounalert.textContent = "Aucun parent à contacter"
        parentsSection.append(acounalert)
    }
    elevesAlertes.forEach(function (eleve) {
            const absence = document.createElement("li")
            absence.classList.add("absencecss")
            absence.textContent = eleve.prenom + "  " + eleve.nom + "  " + "Tel" + "   -   " + eleve.telephoneParent
            parentsSection.append(absence)
    })
}
const addOption = document.getElementById("groupe")

groupes.forEach(function(groupe) {
    const newoption = document.createElement("option")
    newoption.textContent =groupe.nom
    newoption.value = groupe.id
    addOption.append(newoption)
})
addOption.addEventListener("change", function() {
    const errorGroup = document.querySelector(".groupes-error");

    errorGroup.textContent = "";
    errorGroup.classList.remove("Rejete");
});

const regexPrenom = /^(?=(?:.*[a-zA-ZÀ-ÿ]){2,})[a-zA-ZÀ-ÿ -]+$/;

const regexNom = /^(?=(?:.*[a-zA-ZÀ-ÿ]){2,})[a-zA-ZÀ-ÿ -]+$/;

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const regexTelephone = /^(0[67]\d{8}|\+212[67]\d{8})$/;

const regexCode = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;




const prenomInput = document.getElementById("prenom");
const prenomError = document.querySelector(".prenom-error");


prenomInput.addEventListener("input", function() {
    const valide = regexPrenom.test(prenomInput.value.trim());

    if (valide) {
        prenomError.textContent = "Prénom valide";
        prenomError.style.color = "green";
        prenomInput.style.border = "2px solid green";
    } else {
        prenomError.textContent = "Prénom invalide : minimum 2 lettres";
        prenomError.style.color = "red";
        prenomInput.style.border = "2px solid red";
    }
});

const nomInput = document.getElementById("nom");
const nomError = document.querySelector(".nom-error");

nomInput.addEventListener("input", function() {
    const valide = regexNom.test(nomInput.value.trim());

    if (valide) {
        nomError.textContent = "Nom valide";
        nomError.style.color = "green";
        nomInput.style.border = "2px solid green";
    } else {
        nomError.textContent = "Nom invalide : minimum 2 lettres";
        nomError.style.color = "red";
        nomInput.style.border = "2px solid red";
    }
});

const emailInput = document.getElementById("email-parent");
const emailError = document.querySelector(".email-error");

emailInput.addEventListener("input", function() {
    const valide = regexEmail.test(emailInput.value.trim());

    if (valide) {
        emailError.textContent = "Email valide";
        emailError.style.color = "green";
        emailInput.style.border = "2px solid green";
    } else {
        emailError.textContent = "Adresse email invalide";
        emailError.style.color = "red";
        emailInput.style.border = "2px solid red";
    }
});

const telephoneInput = document.getElementById("telephone-parent");
const telephoneError = document.querySelector(".telephone-error");

telephoneInput.addEventListener("input", function() {
    const valide = regexTelephone.test(telephoneInput.value.trim());

    if (valide) {
        telephoneError.textContent = "Téléphone valide";
        telephoneError.style.color = "green";
        telephoneInput.style.border = "2px solid green";
    } else {
        telephoneError.textContent = "Numéro marocain invalide";
        telephoneError.style.color = "red";
        telephoneInput.style.border = "2px solid red";
    }
});

const codeInput = document.getElementById("code-acces");
const codeError = document.querySelector(".code-error");

codeInput.addEventListener("input", function() {
    const valide = regexCode.test(codeInput.value);

    if (valide) {
        codeError.textContent = "Code valide";
        codeError.style.color = "green";
        codeInput.style.border = "2px solid green";
    } else {
        codeError.textContent = "Minimum 8 caractères, une majuscule, un chiffre et un caractère spécial";
        codeError.style.color = "red";
        codeInput.style.border = "2px solid red";
    }
});

const submitForm = document.getElementById("form-ajout");

submitForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const prenomInput = document.getElementById("prenom");
    const nomInput = document.getElementById("nom");
    const groupeMenu = document.getElementById("groupe");
    const emailInput = document.getElementById("email-parent");
    const telephoneInput = document.getElementById("telephone-parent");
    const codeInput = document.getElementById("code-acces");

    const prenomValue = prenomInput.value.trim();
    const nomValue = nomInput.value.trim();
    const groupeValue = groupeMenu.value;
    const emailValue = emailInput.value.trim();
    const telephoneValue = telephoneInput.value.trim();
    const codeValue = codeInput.value;
    

    const validations = [
    regexPrenom.test(prenomValue),
    regexNom.test(nomValue),
    regexEmail.test(emailValue),
    regexTelephone.test(telephoneValue),
    regexCode.test(codeValue),
    groupeValue !== ""
];

const formulaireValide = validations.every(function(valide) {
    return valide;
});

if (!formulaireValide) {
    const inputs = [
        prenomInput,
        nomInput,
        emailInput,
        telephoneInput,
        codeInput,
        groupeMenu
    ];

const messages = [
    document.querySelector(".prenom-error"),
    document.querySelector(".nom-error"),
    document.querySelector(".email-error"),
    document.querySelector(".telephone-error"),
    document.querySelector(".code-error"),
    document.querySelector(".groupes-error")
];

const erreurs = [
    "Prénom invalide",
    "Nom invalide",
    "Email invalide",
    "Téléphone invalide",
    "Code invalide",
    "Veuillez choisir un groupe"
];

let premierInvalide = null;

for (let i = 0; i < validations.length; i++) {
    if (!validations[i]) {
        inputs[i].style.border = "2px solid red";
        messages[i].textContent = erreurs[i];
        messages[i].style.color = "red";

        if (premierInvalide === null) {
            premierInvalide = inputs[i];
        }
    }
}

premierInvalide.focus();

    return;
}

    const elevesID = eleves.map(function (eleve) {
        return eleve.id
    })
    const maxID = Math.max(...elevesID)
    const newID = maxID + 1;
    
    const eleveExiste = eleves.some(function(eleve) {
        return eleve.prenom.toLowerCase() === prenomValue.toLowerCase()&&eleve.nom.toLowerCase() === nomValue.toLowerCase()&&eleve.groupeId === Number(groupeValue)

    })

    if (eleveExiste) {
        messageAjout.classList.remove("success");
        messageAjout.classList.add("error");
        dialogajout.close();
        
        const messageerror = document.getElementById("message-error")
        messageerror.textContent = "Cet élève existe déjà dans ce groupe"
        messageAjout.showModal();
        return;
    }

    const elevesDuGroupe = eleves.filter(function(eleve) {
        return eleve.groupeId === Number(groupeValue)
    })

    if (elevesDuGroupe.length >= 15) {
        const errorGroup = document.querySelector(".groupes-error")
        errorGroup.textContent = "Ce groupe est complet"
        errorGroup.classList.add("Rejete")
        return;
    }

    const nouvelEleve = {
        id: newID,
        prenom : prenomValue,
        nom : nomValue,
        groupeId : Number(groupeValue),
        emailParent : emailValue,
        telephoneParent : telephoneValue,
        absences : 0,
        notes : []
    }
    eleves.push(nouvelEleve);
    messageAjout.classList.remove("error");
    messageAjout.classList.add("success");
    submitForm.reset();
    const messages = document.querySelectorAll(
    ".prenom-error, .nom-error, .email-error, .telephone-error, .code-error, .groupes-error"
);

messages.forEach(function(message) {
    message.textContent = "";
});

const inputs = submitForm.querySelectorAll("input, select");

inputs.forEach(function(input) {
    input.style.border = "";
});
    console.log(eleves);
    dialogajout.close();
    const succes = document.getElementById("message-error")
    succes.textContent = "Élève ajouté avec succès !"
    messageAjout.showModal();
});

const messageAjout = document.getElementById("dialog-error")
const okpop = document.getElementById("ok-error")
okpop.addEventListener("click", function(){
    messageAjout.close();
})

function calculerStatistiques() {
    const valeufilter = groupefiltre.value
    const elevesDuGroupe = eleves.filter(function(eleve) {
    return valeufilter === "" || Number(valeufilter) === eleve.groupeId;
});
const totalAbsences = elevesDuGroupe.reduce(function(total, eleve) {
    return total + eleve.absences;
}, 0);
const tabsences = document.getElementById("total-absences")
tabsences.textContent = totalAbsences

const elevesAlertes = elevesDuGroupe.filter(function(eleve) {
    return eleve.absences >= 3;
});
const elevesA = elevesAlertes.length;
const HelevesA = document.getElementById("total-alertes");
HelevesA.textContent = elevesA

const notesEleves = elevesDuGroupe.filter(function (eleve) {
    return eleve.notes.length > 0;
})

const sommeeleves = notesEleves.reduce(function(total, eleve) {

    const sommeNotes = eleve.notes.reduce(function(somme, note) {
        return somme + note;
    }, 0);

    const moyenneEleve = sommeNotes / eleve.notes.length;

    return total + moyenneEleve;

}, 0);

const moyenneGroupe = notesEleves.length > 0
    ? sommeeleves / notesEleves.length
    : 0;

document.getElementById("moyenne-groupe").textContent = moyenneGroupe.toFixed(2) + " / 20";
}
calculerStatistiques();
groupefiltre.addEventListener("change", calculerStatistiques);

afficherParentsAAppeler();
afficherElevesFiltres();








