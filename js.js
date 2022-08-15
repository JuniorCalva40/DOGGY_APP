
//APIS
// Api Dogs Random
const urlApiDogsRandom ="https://api.thedogapi.com/v1/images/search?limit=4&api_key=1f9afec7-3e54-43dc-b6d3-fbee9ba6ca60"
// Api Dogs Favorite
const urlApiDogsFavorite ="https://api.thedogapi.com/v1/favourites?api_key=1f9afec7-3e54-43dc-b6d3-fbee9ba6ca60"
 // Api Add Dogs Favourite
const urlApiDogsAddFavorite = "https://api.thedogapi.com/v1/favourites?api_key=1f9afec7-3e54-43dc-b6d3-fbee9ba6ca60"
// Api Delete Favorite Dogs
const urlApiDogsDeleteFavorite = "https://api.thedogapi.com/v1/favourites/";

//Funtion Get Dogs Ramdom.
const getDogsRandom = async () => {
    const response = await fetch(urlApiDogsRandom);
    const data = await response.json();
    const div = document.querySelector("#Container_randomDogs");
    const array = [];
    data.forEach((dog) => {
        div.innerHTML = "";
        // Create mi image
        const img = document.createElement("img");
        img.src = dog.url;
        img.alt = "DOG ramdom";
        img.className = "img-random";
        img.width = 200;
        img.height = 200;
        array.push(img);

        // Create buttom
        const button = document.createElement("button");
        button.innerHTML = "Añadir a Favoritos";
        button.onclick = () => {
            addDogsToFavorite(dog.id);
        };
        array.push(button);
    });
    div.append(...array);
};
getDogsRandom();

//Funtion Dogs Favorite
const getDogsFavorite = async () => {
    const response = await fetch(urlApiDogsFavorite);
    const data = await response.json();
    const div = document.querySelector("#DogsFavorite");
    const array  = [];
    data.map(doggyFav => {
        div.innerHTML = '';
        // Create Image
        const img = document.createElement("img");
        img.src = doggyFav.image.url;
        img.alt = "Tu perrito favorito";
        img.className = "img-favorite";
        img.width = 200;
        img.height = 200;
        array.push(img);

        // Create Image
        const button = document.createElement("button");
        button.innerHTML = "❌";
        button.onclick = () => {
            removeDogsFromFavorite(doggyFav.id);
        }
        array.push(button);
    });
    div.innerHTML = "";
    div.append(...array);
}

getDogsFavorite();

// Function Add Favorite Dogs
const addDogsToFavorite = async (id) => {
    const response = await fetch(urlApiDogsAddFavorite, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            image_id: id,
        }),
    });
    getDogsFavorite();
}

// Funtion Delete Favorite Dogs
const removeDogsFromFavorite = async (id) => {
    const response = await fetch(`${urlApiDogsDeleteFavorite}${id}?api_key=1f9afec7-3e54-43dc-b6d3-fbee9ba6ca60`, {
        method: "DELETE",
    });
    getDogsFavorite();
};



