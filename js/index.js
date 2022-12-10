'use strict';
const users = document.querySelector('.users');
const url = 'http://localhost:3000/users';

async function loadUsers() {
	const response = await fetch(url);
	const data = await response.json();
	data.forEach((element) => {
		const {id, name, photo, address:{city}, website} = element
		users.insertAdjacentHTML(
			'beforeend',
			`<a class="users__link"
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
