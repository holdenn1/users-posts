'use strict';

const userPageHeader = document.querySelector('.peage__header');
window.addEventListener('load', function () {
	const pageUrl = document.location.search;
	let searchParams = new URLSearchParams(pageUrl);
	let user = parseInt(searchParams.get('item'));

	let usersUrl = `https://jsonplaceholder.typicode.com/users/${user}`;
	fetch(usersUrl)
		.then((response) => response.json())
		.then((data) => {
			userPageHeader.insertAdjacentHTML(
				'beforeend',
				`
				<div id=${data['id']} class="user">
								<img src="https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png" alt="" class="avatar">
								<div class="user__description">
									<h4 class="user__name">${data['name']}</h4>
									<p class="user__city">City: ${data['address']['city']}</p>
									<a class="user__website" href="#">${data['website']}</a>
								</div>
							</div>
						</div>
						<div class="pege__main">
				`,
			);
		});
});
