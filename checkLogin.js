let loggedIn = false;

function checkLogIn() {
  const token = localStorage.getItem("token");
  const url = "http://localhost:3000/api/users/check"; // URL de vérification de l'utilisateur

  // Vérification si le token existe
  if (!token) {
    console.log("Pas de token trouvé.");
    return;
  }

  fetch(url, {
    method: "POST",
    headers: {
      "x-api-key": "secret_phrase_here", // Remplacez par votre clé API
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ msg: "auth" }),
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error("Identifiants incorrects");
    }
    return res.json().then((data) => {
      console.log(data);
      loggedIn = true; // Utilisateur connecté
      updateUIForLoggedInUser(data);
    });
  })
  .catch((error) => {
    console.log(error);
  });
}

function updateUIForLoggedInUser(data) {
  if (window.location.pathname !== "/") {
    window.location = "/"; // Redirige vers la page d'accueil si ce n'est pas déjà la page d'accueil
  }

  const loggedInBtn = document.querySelector("header"); // Modifier le contenu de l'en-tête

  const userImg = localStorage.getItem("img");
  loggedInBtn.innerHTML = `
    <a href="/" class="d-flex align-items-center text-white text-decoration-none text-bg-secondary p-3">
      <span class="fs-4 text-center">Games</span>
    </a>
    <button class="d-flex align-items-center text-white text-decoration-none btn p-3 log-out">
      <span class="fs-4 text-center">Log Out</span>
    </button>

    <div class="dropdown position-absolute">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="${userImg}" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>${data.username}</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
        <li><a class="dropdown-item" href="#">New car...</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><button class="dropdown-item log-out">Sign out</button></li>
      </ul>
    </div>
  `;

  const logOutBtns = document.querySelectorAll(".log-out");
  logOutBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.removeItem("_id");
      localStorage.removeItem("token");
      localStorage.removeItem("img");
      window.location.pathname = "./index.html"; // Redirection après déconnexion
    });
  });
}

// Appeler la fonction checkLogIn à chaque chargement de page
checkLogIn();
