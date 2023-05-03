fetch('http://localhost:3000/events').then((res) => res.json()).then(json => {
  for (let event of json) {
    let eventDiv = document.createElement('div');
    const date = new Date(event.date);
    console.log(date);
    eventDiv.className = 'event-card';
    eventDiv.innerHTML = `
      <div class="event-image">
        <img src="${event.image}" />
      </div>
      <div class="event-details">
        <p class="author">${event.author}</p>
        <h2>${event.title}</h2>
        <p class="description">${event.description}</p>
        <p class="date">${date.toString().split(' ').slice(1, 4).join(' ')}</p>
        <button> Join Event </button>
      </div>
    `;
    document.querySelector('.events').appendChild(eventDiv);
  }
});