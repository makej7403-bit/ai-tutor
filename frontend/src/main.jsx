// after app render
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(
      function(reg) { console.log('SW registered', reg); },
      function(err) { console.log('SW reg failed', err); }
    );
  });
}
