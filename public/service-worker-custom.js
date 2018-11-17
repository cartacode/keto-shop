importScripts('https://js.pusher.com/4.2/pusher.worker.min.js');

var pusher = new Pusher('dbda48f2063497dda199',{
	cluster: 'ap2',
	encrypted: true
});

const prices = pusher.subscribe('coin-prices-development');

prices.bind('prices', function(product) {
	if (Notification.permission == 'granted') {
	    
	      self.registration.showNotification('New Product Added', {
		    body: JSON.stringify(product),
			tag: Math.random().toString(36).substring(7),
			requireInteraction: true,
		  });
	}
})