const button = document.querySelector('button');
const header = document.querySelector('.header');
const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', loadPersons);

const personsURL = 'http://localhost:4000/persons';

function loadPersons() {
	fetch(personsURL)
		.then((res) => res.json())
		.then(renderPersons);
}

function renderPersons(people) {
	people.forEach((person) => {
		const h1 = document.createElement('h1');
		h1.innerText = person.name;
		header.appendChild(h1);
	});
}

form.addEventListener('submit', addANewname);

const name = document.getElementById('name');
const username = document.getElementById('username');
const email = document.getElementById('email');

name.addEventListener('change', (e) => (name.value = e.target.value));
username.addEventListener('change', (e) => (username.value = e.target.value));
email.addEventListener('change', (e) => (email.value = e.target.value));

console.log(name);

function addANewname(e) {
	e.preventDefault();

	const newPerson = {
		name: name.value,
		username: username.value,
		email: email.value,
	};

	fetch(personsURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newPerson),
	}).then(() => {
		name.value = '';
		username.value = '';
		email.value = '';
		document.location.reload();
	});
}
