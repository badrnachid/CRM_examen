const API = location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api/clients"
    : "/api/clients";

async function afficher() {
    const res = await fetch(API);
    const clients = await res.json();
    const liste = document.getElementById("liste");
    liste.innerHTML = "";
    clients.forEach((c) => {
        liste.innerHTML += `<li>${c.nom} - ${c.email}</li>`;
    });
}

document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nom: document.getElementById("nom").value,
            email: document.getElementById("email").value,
        }),
    });
    e.target.reset();
    afficher();
});

afficher();