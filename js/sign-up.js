'use strict';

const signUpBtn = document.querySelector('.sign-up-btn');
const avatarImg = document.querySelector('#avatar');
const avatarFile = document.querySelector('#avatar-file');
const errMessage = document.querySelector('.sign-up-form__error');
const formItemCounts = [...document.getElementsByClassName('sign-up-form__item')];

const mainForm = document.forms.signUp;
const emailInput = mainForm.email;
const passwordInput = mainForm.password;
const nameInput = mainForm.name;
console.log(nameInput);

let formItemCount = 0;
window.addEventListener('load', () => {
	document.addEventListener('click', showsignUpForm);
	avatarFile.addEventListener('change', loadAvatar);
	mainForm.addEventListener('click', () => {
		sliderNavigation();
		showCurrentItem();
	});
});

function sliderNavigation() {
	if (
		event.target.closest('.sign-up-form__continue-btn') ||
		event.target.closest('.sign-up-form__buttons-next')
	) {
		if (emailInput.value === '') {
			emailInput.classList.add('invalid');
			errMessage.textContent = 'Email is requred field';
			errMessage.style.top = '10px';
			setTimeout(() => {
				errMessage.style.top = '-70px';
			}, 3000);
			return;
		} else {
			emailInput.classList.remove('invalid');
			errMessage.textContent = '';
			errMessage.style.top = '-70px';
		}
		if (!checkEmail(emailInput)) {
			emailInput.classList.add('invalid');
			errMessage.textContent = 'Email is invalid';
			errMessage.style.top = '10px';
			setTimeout(() => {
				errMessage.style.top = '-70px';
			}, 3000);
			return;
		} else {
			emailInput.classList.remove('invalid');
			errMessage.textContent = '';
			errMessage.style.top = '-70px';
		}
		if (!checkPassword(passwordInput)) {
			passwordInput.classList.add('invalid');
			errMessage.textContent =
				'Password must contain at least one letter, one number and one special character';
			errMessage.style.top = '10px';
			setTimeout(() => {
				errMessage.style.top = '-70px';
			}, 3000);
			return;
		} else {
			passwordInput.classList.remove('invalid');
			errMessage.textContent = '';
			errMessage.style.top = '-70px';
			formItemCount++;
		}
	} else if (
		event.target.closest('.sign-up-form__buttons-prev') ||
		event.target.closest('.sign-up-form-avatar__buttons-prev')
	) {
		formItemCount--;
	}
}

/* regular expression on cheks */
function checkOnEmptyRow(name) {
	return /^\s*$/.test(name.va);
}

function checkEmail(email) {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email.value,
	);
}

function checkPassword(pass) {
	return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pass.value);
}

/* Check email and passworn on focus */
emailInput.addEventListener('focus', () => {
	if (emailInput.classList.contains('invalid')) {
		emailInput.classList.remove('invalid');
	}
});

passwordInput.addEventListener('focus', () => {
	if (passwordInput.classList.contains('invalid')) {
		passwordInput.classList.remove('invalid');
	}
});

/* Check email and password on input */
emailInput.addEventListener('input', () => {
	if (!checkEmail(emailInput)) {
		emailInput.classList.add('invalid');
	}
	if (checkEmail(emailInput)) {
		emailInput.classList.remove('invalid');
	}
});

passwordInput.addEventListener('input', () => {
	if (!checkPassword(passwordInput)) {
		passwordInput.classList.add('invalid');
	}
	if (checkPassword(passwordInput)) {
		passwordInput.classList.remove('invalid');
	}
});
//=========================================================================================
function showCurrentItem() {
	formItemCounts.forEach((item) => {
		item.classList.contains('sign-up-form__item_active') &&
			item.classList.remove('sign-up-form__item_active');
	});
	formItemCounts[formItemCount].classList.add('sign-up-form__item_active');
}

function showsignUpForm() {
	if (event.target.closest('.sign-up-btn')) {
		mainForm.classList.toggle('sign-up-form_active');
	}
	if (!event.target.closest('.sign-up-btn') && !event.target.closest('.sign-up-form')) {
		mainForm.classList.remove('sign-up-form_active');
	}
}

function loadAvatar() {
	if (this.files && this.files[0]) {
		avatarImg.onload = () => URL.revokeObjectURL(avatarImg.src);
		avatarImg.src = URL.createObjectURL(this.files[0]);
	}
}
