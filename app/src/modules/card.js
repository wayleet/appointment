import { updateDoc, doc } from 'firebase/firestore';

import { createComponent } from './element';

import { db, collectionArchive } from './firebase';

import { format } from 'date-fns';

import ruLocale from 'date-fns/locale/ru';

const templateCard = document.querySelector('.template-card');

export const createCard = (appointment, collectionName) => {
	const docRef = doc(db, 'appointments', appointment.id);

	const card = createComponent(templateCard);

	const ulComplaints = card.querySelector('.complaints');
	addComplaintsToCard(appointment.complaints, ulComplaints);

	card.querySelector('.card-name').textContent = `${appointment.name} ${appointment.surname}`;
	card.querySelector('.description').textContent = `Описание: ${checkTextEmpty(appointment.comments)}`;
	card.querySelector('.telephone').textContent = `Телефон: ${appointment.phone}`;
	card.querySelector('.status').textContent = `Оценка состояния: ${appointment.status}`;
	card.querySelector('.date').textContent = `Дата приема: ${formatDate(appointment.date)}`;
	card.querySelector('.email').textContent = `Почта: ${checkTextEmpty(appointment.email)}`;

	const buttonCancel = card.querySelector('.cancel-appointment');
	buttonCancel.addEventListener('click', () => cancelAppointment(docRef));

	const buttonConfirm = card.querySelector('.confirm-appointment');
	buttonConfirm.addEventListener('click', () => confirmAppointment(docRef));

	const date = card.querySelector('.date-appointment');
	date.value = appointment.date;
	date.addEventListener('change', () => updateDate(event, docRef));

	if (collectionName === collectionArchive) {
		buttonCancel.remove();
		buttonConfirm.remove();
		date.remove();
		card.querySelector('.change-date').remove();
		return card;
	}

	if (appointment.confirm === 'true') {
		buttonConfirm.style.display = 'none';
		card.querySelector('.confirmation').textContent = 'Запись подтверждена!';
	}

	return card;
};

const addComplaintsToCard = (complaints, whereAdd) => {
	const complaintsArray = complaints.split('  ');
	complaintsArray.pop(); //removing an extra item
	complaintsArray.forEach((complaint) => {
		const li = document.createElement('li');
		li.textContent = complaint;
		whereAdd.append(li);
	});
};

const updateDate = (event, docRef) => {
	updateDoc(docRef, {
		date: event.target.value,
	});
};

const cancelAppointment = (docRef) => {
	updateDoc(docRef, {
		confirm: 'false',
	});
};

const confirmAppointment = (docRef) => {
	updateDoc(docRef, {
		confirm: 'true',
	});
};

const checkTextEmpty = (string) => {
	if (string === '') {
		return 'данные не указаны';
	}
	return string;
};

const formatDate = (date) => {
	return format(new Date(date), 'd MMMM', { locale: ruLocale });
};
