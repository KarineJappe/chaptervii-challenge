class Requests {

	getPing() {
		return cy.request({
			method: 'GET',
			url: 'ping'
		})
	}

	getBooking() {
		return cy.request({
			method: 'GET',
			url: 'booking/3'
		})
	}

	postBooking(){
		return cy.request({
			method: 'POST',
			url: 'booking',
			body:{
				"firstname" : "Jim",
				"lastname" : "Brown",
				"totalprice" : 111,
				"depositpaid" : true,
				"bookingdates" : {
						"checkin" : "2020-01-01",
						"checkout" : "2020-01-02"
				},
				"additionalneeds" : "Breakfast"
			}
		})
	}

	updateBookingWithoutToken(response){
		const id = response.body.bookingid

		return cy.request({
			method: 'PUT',
			url: `booking/${id}`,
			body:{
				"firstname": "Jim",
				"lastname": "James",
				"totalprice": 111,
				"depositpaid": true,
				"bookingdates": {
					"checkin": "2020-01-01",
					"checkout": "2020-01-02"
				},
				"additionalneeds": "Lunch"
			},
			failOnStatusCode: false
		})
	}

	updateBooking(token, response){
		const id = response ? response.body.bookingid : 0

		return cy.request({
			method: 'PUT',
			url: `booking/${id}`,
			headers:{
				Cookie: `token=${token}`
			},
			body:{
				"firstname": "Jim",
				"lastname": "James",
				"totalprice": 111,
				"depositpaid": true,
				"bookingdates": {
					"checkin": "2020-01-01",
					"checkout": "2020-01-02"
				},
				"additionalneeds": "Lunch"
			},
			failOnStatusCode: false
		})
	}

	postAuth(){
		return cy.request({
			method: 'POST',
			url: 'auth',
			body:{
				"username" : "admin",
				"password" : "password123"
		}
		});
	}

	doAuth(){
		this.postAuth().then(authResponse =>{
			const token = authResponse.body.token

			Cypress.env('token', token)
		})
	}

	deleteBooking(token, response){

		const id = response ? response.body.bookingid : 0

		return cy.request({
			method: 'DELETE',
			url: `booking/${id}`,
			headers: {
				Cookie: `token=${token}`
			},
			failOnStatusCode: false
		})
	}

	deleteBookingWithoutToken(response){

		const id = response ? response.body.bookingid : 0

		return cy.request({
			method: 'DELETE',
			url: `booking/${id}`,
			failOnStatusCode: false
		})
	}
}

export default new Requests()