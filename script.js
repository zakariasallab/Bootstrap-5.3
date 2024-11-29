const gamesList = [
	{
		title: "Tekken",
		year: 1994,
		imageUrl:
			"https://cdn.dashfight.com/bcf6a9046a9ea4c1070d4aedb2981103c978a704.png",
		id: 1,
	},
	{
		title: "Minecraft",
		year: 2009,
		imageUrl:
			"https://m.media-amazon.com/images/I/61smNbXSW1L._AC_UF1000,1000_QL80_.jpg",
		id: 2,
	},
	{
		title: "Elden Ring",
		year: 2022,
		imageUrl:
			"https://pic.clubic.com/v1/images/1934271/raw?fit=smartCrop&width=1200&height=675&hash=e7519a9577a2b7291fa26880bb22bed6740836be",
		id: 3,
	},
	{
		title: "Street Fighter V",
		year: 2015,
		imageUrl:
			"https://gaming-cdn.com/images/products/671/orig/street-fighter-v-pc-jeu-steam-cover.jpg?v=1662539255",
		id: 4,
	},
	{
		title: "Half Life 2",
		year: 2004,
		imageUrl:
			"https://gaming-cdn.com/images/products/2284/orig/half-life-2-pc-mac-game-steam-cover.jpg?v=1650555068",
		id: 5,
	},
	{
		title: "Skyrim",
		year: 2011,
		imageUrl:
			"https://gaming-cdn.com/images/products/146/orig/the-elder-scrolls-v-skyrim-pc-jeu-steam-europe-cover.jpg?v=1661270991",
		id: 6,
	},
];

// Fonction pour insérer des cartes dynamiques
const container = document.querySelector(".row");

gamesList.forEach((game) => {
	const card = `
        <article class="col">
            <div class="card shadow-sm">
                <img src="${game.imageUrl}" class="card-img-top" alt="${game.title}" />
                <div class="card-body">
                    <h5 class="card-title">${game.title}</h5>
                    <p class="card-text">
                        Released in ${game.year}.
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">View</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    `;
	container.innerHTML += card;
});
document.querySelectorAll(".btn-outline-secondary").forEach((button, index) => {
	button.addEventListener("click", () => {
		const modalTitle = document.querySelector("#exampleModalLabel");
		const modalBody = document.querySelector(".modal-body");

		// Met à jour le contenu du modal
		modalTitle.textContent = gamesList[index].title;
		modalBody.textContent = `Released in ${gamesList[index].year}.`;
	});
});
