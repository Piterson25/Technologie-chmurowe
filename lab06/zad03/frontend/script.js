const usersElement = document.getElementById("Users");

fetch("http://localhost:3000/api/users")
  .then(response => response.json())
  .then(data => {
    const usersHTML = data.map(user => `
      <div>
        <h3>${user.name}</h3>
        <p>Age: ${user.age}</p>
      </div>
    `).join("");
    usersElement.innerHTML = usersHTML;
  })
  .catch(error => {
    console.error("Failed to fetch users:", error);
  });