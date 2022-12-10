'use strict';

window.addEventListener('load', () => {
	const comments = document.location.search;
	const searchParams = new URLSearchParams(comments);
	const post = parseInt(searchParams.get('postId'));
	const postsUrl = `http://localhost:3000/posts?id=${post}`;
	const commentsUrl = `http://localhost:3000/comments?postId=${post}`;
	const commentHeader = document.querySelector('.comments-header');
	const commentMain = document.querySelector('.comments-main');

	async function loadPost(url) {
		const response = await fetch(url);
		const data = await response.json();
		data.forEach((data) => {
			commentHeader.insertAdjacentHTML(
				'beforeend',
				`<div class="post">
			<div class="post__item">
				<img
					class="post__photo"
					src="${data.photo}"
					alt=""/>
				<div>
				<h3 class="post__title">${data.title}</h3>
				<p class="post__description">${data.body}</p>
				</div>
			</div>
		</div>`,
			);
		});
	}
	loadPost(postsUrl);

	async function loadComments(url) {
		const response = await fetch(url);
		const data = await response.json();
		data.forEach((element) => {
			commentMain.insertAdjacentHTML(
				'beforeend',
				`<div postId="${element.postId}" class="comment">
					<h3 class="user-email">${element.email}</h3>
					<p class="comment-text">${element.body}</p>
				</div>`,
			);
		});
	}
	loadComments(commentsUrl);
});
