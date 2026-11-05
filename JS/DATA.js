
const groupes = [
  { id: 1, nom: "Groupe A", cours: "Mathematiques" },
  { id: 2, nom: "Groupe B", cours: "Physique" },
  { id: 3, nom: "Groupe C", cours: "Francais" }
];

const eleves = [
  { id: 1, prenom: "Ahmed", nom: "Alami", groupeId: 1, emailParent: "parent.ahmed@example.com", telephoneParent: "0612345678", absences: 3, notes: [12, 15, 14] },
  { id: 2, prenom: "Sara", nom: "Bennani", groupeId: 1, emailParent: "parent.sara@example.com", telephoneParent: "0623456789", absences: 2, notes: [16, 17, 15] },
  { id: 3, prenom: "Yassine", nom: "Idrissi", groupeId: 1, emailParent: "parent.yassine@example.com", telephoneParent: "0634567890", absences: 2, notes: [10, 12, 11] },
  { id: 4, prenom: "Salma", nom: "Fassi", groupeId: 1, emailParent: "parent.salma@example.com", telephoneParent: "0645678901", absences: 1, notes: [18, 16, 17] },
  { id: 5, prenom: "Omar", nom: "Tazi", groupeId: 1, emailParent: "parent.omar@example.com", telephoneParent: "0656789012", absences: 0, notes: [] },

  { id: 6, prenom: "Imane", nom: "Alaoui", groupeId: 2, emailParent: "parent.imane@example.com", telephoneParent: "0667890123", absences: 1, notes: [14, 13, 15] },
  { id: 7, prenom: "Hamza", nom: "Karimi", groupeId: 2, emailParent: "parent.hamza@example.com", telephoneParent: "0678901234", absences: 4, notes: [9, 11, 10] },
  { id: 8, prenom: "Hajar", nom: "Amrani", groupeId: 2, emailParent: "parent.hajar@example.com", telephoneParent: "0689012345", absences: 0, notes: [17, 18, 16] },
  { id: 9, prenom: "Mehdi", nom: "Rami", groupeId: 2, emailParent: "parent.mehdi@example.com", telephoneParent: "0690123456", absences: 2, notes: [12, 14, 13] },
  { id: 10, prenom: "Nour", nom: "Saidi", groupeId: 2, emailParent: "parent.nour@example.com", telephoneParent: "0712345678", absences: 0, notes: [] },

  { id: 11, prenom: "Ayoub", nom: "Mansouri", groupeId: 3, emailParent: "parent.ayoub@example.com", telephoneParent: "0723456789", absences: 1, notes: [11, 13, 12] },
  { id: 12, prenom: "Lina", nom: "Zahraoui", groupeId: 3, emailParent: "parent.lina@example.com", telephoneParent: "0734567890", absences: 0, notes: [19, 18, 17] },
  { id: 13, prenom: "Anas", nom: "Berrada", groupeId: 3, emailParent: "parent.anas@example.com", telephoneParent: "0745678901", absences: 2, notes: [8, 10, 9] },
  { id: 14, prenom: "Meryem", nom: "Chraibi", groupeId: 3, emailParent: "parent.meryem@example.com", telephoneParent: "0756789012", absences: 2, notes: [15, 14, 16] },
  { id: 15, prenom: "Ilyas", nom: "Naciri", groupeId: 3, emailParent: "parent.ilyas@example.com", telephoneParent: "0767890123", absences: 0, notes: [] }
];
