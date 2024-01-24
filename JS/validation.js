const nom = document.querySelector("#nomInput");
const prenom = document.querySelector("#prenomInput");
const email = document.querySelector("#emailInput");
const sujet = document.querySelector("#sujetInput");
const tel = document.querySelector("#telInput");
const message = document.querySelector("#messageTextArea");

/*---------------- Variables de Validation ---------------------------*/
let nomValid = false;
let prenomValid = false;
let emailValid = false;
let sujetValid = false;
let telValid = false;
let messageValid = false;

const userRegex = /^[a-zA-Z-]{3,23}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PhoneNumberRegex = /^\+(?:\d{1,3})?\d{10}$/;
const SujetRegex = /^[^<>{}$]{3,200}$/;
const messageRegex = /^[^<>{}$]{24,}$/;

function addClass(element, regex, value) {
  if (regex.test(value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

nom.addEventListener("input", (e) => {
  addClass(nom, userRegex, e.target.value);
  if (nom.classList.contains("is-valid")) {
    nomValid = true;
  } else {
    nomValid = false;
  }
})

prenom.addEventListener("input", (e) => {
  addClass(prenom, userRegex, e.target.value);
  if (prenom.classList.contains("is-valid")) {
    prenomValid = true;
  } else {
    prenomValid = false;
  }
})

email.addEventListener("input", (e) => {
  addClass(email, emailRegex, e.target.value);
  if (email.classList.contains("is-valid")) {
    emailValid = true;
  } else {
    emailValid = false;
  }
})

sujet.addEventListener("input", (e) => {
  addClass(sujet, userRegex, e.target.value);
  if (sujet.classList.contains("is-valid")) {
    sujetValid = true;
  } else {
    sujetValid = false;
  }
})

tel.addEventListener("input", (e) => {
  let telnumber = e.target.value;
  telnumber = telnumber.replace(/\s/g, '');
  telnumber = telnumber.replace(/^0/, '+33');

  addClass(tel, PhoneNumberRegex, telnumber);

  if (tel.classList.contains("is-valid")) {
    telValid = true;
  } else {
    telValid = false;
  }
})

message.addEventListener("input", (e) => {
  addClass(message, userRegex, e.target.value);
  if (message.classList.contains("is-valid")) {
    messageValid = true;
  } else {
    messageValid = false;
  }
})


const submit = document.getElementsByClassName("form-contact")[0];
// console.log(form);

//On initie la fonction qui permettra d'écouter l'événement submit, lorsque l'utilisateur soumettra le formulaire
submit.addEventListener("submit", (e) => {
  //on bloque la soumission automatique du formulaire
  e.preventDefault();
  // Nous vérifions que chaque champs du formulaire soit correct, si tout est correct tu envoyer le mail 
  if (nomValid && prenomValid && emailValid && sujetValid && telValid && messageValid) {
    //Nous devons récupèrer les infos du formulaire
    let name = nom.value;
    let surname = prenom.value;
    let mail = email.value;
    let subject = sujet.value;
    let phone = tel.value;
    let description = message.value;

    // On crée l'objet où on souhaite récupérer nos variables precédement cité

    let infoContact = {
      name: name,
      surname: surname,
      mail: mail,
      subject: subject,
      phone: phone,
      description: description,
    };

    //Si tout les champs sont correct, le formulaire est soumis et un mail est envoyé grace à la fonction,

      Email.send({
        SecureToken: "a0ab04df-34b0-4c8f-aaaf-8711b9a7a3c7",
        To: 'pierrebui007@gmail.com',
        From: "pierrebui007@gmail.com",
        Subject: infoContact.subject,
        Body: infoContact.surname + ", " + infoContact.name + ", " + infoContact.mail + ", " + infoContact.phone + ", " + infoContact.description + "."
      }).then(
        message => alert(message)
      );
    SendMail(infoContact);
  } else {
    //Sinon le programme lance une alert pour demander à l'utilisateur de rentrer correctement les champs du formulaire 
    alert("Tous les champs ne sont pas rentrés ou ne sont pas valide, mercie de rentrer correctement les champs du formulaire");
  };
})

