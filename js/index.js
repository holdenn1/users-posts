'use strict';



const users = document.querySelector('.users');
const filterUsersContainer = document.querySelector('.users-filter-contant');
const usersOnLoad = document.getElementsByClassName('users__link');
const searchBtn = document.querySelector('.search-btn');
const spinner = document.querySelector('.lds-default');
const contantSpinner = document.querySelector('.load-contant');
const err = document.querySelector('.error');

let observer;

window.onload = () => {
	loadUsers();
	searchBtn.addEventListener('click', () => {
		filter.classList.remove('filter_active');
		searchUsers();
	});
};

async function addUsers(start) {
	const limit = 8;
	const response = await fetch(`http://localhost:3000/users?_start=${start}&_limit=${limit}`);
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
	return { hasMore: data.length === limit };
}

async function loadUsers() {
	try {
		spinner.style.display = 'flex';
		const { hasMore } = await addUsers(0);
		if (hasMore) {
			observer = observContant();
		}
	} catch (error) {
		console.error(error);
		err.style.display = 'flex';
		err.insertAdjacentHTML('afterbegin', `<h4 class="error-text">Error: Users not found</h4>`);
	} finally {
		spinner.style.display = 'none';
	}
}

async function loadMoreUsers() {
	try {
		contantSpinner.style.height = 'auto';
		const { hasMore } = await addUsers(usersOnLoad.length);
		if (!hasMore && observer) {
			observer.disconnect();
		}
	} catch (error) {
		console.error(error);
	} finally {
		contantSpinner.style.height = '0';
	}
}

function observContant() {
	const observer = new IntersectionObserver(([{ isIntersecting }]) => {
		if (isIntersecting) {
			loadMoreUsers();
		}
	});
	observer.observe(contantSpinner);
	return observer;
}
