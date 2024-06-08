self.addEventListener('push', event => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: 'Complete yout 2FA in phone app'
    });
});