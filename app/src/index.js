import { addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';

import { collectionAppointments, collectionArchive, collectionCurrent, auth } from './modules/firebase';

import { signOut, signInWithEmailAndPassword } from 'firebase/auth';

import { createCard } from './modules/card';

import { setMinAttributeDateNow, render } from './modules/utilities';

import { form, createAdminPanel, createLoginMenu, createRoleMenu } from './modules/element';

document.addEventListener('DOMContentLoaded', () => render(roleMenu));

const openFormAppointment = () => {
	setMinAttributeDateNow(form, 'somedate');
	render(form);
	submitUserInfo();
};

const openLoginPanel = () => {
	render(loginMenu);
	loginMenu.addEventListener('submit', tryLoginAdminPanel);
};

const logOut = () => {
	signOut(auth);
	render(roleMenu);
};

const roleMenu = createRoleMenu(openFormAppointment, openLoginPanel);
const loginMenu = createLoginMenu();
const adminPanel = createAdminPanel(logOut);

const tryLoginAdminPanel = (event) => {
	event.preventDefault();
	const email = loginMenu.email.value;
	const password = loginMenu.password.value;
	signInWithEmailAndPassword(auth, email, password).then(() => {
		getAppointments(adminPanel.querySelector('#current-appointments'), collectionCurrent);
		getAppointments(adminPanel.querySelector('#archive-appointments'), collectionArchive);
		render(adminPanel);
	});
};

const getAppointments = (whereAdd, collection) => {
	onSnapshot(collection, (snapshot) => {
		const appointments = [];
		snapshot.docs.forEach((doc) => {
			appointments.push({ ...doc.data(), id: doc.id });
		});

		const divCards = document.createElement('div');
		appointments.forEach((appointment) => {
			const card = createCard(appointment, collection);
			divCards.append(card);
		});

		render(divCards, whereAdd);
	});
};

const submitUserInfo = () => {
	const appointmentForm = document.querySelector('.survey');
	appointmentForm.addEventListener('submit', (event) => {
		event.preventDefault();
		addDoc(collectionAppointments, {
			name: appointmentForm.name.value,
			surname: appointmentForm.surname.value,
			phone: appointmentForm.phone.value,
			email: appointmentForm.email.value,
			date: appointmentForm.date.value,
			comments: appointmentForm.comments.value,
			status: appointmentForm.status.value,
			complaints: complaintsToString(),
			confirm: 'unknown',
			createdAt: serverTimestamp(),
		});
		addTextAppointmentSent(appointmentForm);
	});
};

const addTextAppointmentSent = (form) => {
	const div = document.createElement('div');
	const p = document.createElement('p');
	p.textContent = 'Ваша заявка отправлена!';
	div.append(p);
	form.querySelector('.button-container').after(div);
	form.querySelector('.button-container').remove();
};

const complaintsToString = () => {
	const complaints = document.querySelectorAll('.check');
	let complaintsString = '';
	complaints.forEach((complaint) => {
		if (complaint.querySelector('.input-checkbox').checked) {
			complaintsString += `${complaint.textContent}  `;
		}
	});
	return complaintsString;
};
