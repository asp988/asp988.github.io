ticketsApp.EditTicketView = Backbone.View.extend({

	tagName: "section",

	className: "ticketapp-main-ticketedit",

	template: _.template($("#ticket-edit-template").html()),

	events: {
			'click #ticketapp-main-ticketedit-form-controls-save': 'saveTicket',
			'click #ticketapp-main-ticketedit-form-controls-cancel': 'cancelTicket',
			'click #ticketapp-main-ticketedit-form-controls-printticket': 'printTicket',
			'click #ticketapp-main-ticketedit-form-controls-printact': 'printAct'
	},

	initialize: function () {
		var currentDate = new Date();
		this.date = "" + currentDate.getDate() + "." + currentDate.getMonth() + "." + currentDate.getUTCFullYear();
		this.previosState = this.model.get("status");
	},

	render: function(){
		var that = this;
		this.$el.html(this.template(this.model.toJSON()));
		setTimeout(function(){
			that.el.scrollIntoView(true);
		}, 5);
		setTimeout(function(){
			that.$("#ticketapp-main-ticketedit-form-subjectinput").focus();
		}, 150);
		return this;
	},

	saveTicket: function(){
		var ticket = {
			"number": this.$("#ticketapp-main-ticketedit-form-numberinput").val(),
			"subject": this.$("#ticketapp-main-ticketedit-form-subjectinput").val(),
			"sn": this.$("#ticketapp-main-ticketedit-form-sninput").val(),
			"clientname": this.$("#ticketapp-main-ticketedit-form-clientnameinput").val(),
			"phone": this.$("#ticketapp-main-ticketedit-form-phoneinput").val(),
			"complect": this.$("#ticketapp-main-ticketedit-form-complectinput").val(),
			"status": this.$("#ticketapp-main-ticketedit-form-statusinput option:selected").val(),
			"comment": this.$("#ticketapp-main-ticketedit-form-commentinput").val(),
			"operation": this.$("#ticketapp-main-ticketedit-form-operationsinput").val(),
			"cost": this.$("#ticketapp-main-ticketedit-form-costinput").val(),
			"getDate": this.$("#ticketapp-main-ticketedit-form-dates-getdate").val(),
			"doneDate": this.$("#ticketapp-main-ticketedit-form-dates-donedate").val()
		};

		ticket.doneDate = ticket.status === "Выдан" && this.model.get("status") !== "Выдан" ? this.date : ticket.doneDate;

		this.model.save(ticket);

		if(this.previosState !== "Выдан" && this.model.get("status") === "Выдан"){
			this.printAct();
		}

		this.remove();
	},

	cancelTicket: function(){
		this.remove();
	},

	printTicket: function(){
		var message = this.model.toJSON();
		window.printPopup = window.open("ticketprintpopup.html", "print", "menubar=yes");
		$(printPopup).on("load", function(event){
			printPopup.postMessage(message, "*");
		});
	},

	printAct: function(){
		var message = this.model.toJSON();
		if(this.model.get("status") === "Выдан"){
			window.printPopup = window.open("actprintpopup.html", "print", "menubar=yes");
			$(printPopup).on("load", function(event){
				printPopup.postMessage(message, "*");
			});
		}
	}

});