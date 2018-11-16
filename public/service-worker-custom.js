self.addEventListener('push', function(event) {
  console.log('Received push');
  
  if (event.data) {
    const dataText = event.data.text();
    notificationTitle = 'Received Payload';
    notificationOptions.body = `Push data: '${dataText}'`;

    event.waitUntil(
      Promise.all([
        self.registration.showNotification(
          notificationTitle, notificationOptions),
        self.analytics.trackEvent('push-received'),
      ])
    );
  }
})