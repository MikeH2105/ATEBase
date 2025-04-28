document.addEventListener("DOMContentLoaded", function () {
  // Вивід автомобілів
  cars.forEach(car => {
    const carElement = document.createElement("div");
    carElement.innerHTML = `
    🚗 <strong>Номер:</strong> ${car.number}<br>
    Страхування до: ${car.insuranceDate}<br>
    Техогляд до: ${car.techInspectionDate}<br>
    Тахограф до: ${car.tachographCertificateDate}<br><br>
  `;
  
    document.getElementById("cars-list").appendChild(carElement);
  });
  

  // Вивід напівпричепів
  trailers.forEach(trailer => {
    const trailerElement = document.createElement("div");
    trailerElement.innerHTML = `
    🚛 <strong>Номер:</strong> ${trailer.number}<br>
    Страхування до: ${trailer.insuranceDate}<br>
    Техогляд до: ${trailer.techInspectionDate}<br><br>
  `;
    document.getElementById("trailers-list").appendChild(trailerElement);
  });
  
  function filterVehicles() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
  
    document.querySelectorAll("#cars-list div").forEach(div => {
      const text = div.textContent.toLowerCase();
      div.style.display = text.includes(searchValue) ? "block" : "none";
    });
  
    document.querySelectorAll("#trailers-list div").forEach(div => {
      const text = div.textContent.toLowerCase();
      div.style.display = text.includes(searchValue) ? "block" : "none";
    });
  }
  
  document.getElementById("searchInput").addEventListener("input", filterVehicles);

  // Функція для перевірки та підсвічування дат
function checkDateExpiration(dateStr) {
  const currentDate = new Date();
  const expirationDate = new Date(dateStr);
  const daysLeft = (expirationDate - currentDate) / (1000 * 60 * 60 * 24); // кількість днів до кінця

  // Якщо менше ніж 7 днів до закінчення
  if (daysLeft <= 7 && daysLeft > 0) {
    return 'yellow'; // Жовтий колір
  }
  // Якщо строк минув
  if (daysLeft < 0) {
    return 'red'; // Червоний колір
  }
  return ''; // Без підсвічування, якщо термін нормальний
}

// Функція для відображення автомобілів
function renderCars() {
  const carsList = document.getElementById("cars-list");
  carsList.innerHTML = ''; // Очищаємо список

  cars.forEach(car => {
    const carElement = document.createElement("div");
    const insuranceClass = checkDateExpiration(car.insuranceDate);
    const techInspectionClass = checkDateExpiration(car.techInspectionDate);
    const tachographClass = checkDateExpiration(car.tachographCertificateDate);

    carElement.innerHTML = `
      🚗 <strong>Номер:</strong> ${car.number}<br>
      <span class="${insuranceClass}">Страхування до: ${car.insuranceDate}</span><br>
      <span class="${techInspectionClass}">Техогляд до: ${car.techInspectionDate}</span><br>
      <span class="${tachographClass}">Тахограф до: ${car.tachographCertificateDate}</span><br><br>
    `;

    carsList.appendChild(carElement);
  });
}

// Функція для відображення напівпричепів
function renderTrailers() {
  const trailersList = document.getElementById("trailers-list");
  trailersList.innerHTML = ''; // Очищаємо список

  trailers.forEach(trailer => {
    const trailerElement = document.createElement("div");
    const insuranceClass = checkDateExpiration(trailer.insuranceDate);
    const techInspectionClass = checkDateExpiration(trailer.techInspectionDate);

    trailerElement.innerHTML = `
      🚛 <strong>Номер:</strong> ${trailer.number}<br>
      <span class="${insuranceClass}">Страхування до: ${trailer.insuranceDate}</span><br>
      <span class="${techInspectionClass}">Техогляд до: ${trailer.techInspectionDate}</span><br><br>
    `;
    trailersList.appendChild(trailerElement);
  });
}

// Викликаємо функції для початкового відображення
renderCars();
renderTrailers();

  




});
