class Artwork {
    constructor(title, image, description, author, year) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.author = author;
        this.year = year;
    }
}

const artworks = [
    new Artwork("Do Women Have to Be Naked to Get into the Met. Museum?", "Images/Guerrilla.JPG", "A feminist poster challenging gender representation in art museums.", "Guerilla Girls", 1989),
    new Artwork("I Am a Man", "Images/I AM A MAN.JPG", "A photograph capturing the 1968 Memphis sanitation workers' strike for civil rights.", "Ernest Withers", 1968),
    new Artwork("Tank Man", "Images/Tank.JPG", "The iconic image of an unknown man standing in front of a column of tanks in Tiananmen Square.", "Jeff Widener", 1989),
    new Artwork("The Problem We All Live With", "Images/Problem.JPG", "A painting depicting Ruby Bridges' walk to school escorted by U.S. Marshals.", "Norman Rockwell", 1964),
    new Artwork("Lipstick Protest", "Images/Lipstick.JPG", "A striking image of a woman applying lipstick using a riot police officer's shield as a mirror, symbolizing defiance and resistance.", "Unknown", 2012)
];

function displayRandomArtwork() {
    const randomIndex = Math.floor(Math.random() * artworks.length);
    const artwork = artworks[randomIndex];
    
    document.getElementById("artTitle").innerText = artwork.title;
    document.getElementById("artImage").src = artwork.image;
    document.getElementById("artImage").alt = artwork.title;
    document.getElementById("artDescription").innerText = artwork.description;
    document.getElementById("artAuthor").innerText = `By: ${artwork.author} (${artwork.year})`;
}

// HTML setup
const app = `
    <div style="text-align:center;">
        <h2 id="artTitle">Click the button to see an artwork</h2>
        <img id="artImage" src="" alt="Artwork" style="max-width:300px; display:block; margin:auto;">
        <p id="artDescription"></p>
        <p id="artAuthor"></p>
        <button onclick="displayRandomArtwork()">Show Random Artwork</button>
    </div>
`;

document.body.innerHTML = app;
