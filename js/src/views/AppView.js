ticketsApp.AppView = Backbone.View.extend({

	el: ".ticketapp",

	events: {
			'click .ticketapp-header-newticket': 'createTicketView',
			'keyup #ticketapp-header-searchinput': 'filterTickets',
			'blur #ticketapp-header-searchinput': 'clearFilter',
			'click .ticketapp-header-save': 'saveTickets',
			'change .ticketapp-header-loadinput': 'loadTickets'
	},

	initialize: function(){
		this.$ticketsList = this.$("#ticketapp-main");

		this.listenTo(ticketsApp.tickets, 'add', this.addTicketView);

		ticketsApp.tickets.fetch();
	},

	render: function(){
		console.log();
	},

	addTicketView: function(ticket){
		var view = new ticketsApp.TicketView({model: ticket});
		this.$ticketsList.append(view.render().el);
	},

	createTicketView: function(event){
		var isFirstEditView = !$(".ticketapp-main-ticketedit-form-subjectinput")[0];
		if(isFirstEditView){
			var view = new ticketsApp.CreateTicketView();
			this.$ticketsList.append(view.render().el);
		}
	},

	filterTickets: function(event){
		var searchString = $("#ticketapp-header-searchinput").val(),
			filteredTickets = ticketsApp.tickets.filter(function(model){
				return new RegExp(searchString, "i").test(model.get("number")) || new RegExp(searchString, "i").test(model.get("phone")) || new RegExp(searchString, "i").test(model.get("clientname"));
			});
		this.$el.addClass("filter");
		ticketsApp.tickets.forEach(function(model){model.trigger("unmatch");});
		_.forEach(filteredTickets, function(model){model.trigger("match");});
	},

	clearFilter: function(){
		if($("#ticketapp-header-searchinput").val() === ""){
			this.$el.removeClass("filter");
			ticketsApp.tickets.forEach(function(model){model.trigger("unmatch");});
		}
	},

	saveTickets: function(event){
		var currentDate = new Date(),
			blob = new Blob([JSON.stringify(ticketsApp.tickets.toJSON())], {type: "text/plain;charset=utf-8"}),
			filename = "tickets-" + currentDate.getDate() + "-" + currentDate.getMonth() + "-" + currentDate.getUTCFullYear() + ".json";

		saveAs(blob, filename);
	},

	loadTickets: function(event){
		var reader = new FileReader();

		reader.readAsText(event.target.files[0]);
		reader.onload = function(){
			var data = JSON.parse(reader.result);
			if (data[0].number && data[0].subject){
				for (var i = ticketsApp.tickets.length - 1; i >= 0; i--) {ticketsApp.tickets.models[i].destroy();};
				_.each(data, function(m){ticketsApp.tickets.create(m);})
			}
		};
	},

});

ticketsApp.app = new ticketsApp.AppView();