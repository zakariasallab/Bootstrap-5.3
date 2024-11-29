const gamesList = [
    {
        title: "Tekken",
        year: 1994,
        imageUrl: "https://cdn.dashfight.com/bcf6a9046a9ea4c1070d4aedb2981103c978a704.png",
        id: 1,
    },
    {
        title: "Minecraft",
        year: 2009,
        imageUrl: "https://m.media-amazon.com/images/I/61smNbXSW1L._AC_UF1000,1000_QL80_.jpg",
        id: 2,
    },
    {
        title: "Elden Ring",
        year: 2022,
        imageUrl: "https://pic.clubic.com/v1/images/1934271/raw?fit=smartCrop&width=1200&height=675&hash=e7519a9577a2b7291fa26880bb22bed6740836be",
        id: 3,
    },
    {
        title: "Street Fighter V",
        year: 2015,
        imageUrl: "https://gaming-cdn.com/images/products/671/orig/street-fighter-v-pc-jeu-steam-cover.jpg?v=1662539255",
        id: 4,
    },
    {
        title: "Half Life 2",
        year: 2004,
        imageUrl: "https://gaming-cdn.com/images/products/2284/orig/half-life-2-pc-mac-game-steam-cover.jpg?v=1650555068",
        id: 5,
    },
    {
        title: "Skyrim",
        year: 2011,
        imageUrl: "https://gaming-cdn.com/images/products/146/orig/the-elder-scrolls-v-skyrim-pc-jeu-steam-europe-cover.jpg?v=1661270991",
        id: 6,
    },
];

// Fonction pour insérer des cartes dynamiques
function writeDom() {
    const gameContainer = document.querySelector('.row');
    gamesList.forEach((game) => {
        const card = `
            <article class="col">
                <div class="card shadow-sm">
                    <img src="${game.imageUrl}" class="card-img-top" alt="${game.title}" />
                    <div class="card-body">
                        <h5 class="card-title">${game.title}</h5>
                        <p class="card-text">Released in ${game.year}.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button 
                                    type="button" 
                                    class="btn btn-sm btn-outline-secondary view" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#exampleModal" 
                                    data-edit-id="${game.id}">
                                    View
                                </button>
                                <button 
                                    type="button" 
                                    class="btn btn-sm btn-outline-secondary edit" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#exampleModal" 
                                    data-edit-id="${game.id}">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        `;
        gameContainer.innerHTML += card;
    });

    // Ajouter les événements aux boutons "view" et "edit"
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const gameId = e.target.getAttribute("data-edit-id");
            editModal(gameId);
        });
    });

    const viewButtons = document.querySelectorAll(".view");
    viewButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const gameId = e.target.getAttribute("data-edit-id");
            viewModal(gameId);
        });
    });
}

// Fonction qui met à jour le modal pour "Edit"
function editModal(gameId) {
    const result = gamesList.find((game) => game.id === parseInt(gameId));

    if (result) {
        // Créer un formulaire pour modifier le jeu
        const modalBody = `
            <h4>Edit ${result.title}</h4>
            <form id="editForm">
                <div class="mb-3">
                    <label for="gameTitle" class="form-label">Title</label>
                    <input type="text" class="form-control" id="gameTitle" value="${result.title}" required>
                </div>
                <div class="mb-3">
                    <label for="gameYear" class="form-label">Year</label>
                    <input type="number" class="form-control" id="gameYear" value="${result.year}" required>
                </div>
                <div class="mb-3">
                    <label for="gameImageUrl" class="form-label">Image URL</label>
                    <input type="url" class="form-control" id="gameImageUrl" value="${result.imageUrl}" required>
                </div>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </form>
        `;
        modifyModal("Edit Mode", modalBody);

        // Ajouter un gestionnaire d'événements pour le formulaire
        document.querySelector("#editForm").addEventListener("submit", (e) => {
            e.preventDefault();
            // Récupérer les nouvelles valeurs du formulaire
            const newTitle = document.querySelector("#gameTitle").value;
            const newYear = document.querySelector("#gameYear").value;
            const newImageUrl = document.querySelector("#gameImageUrl").value;

            // Mettre à jour le jeu dans la liste
            result.title = newTitle;
            result.year = newYear;
            result.imageUrl = newImageUrl;

            // Recharger les cartes après la mise à jour
            writeDom();
        });
    }
}

// Fonction qui met à jour le modal pour "View"
function viewModal(gameId) {
    const result = gamesList.find((game) => game.id === parseInt(gameId));

    if (result) {
        // Mettre à jour le modal pour afficher l'image du jeu
        const modalBody = `<img src="${result.imageUrl}" alt="${result.title}" class="img-fluid" />`;
        modifyModal(result.title, modalBody);
    }
}

// Fonction pour modifier le contenu du modal
function modifyModal(modalTitle, modalBody) {
    document.querySelector(".modal-title").textContent = modalTitle;
    document.querySelector(".modal-body").innerHTML = modalBody;
}

// Appel de la fonction d'écriture au chargement du DOM
document.addEventListener('DOMContentLoaded', writeDom);
