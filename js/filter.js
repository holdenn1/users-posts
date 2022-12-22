'use strict';

const filter = document.querySelector('.filter');
const ageInput = document.querySelector('.filter__age-input');

document.addEventListener('click', showFilter);

function showFilter() {
	if (event.target.closest('.filter-btn')) {
		filter.classList.toggle('filter_active');
	}
	if (!event.target.closest('.filter') && !event.target.closest('.filter-btn')) {
		filter.classList.remove('filter_active');
	}
}

async function searchUsers() {
	try {
		users.remove();
		err.innerHTML = '';
		filterUsersContainer.style.display = 'flex';
		filterUsersContainer.innerHTML = '';
		const response = await fetch(`http://localhost:3000/users`);
		const data = await response.json();
		const inputValue = +ageInput.value;
		const findUsers = data.filter((data) => data.age == inputValue);
		if (findUsers.length == 0) {
			error();
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
		clearInput();
	} catch (error) {
		console.error(error);
		err.style.display = 'flex';
		err.insertAdjacentHTML('afterbegin', `<h4 class="error-text">No users found</h4>`);
	}
}

function clearInput() {
	ageInput.value = '';
}