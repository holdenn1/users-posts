'use strict';

const commentHeader = document.querySelector('.comments-header');
const commentMain = document.querySelector('.comments-main');
const commentOnLoad = document.getElementsByClassName('comment');
const commentsLoadingBtn = document.querySelector('#load-comments');

window.addEventListener('load', () => {
	const comments = document.location.search;
	const searchParams = new URLSearchParams(comments);
	const post = parseInt(searchParams.get('postId'));
	
	async function loadPost() {
		const response = await fetch( `http://localhost:3000/posts?id=${post}`);
		const data = await response.json();
		data.forEach((data) => {
			const { photo, title, body } = data;
			commentHeader.insertAdjacentHTML(
				'beforeend',
				`<div class="post">
			<div class="post__item">
				<img
					class="post__photo"
					src="${photo}"
					alt=""/>
				<div>
				<h3 class="post__title">${title}</h3>
				<p class="post__description">${body}</p>
				</div>
			</div>
		</div>`,
			);
		});
	}
	loadPost();

	async function loadComments() {
		const response = await fetch(`http://localhost:3000/comments?postId=${post}&_start=0&_end=4`);
		const data = await response.json();
		data.forEach((element) => {
			const {email, body } = element;
			commentMain.insertAdjacentHTML(
				'beforeend',
				`<div class="comment">
					<h3 class="user-email">${email}</h3>
					<p class="comment-text">${body}</p>
					
				</div>`,
			);
		});
	}
	loadComments();

	async function showMoreComments() {
		const limit = 4;
		const response = await fetch(
			`http://localhost:3000/comments?postId=${post}&_start=${commentOnLoad.length}&_limit=${limit}`,
		);
		const data = await response.json();
		data.forEach((element) => {
			const {email, body } = element;
			commentMain.insertAdjacentHTML(
				'beforeend',
				`<div class="comment">
					<h3 class="user-email">${email}</h3>
					<p class="comment-text">${body}</p>
					
				</div>`,
			);
		});
		if (data.length < limit) {
			commentsLoadingBtn.style.display = 'none';
		}
	}
	commentsLoadingBtn.addEventListener('click', showMoreComments);
});
