'use strict';
const users = document.querySelector('.users');
const url = 'http://localhost:3000/users';

fetch(url)
	.then((respose) => respose.json())
	.then(data => {
		data.forEach(element => {
			users.insertAdjacentHTML(
				'beforeend',
				`<a class="users__link"
				href="./user-page.html?id=${element.id}">
				<div id=${element.id} class="users__item">
							<div class="users__header">
								<img
									class="users__img"
									src="${element.photo}"
									alt=""
								/>
							</div>
							<div class="users__main">
								<h4 class="users__name">${element.name}</h4>
								<p class="users__city">City: ${element.address.city}</p>
								<p class="users__website">${element.website}</p>
							</div>
							</div>
							</a>`
			);
		});
	})

