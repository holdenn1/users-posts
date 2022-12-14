'use strict';

const userPageHeader = document.querySelector('.peage__header');
const postsLoadingBtn = document.querySelector('#load-posts');
const postsOnLoad = document.getElementsByClassName('posts__link');
const posts = document.querySelector('.posts');

window.addEventListener('load', () => {
	const pageUrl = document.location.search;
	const searchParams = new URLSearchParams(pageUrl);
	const user = parseInt(searchParams.get('id'));
	
	async function loadUserTitle() {
		const response = await fetch(`http://localhost:3000/users/${user}`);
		const data = await response.json();
		const {
			id,
			name,
			photo,
			address: { city },
			website,
		} = data;
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
	loadUserTitle();

	async function loadUserPosts() {
		const response = await fetch(`http://localhost:3000/posts?userId=${user}&_start=0&_end=4`);
		const data = await response.json();
		data.forEach((element) => {
			const { id, photo, title, body } = element;
			posts.insertAdjacentHTML(
				'beforeend',
				`<a class="posts__link"
				target="_blank"
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
	loadUserPosts();

	async function showMorePosts() {
		const limit = 4;
		const response = await fetch(
			`http://localhost:3000/posts?userId=${user}&_start=${postsOnLoad.length}&_limit=${limit}`,
		);
		const data = await response.json();
		data.forEach((element) => {
			const { id, photo, title, body } = element;
			posts.insertAdjacentHTML(
				'beforeend',
				`<a class="posts__link"
				target="_blank"
				href="./comments.html?postId=${id}">
					<div class="posts__item">
						<img id='${id}' class="posts__photo" src="${photo}" alt="">
						<h3 class="posts__title">${title}</h3>
						<p class="posts__description">${body}</p>
					</div>
				</a>`,
			);
		});
		console.log(data.length);
		if (data.length < limit) {
			postsLoadingBtn.style.display = 'none';
		}
	}
	postsLoadingBtn.addEventListener('click', showMorePosts);
});
