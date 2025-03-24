document.getElementById('searchButton').addEventListener('click', async () => {
  const countryName = document.getElementById('countryInput').value.trim();
  const errorMessage = document.getElementById('errorMessage');
  const cardView = document.getElementById('cardView');
  const tableViewBody = document.querySelector('#tableView tbody');
  const results = document.getElementById('results');

  // Clear previous results and error messages
  errorMessage.textContent = '';
  cardView.innerHTML = '';
  tableViewBody.innerHTML = '';

  if (!countryName) {
    errorMessage.textContent = 'Please enter a country name.';
    return;
  }

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    if (!response.ok) {
      throw new Error('Country not found or API error.');
    }

    const data = await response.json();

    // Display data in card format
    data.forEach(country => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
          <h3>${country.name.common}</h3>
          <p><strong>Capital:</strong> ${country.capital}</p>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <img src="${country.flags.png}" alt="${country.name.common} flag" width="100">
        `;
      cardView.appendChild(card);
    });

    // Display data in table format
    data.forEach(country => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${country.name.common}</td>
          <td>${country.capital}</td>
          <td>${country.population.toLocaleString()}</td>
          <td><img src="${country.flags.png}" alt="${country.name.common} flag" width="50"></td>
        `;
      tableViewBody.appendChild(row);
    });
    results.style.display = 'block';
  } catch (error) {
    errorMessage.textContent = error.message;
  }

});