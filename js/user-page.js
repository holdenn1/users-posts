'use strict';

window.addEventListener('load', () => {
	const pageUrl = document.location.search;
	const searchParams = new URLSearchParams(pageUrl);
	const user = parseInt(searchParams.get('id'));
	const usersUrl = `http://localhost:3000/users/${user}`;
	const postsUrl = `http://localhost:3000/posts?_start=0&_end=6/userId=${user}`;
	const userPageHeader = document.querySelector('.peage__header');
	const posts = document.querySelector('.posts');

	async function loadUserTitle(url) {
		const response = await fetch(url);
		const data = await response.json();
		const {id, name, photo, address:{city}, website} = data
		userPageHeader.insertAdjacentHTML(
			'beforeend',
			`<div id=${id} class="user">
							<img src="${photo}" alt="" class="avatar">
							<div class="user__description">
								<h4 class="user__name">${name}</h4>
								<p class="user__city">City: ${city}</p>
								<a class="user__website" href="#">${website}</a>
							</div>
						</div>
					</div>
					<div class="pege__main">`,
		);
	}
	loadUserTitle(usersUrl);

	async function loadUserPosts (url){
		const response = await fetch(url)
		const data = await response.json()
		data.forEach((element) => {
			const {id, photo, title, body} = element
			posts.insertAdjacentHTML(
				'beforeend',
				`<a 
				class="posts__link"
				href="./comments.html?postId=${id}">
					<div class="posts__item">
						<img id='${id}' class="posts__photo" src="${photo}" alt="">
						<h3 class="posts__title">${title}</h3>
						<p class="posts__description">${body}</p>
					</div>
				</a>`,
			);
		});
	}
	loadUserPosts(postsUrl)
});
