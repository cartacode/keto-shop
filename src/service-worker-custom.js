importScripts('https://js.pusher.com/4.2/pusher.worker.min.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');


var pusher = new Pusher('dbda48f2063497dda199',{
	cluster: 'ap2',
	encrypted: true
});

const prices = pusher.subscribe('coin-prices-development');

prices.bind('prices', function(product) {
	    
	self.registration.showNotification('New Product Added', {
	    body: JSON.stringify(product),
		tag: Math.random().toString(36).substring(7),
		requireInteraction: true,
	});
})


if (workbox) {
	console.log(`Yay! Workbox is loaded 🎉`);
	  workbox.precaching.precacheAndRoute([]);
	  workbox.routing.registerRoute(
		/.(?:png|gif|jpg)/,
		workbox.strategies.cacheFirst({
		  cacheName: 'images-cache',
		  plugins: [
			new workbox.expiration.Plugin({
			  maxEntries: 50,
			  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
			})
		  ]
		})
	  );

	const postHandler = workbox.strategies.networkFirst({
		cacheName: 'posts-cache',
		plugins: [
		  new workbox.expiration.Plugin({
			maxEntries: 50,
		  })
		]
  });

  workbox.routing.registerRoute(/\.(?:js|css|html)$/, args => {
		return postHandler.handle(args).then(response => {
			if (!response) {
			  return caches.match('pages/offline.html');
			} else if (response.status === 404) {
			  return caches.match('pages/404.html');
			}
			return response;
		});
  });

  const articleHandler = workbox.strategies.networkFirst({
	cacheName: 'articles-cache',
	plugins: [
	  new workbox.expiration.Plugin({
		maxEntries: 50,
	  })
	]
  });

	workbox.routing.registerRoute('/cart', args => {
		return articleHandler.handle(args).then(response => {
			if (!response) {
			  return caches.match('pages/offline.html');
			} else if (response.status === 404) {
			  return caches.match('pages/404.html');
			}
			return response;
		});
	});

} else {
	console.log(`Boo! Workbox didn't load 😬`);
}