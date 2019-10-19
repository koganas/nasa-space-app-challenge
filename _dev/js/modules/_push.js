// Push notifications events
const _push = {
  init() {
    this.cacheDOM();
  },

  cacheDOM() {
    this.btnFollow = document.getElementById('btnFollow');
    this.btnUpdates = document.getElementById('btnUpdates');
    this.OneSignal = window.OneSignal || [];
    this.checkPushSupport();
  },

  checkPushSupport() {
    if (this.btnFollow) {
      OneSignal.push(() => {
        var isSupported = OneSignal.isPushNotificationsSupported();
        if (isSupported) {
          OneSignal.isPushNotificationsEnabled(isEnabled => {
            if (!isEnabled) btnUpdates.style.display = 'block';
          });
        }
      });
      this.btnFollow.addEventListener(
        'click',
        e => {
          e.preventDefault();
          OneSignal.push(() => {
            OneSignal.registerForPushNotifications();
          });
        },
        false
      );
    }
  }
};

export default _push;