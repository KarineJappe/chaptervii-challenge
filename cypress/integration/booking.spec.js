/// <reference types="cypress" />


import req from '../support/api/requests'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'

context('Booking', () => {
	before(() => {
		req.doAuth();
	});
	
	it('Validar o contrato do GET Booking @contract', () => {
		
		req.getBooking().then(getBookingResponse => {
			assertions.validateContractOf(getBookingResponse, schemas.getBookingSchema())
		})
	});

	it('Criar uma resrva com sucesso @functional', () => {
		req.postBooking().then(postBookingResponse => {
			assertions.shouldHaveStatus(postBookingResponse, 200)
			assertions.shouldBookingIdBePresent(postBookingResponse)
			assertions.shouldHaveDefaultHeaders(postBookingResponse)
			assertions.shouldHaveContentTypeAppJson(postBookingResponse)
			assertions.shouldDurationBeFast(postBookingResponse)
		})
	});

	it('Tentar alterar uma reserva inexistente @functional', () => {
		req.updateBooking(Cypress.env('token')).then(putBookingResponse =>{
			assertions.shouldHaveStatus(putBookingResponse, 405)
		})
	});

	it('Tentar alterar uma reserva sem token @functional', () => {
		req.postBooking().then(postBookingResponse =>{
			req.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse =>{
				assertions.shouldHaveStatus(putBookingResponse, 403)
			})
		})
	});

	it('Tentar alterar uma reserva com token inválido @functional', () => {
		req.postBooking().then(postBookingResponse =>{
			req.updateBooking('inválido', postBookingResponse).then(putBookingResponse => {
				assertions.shouldHaveStatus(putBookingResponse, 403)
			})
		})
	});

	it('Alterar uma reserva com sucesso @functional', () => {
		req.postBooking().then(postBookingResponse =>{
			req.updateBooking(Cypress.env('token'), postBookingResponse).then(putBookingResponse =>{
				assertions.shouldHaveStatus(putBookingResponse, 200)
			})
		})
	});
	it('Tentar excluir uma reserva inexistente @functional', () => {
		req.deleteBooking(Cypress.env('token')).then(deleteBookingResponse =>{
			assertions.shouldHaveStatus(deleteBookingResponse, 405)
		})
	});

	it('Tentar excluir uma reserva sem token @functional', () => {
		req.postBooking().then(postBookingResponse => {
			req.deleteBookingWithoutToken(postBookingResponse).then(deleteBookingResponse =>{
				assertions.shouldHaveStatus(deleteBookingResponse, 403)
			})
		})
	});

	it('Tentar excluir uma reserva com token inválido @functional', () => {
		req.postBooking().then(postBookingResponse =>{
			req.deleteBooking('inválido', postBookingResponse).then(deleteBookingResponse =>{
				assertions.shouldHaveStatus(deleteBookingResponse, 403)
			})
		})
	});

	it('Excluir uma reserva com sucesso @functional', () => {
		req.postBooking().then(postBookingResponse =>{
			req.deleteBooking(Cypress.env('token'), postBookingResponse).then(deleteBookingResponse =>{
				assertions.shouldHaveStatus(deleteBookingResponse, 201)
			})
		})
	});

});