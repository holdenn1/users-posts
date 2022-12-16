'use strict';

const users = document.querySelector('.users');
const filterUsersContainer = document.querySelector('.users-filter-contant');
const usersLoadingBtn = document.querySelector('#load-users');
const usersOnLoad = document.getElementsByClassName('users__link');
const filter = document.querySelector('.filter');
const searchBtn = document.querySelector('.search-btn');
const ageInput = document.querySelector('.filter__age-input');

async function loadUsers() {
	const response = await fetch(`http://localhost:3000/users?_start=0&_end=8`);
	const data = await response.json();
	await data.forEach((element) => {
		const {
			id,
			name,
			age,
			photo,
			address: { city },
			website,
		} = element;
		users.insertAdjacentHTML(
			'beforeend',
			`<a class="users__link"
				target="_blank"
				href="./pages/user-page.html?id=${id}">
				<div id=${id} class="users__item">
					<div class="users__header">
						<img
							class="users__img"
							src="${photo}"
							alt=""
						/>
					</div>
						<div class="users__main">
							<h4 class="users__name">${name}</h4>
							<p class="users__age">${age} y. o.</p>
							<p class="users__city">City: ${city}</p>
							<p class="users__website">${website}</p>
						</div>
						</div>
				</a>`,
		);
	});
}
loadUsers();

async function showMoreUsers() {
	const limit = 8;
	const response = await fetch(
		`http://localhost:3000/users?_start=${usersOnLoad.length}&_limit=${limit}`,
	);
	const data = await response.json();
	data.forEach((element) => {
		const {
			id,
			name,
			age,
			photo,
			address: { city },
			website,
		} = element;
		users.insertAdjacentHTML(
			'beforeend',
			`<a class="users__link"
				target="_blank"
				href="./pages/user-page.html?id=${id}">
				<div id=${id} class="users__item">
					<div class="users__header">
						<img
							class="users__img"
							src="${photo}"
							alt=""
						/>
					</div>
						<div class="users__main">
							<h4 class="users__name">${name}</h4>
							<p class="users__age">${age} y. o.</p>
							<p class="users__city">City: ${city}</p>
							<p class="users__website">${website}</p>
						</div>
						</div>
				</a>`,
		);
	});
	if (data.length < limit) {
		usersLoadingBtn.style.display = 'none';
	}
}
usersLoadingBtn.addEventListener('click', showMoreUsers);

function showFilter() {
	if (event.target.closest('.filter-btn')) {
		filter.classList.toggle('filter_active');
	}
	if (!event.target.closest('.filter') && !event.target.closest('.filter-btn')) {
		filter.classList.remove('filter_active');
	}
}

document.addEventListener('click', showFilter);

async function searchUsers() {
	users.remove();
	filterUsersContainer.innerHTML = '';
	const response = await fetch(`http://localhost:3000/users`);
	const data = await response.json();
	const inputValue = +ageInput.value;
	const findUsers = data.filter((data) => data.age == inputValue);
	if (inputValue == 0) {
		alert('Set the search age');
	}
	if (findUsers.length == 0) {
		alert('No users found');
	}
	findUsers.forEach((element) => {
		const {
			id,
			name,
			age,
			photo,
			address: { city },
			website,
		} = element;
		filterUsersContainer.insertAdjacentHTML(
			'beforeend',
			`<a class="users__link"
				target="_blank"
				href="./pages/user-page.html?id=${id}">
				<div id=${id} class="users__item">
					<div class="users__header">
						<img
							class="users__img"
							src="${photo}"
							alt=""
						/>
					</div>
						<div class="users__main">
							<h4 class="users__name">${name}</h4>
							<p class="users__age">${age} y. o.</p>
							<p class="users__city">City: ${city}</p>
							<p class="users__website">${website}</p>
						</div>
						</div>
				</a>`,
		);
	});
	if (findUsers.length < 8) {
		usersLoadingBtn.style.display = 'none';
	}
	clearInput();
}
searchBtn.addEventListener('click', () => {
	filter.classList.remove('filter_active');
	searchUsers();
});

function clearInput() {
	ageInput.value = '';
}
