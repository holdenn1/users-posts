'use strict';

const signInBtn = document.querySelector('.sign-in-btn');
const signForm = document.querySelector('.sign-in-form ');

document.addEventListener('click', showSignInForm);

function showSignInForm() {
	if (event.target.closest('.sign-in-btn')) {
		signForm.classList.toggle('sign-in-form_active');
	}
	if (!event.target.closest('.sign-in-btn') && !event.target.closest('.sign-in-form')) {
		signForm.classList.remove('sign-in-form_active');
	}
}
