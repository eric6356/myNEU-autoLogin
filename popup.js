(function () {
  chrome.storage.sync.get('credential', function (items) {
    var statusDOM = document.querySelector('p.credentialStatus');
    if (items.credential) {
      statusDOM.innerHTML = 'Saved'
    } else {
      statusDOM.innerHTML = 'Unknown<br>Credential will be saved after your first login.'
    }
  })

  document.querySelector('input#quickLogin').onchange = function () {
    chrome.storage.sync.set({'quickLogin': this.checked})
  }
})()
