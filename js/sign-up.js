'use strict';

const signUpBtn = document.querySelector('.sign-up-btn');
const avatarImg = document.querySelector('#avatar');
const avatarFile = document.querySelector('#avatar-file');
const formItems = document.getElementsByClassName('sign-up-form__item');
const emailInput = document.querySelector('.sign-up-form-email__email-input');
const passwordInput = document.querySelector('.sign-up-form-email__password-input');
console.log(emailInput.value);

const signForm = document.forms.signUp;

window.addEventListener('load', () => {
	document.addEventListener('click', showsignUpForm);
	avatarFile.addEventListener('change', loadAvatar);
	signForm.addEventListener('click', () => {
		slideItemForm();
		showCurrentStap();
	});
});

let formItemsArr = [...formItems];

let currentStap = formItemsArr.findIndex((i) => {
	return i.classList.contains('sign-up-form__item_active');
});

if (currentStap < 0) {
	currentStap = 0;
	showCurrentStap();
}

function slideItemForm() {
	if (
		event.target.closest('.sign-up-form__continue-btn') ||
		event.target.closest('.sign-up-form__buttons-next')
	) {
		currentStap += 1;
	} else if (
		event.target.closest('.sign-up-form__buttons-prev') ||
		event.target.closest('.sign-up-form-avatar__buttons-prev')
	) {
		currentStap -= 1;
	}
	showCurrentStap();
}

function showCurrentStap() {
	formItemsArr.forEach((item, index) => {
		item.classList.toggle('sign-up-form__item_active', index === currentStap);
	});
}

/* ========================================================= */

function showsignUpForm() {
	if (event.target.closest('.sign-up-btn')) {
		signForm.classList.toggle('sign-up-form_active');
	}
	if (!event.target.closest('.sign-up-btn') && !event.target.closest('.sign-up-form')) {
		signForm.classList.remove('sign-up-form_active');
	}
}

function loadAvatar() {
	if (this.files && this.files[0]) {
		avatarImg.onload = () => URL.revokeObjectURL(avatarImg.src);
		avatarImg.src = URL.createObjectURL(this.files[0]);
	}
}
