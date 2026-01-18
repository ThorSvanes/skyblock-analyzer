function myFunction() {
    fetch("https://v2.jokeapi.dev/joke/Any")
    .then(response => response.json())
          .then(data => {
            // The API returns a "text" field with the cat fact
            console.log(data.type);
            if (data.type == "single") {
                console.log("data.joke: " + data.joke);
            }
            else if (data.type == "twopart") {
                console.log("data.setup: " + data.setup);
                console.log("data.delivery: " + data.delivery);
            }

          })
          .catch(error => {
            alert("Oops! Couldnt get a cat fact right now.");
            console.error(error);
          });
}

async function getHypixelPlayerData(username) {
  const response = await fetch(`/api/player?username=${username}`)
  const data = await response.json();
  console.log(data);
}
