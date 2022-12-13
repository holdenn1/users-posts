'use strict';

const users = document.querySelector('.users');
const usersLoadingBtn = document.querySelector('#load-users');
const usersOnLoad = document.getElementsByClassName('users__link');

async function loadUsers() {
	const response = await fetch(`http://localhost:3000/users?_start=0&_end=8`);
	const data = await response.json();
	await data.forEach((element) => {
		const {
			id,
			name,
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
							<p class="users__city">City: ${city}</p>
							<p class="users__website">${website}</p>
						</div>
						</div>
				</a>`,
		);
	});
}
loadUsers();

async function addUsers() {
	const limit = 8;
	const response = await fetch(
		`http://localhost:3000/users?_start=${usersOnLoad.length}&_limit=${limit}`,
	);
	const data = await response.json();
	data.forEach((element) => {
		const {
			id,
			name,
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
usersLoadingBtn.addEventListener('click', addUsers);
