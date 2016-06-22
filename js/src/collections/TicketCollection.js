ticketsApp.TicketCollect = Backbone.Collection.extend({

	model: ticketsApp.TicketModel,

	url: "https://dry-bastion-22417.herokuapp.com/"

});

ticketsApp.tickets = new ticketsApp.TicketCollect();