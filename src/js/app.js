/** @format */

import "../styles/main.scss";
import img_1 from "../img/img1.jpg";
// Create a class property without a constructor
class Game {
	name = "PUBG";
}
const myGame = new Game();
// Create paragraph node
const p = document.createElement("p");
p.textContent = `I like ${myGame.name}.`;

// Create heading node
const heading = document.createElement("h1");
heading.textContent = "Interesting things";

const img = document.createElement("img");
img.src = img_1;

// Append heading node to the DOM
const app = document.querySelector("#root");
app.append(heading);
app.append(p);
app.append(img);
