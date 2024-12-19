const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = form.elements["email"].value;
  const userName = form.elements["userName"].value;

  try {
    // Validation des champs
    validateEmail(email);
    validateName(userName);

    // Si tout est valide, collecter et afficher les données
    const formData = {
      email,
      userName,
    };
    console.log(formData);

    // Appel de la fonction de connexion
    logIn(formData);

  } catch (error) {
    // Si une erreur se produit, afficher l'erreur
    showError(error.message);
  }
});

// Validation du nom d'utilisateur
function validateName(input) {
  if (!input || input.trim() === "") {
    throw new Error("L'user name est vide !");
  }

  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (!alphanumericRegex.test(input)) {
    throw new Error(
      "L'entrée doit contenir uniquement des caractères alphanumériques."
    );
  }
}

// Validation de l'email
function validateEmail(input) {
  if (!input || input.trim() === "") {
    throw new Error("L'email name est vide");
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(input)) {
    throw new Error("L'email n'est pas valide.");
  }
}

// Fonction pour afficher l'erreur
function showError(error) {
  const alertElement = document.querySelector(".alert");
  alertElement.innerText = error;
  alertElement.classList.remove("d-none");
  setTimeout(() => {
    alertElement.classList.add("d-none");
  }, 2100);
}

// Fonction de connexion
async function logIn(formData) {
  const url = "http://localhost:3000/api/users/login";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": "secret_phrase_here",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      // Si la réponse n'est pas OK, on lance une erreur avec le message approprié
      throw new Error("Identifiants incorrects");
    }

    const data = await res.json();
    console.log(data);

    // Enregistrez les données de connexion dans le localStorage
    localStorage.setItem("_id", data._id);
    localStorage.setItem("token", data.token);
    localStorage.setItem("img", data.userImg);

    // Rediriger vers la page d'accueil ou une autre page après connexion
    window.location.pathname = "/"; // Vous pouvez ajuster la destination
  } catch (error) {
    // Afficher un message d'erreur si une exception est levée
    showError(error.message);
  }
}
