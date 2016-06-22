ticketsApp.TicketView = Backbone.View.extend({

	tagName: "ul",

	className: "ticketapp-main-record",

	template: _.template($("#ticket-view-template").html()),

	events: {
			'dblclick': 'editTicketView',
			'touchstart': 'editTicketView',
			'click .ticketapp-main-record-remove': 'removeTicket'
	},

	initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'match', this.filterMatch);
			this.listenTo(this.model, 'unmatch', this.filterUnmatch);
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	editTicketView: function(event){
		var view, isFirstEditView = !$(".ticketapp-main-ticketedit-form-subjectinput")[0];
		if(event.type === "dblclick" && isFirstEditView){
			view = new ticketsApp.EditTicketView({model: this.model});
			$("#ticketapp-main").append(view.render().el);
		} else if(event.type === "touchstart"){
			if(ticketsApp.prevTouchTime == undefined || event.timeStamp > ticketsApp.prevTouchTime+1000){
				ticketsApp.prevTouchTime = event.timeStamp;
				ticketsApp.prevTouchTarget = event.currentTarget;
			}
			if (event.timeStamp >= ticketsApp.prevTouchTime+50 && event.timeStamp < ticketsApp.prevTouchTime+800 && ticketsApp.prevTouchTarget === event.currentTarget && isFirstEditView){
				view = new ticketsApp.EditTicketView({model: this.model});
				$("#ticketapp-main").append(view.render().el);
			}
		}
	},

	removeTicket: function(event){
		this.model.destroy();
	},

	filterMatch: function(){
		this.$el.addClass("filtered");
	},

	filterUnmatch: function(){
		this.$el.removeClass("filtered");
	}

});