ticketsApp.CreateTicketView = Backbone.View.extend({

	tagName: "section",

	className: "ticketapp-main-ticketedit",

	template: _.template($("#ticket-edit-template").html()),

	events: {
			'click .ticketapp-main-ticketedit-form-controls-save': 'createTicket',
			'click .ticketapp-main-ticketedit-form-controls-cancel': 'cancelTicket',
			'click #ticketapp-main-ticketedit-form-controls-printticket': 'printTicket'
	},

	initialize: function () {
		var currentDate = new Date();
		this.date = "" + currentDate.getDate() + "." + currentDate.getMonth() + "." + currentDate.getUTCFullYear();
	},

	render: function(){
		var that = this;
		this.$el.html(this.template({
			"number": ticketsApp.tickets.length ? +ticketsApp.tickets.last().get("number") + 1 : "1",
			"subject": "",
			"sn": "",
			"clientname": "",
			"phone": "",
			"complect": "",
			"status": "",
			"comment": "",
			"operation": "",
			"cost": "",
			"getDate": this.date,
			"doneDate": ""
		}));
		setTimeout(function(){that.el.scrollIntoView(true);}, 10);
		return this;
	},

	createTicket: function(){
		var ticket = {
			"number": this.$("#ticketapp-main-ticketedit-form-numberinput").val(),
			"subject": this.$("#ticketapp-main-ticketedit-form-subjectinput").val() || "Наименование",
			"sn": this.$("#ticketapp-main-ticketedit-form-sninput").val() || "000000000000",
			"clientname": this.$("#ticketapp-main-ticketedit-form-clientnameinput").val() || "Частное лицо",
			"phone": this.$("#ticketapp-main-ticketedit-form-phoneinput").val() || "0000000000",
			"complect": this.$("#ticketapp-main-ticketedit-form-complectinput").val() || "Комплектация",
			"status": this.$("#ticketapp-main-ticketedit-form-statusinput option:selected").val(),
			"comment": this.$("#ticketapp-main-ticketedit-form-commentinput").val() || "",
			"operation": this.$("#ticketapp-main-ticketedit-form-operationsinput").val()  || "",
			"cost": this.$("#ticketapp-main-ticketedit-form-costinput").val() || "0",
			"getDate": this.$("#ticketapp-main-ticketedit-form-dates-getdate").val(),
			"doneDate": this.$("#ticketapp-main-ticketedit-form-dates-donedate").val()
		};

		ticketsApp.tickets.create(ticket, { wait: true });
		this.remove();
	},

	cancelTicket: function(){
		this.remove();
	},

	printTicket: function(){
		var message = {
			"number": this.$("#ticketapp-main-ticketedit-form-numberinput").val(),
			"subject": this.$("#ticketapp-main-ticketedit-form-subjectinput").val() || "_______________",
			"sn": this.$("#ticketapp-main-ticketedit-form-sninput").val() || "_______________",
			"clientname": this.$("#ticketapp-main-ticketedit-form-clientnameinput").val() || "_______________",
			"phone": this.$("#ticketapp-main-ticketedit-form-phoneinput").val() || "_______________",
			"complect": this.$("#ticketapp-main-ticketedit-form-complectinput").val() || "_______________",
			"status": this.$("#ticketapp-main-ticketedit-form-statusinput option:selected").val(),
			"comment": this.$("#ticketapp-main-ticketedit-form-commentinput").val() || "",
			"operation": this.$("#ticketapp-main-ticketedit-form-operationsinput").val()  || "",
			"cost": this.$("#ticketapp-main-ticketedit-form-costinput").val() || "_______________",
			"getDate": this.$("#ticketapp-main-ticketedit-form-dates-getdate").val(),
			"doneDate": this.$("#ticketapp-main-ticketedit-form-dates-donedate").val()
		};
		window.printPopup = window.open("ticketprintpopup.html", "print", "menubar=yes");
		$(printPopup).on("load", function(event){
			printPopup.postMessage(message, "*");
		});
	}

});