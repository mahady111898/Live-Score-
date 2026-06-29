const API_KEY = "43cc89cb50844e74af0293fe6d7f2f7f";

async function loadLiveMatches() {
  const container = document.getElementById("matches");

  if (!container) return;

  container.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      "https://api.football-data.org/v4/matches",
      {
        headers: {
          "X-Auth-Token": API_KEY
        }
      }
    );

    const data = await response.json();

    container.innerHTML = "";

    if (!data.matches || data.matches.length === 0) {
      container.innerHTML = "<p>No matches found.</p>";
      return;
    }

    data.matches.forEach(match => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${match.homeTeam.name}</h3>
        <h2>${match.score.fullTime.home ?? 0} - ${match.score.fullTime.away ?? 0}</h2>
        <h3>${match.awayTeam.name}</h3>
        <p>${match.status}</p>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = "<p>Failed to load matches.</p>";
    console.error(err);
  }
}

loadLiveMatches();
setInterval(loadLiveMatches,30000);
