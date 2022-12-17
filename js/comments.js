'use strict';

const commentHeader = document.querySelector('.comments-header');
const commentMain = document.querySelector('.comments-main');
const commentOnLoad = document.getElementsByClassName('comment');
const commentsLoadingBtn = document.querySelector('#load-comments');
const spinner = document.querySelector('.lds-default');


window.addEventListener('load', () => {
	const comments = document.location.search;
	const searchParams = new URLSearchParams(comments);
	const post = parseInt(searchParams.get('postId'));
	
	async function loadPost() {
		try{
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
		}catch {
			console.error(e);
			alert('Error: User not found');
		}
	}
	setTimeout(loadPost,1500)


	async function loadComments() {
		try{
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
		spinner.style.display = 'none';
		} catch {
			console.error(e);
			spinner.style.display = 'inline-block';
			alert('Error: Posts not found');
		}
	}
	setTimeout(loadComments,1500)
	

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
