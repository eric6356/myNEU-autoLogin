(function () {
  function saveCredential () {
    var username = document.querySelector('input#user').value
    var password = document.querySelector('input#pass').value
    chrome.storage.sync.set(
      {'credential': {username: username, password: password}},
      function () {
        alert('myNEU-autoLogin: Credential Saved!')
        // message('Credential Saved!') TODO
      }
    )
  }

  function loadCredential (cb) {  // TODO: use Promise
    chrome.storage.sync.get('credential', function (items) {
      console.log(items.credential)
      if (items.credential) {
        document.querySelector('input#pass').value = items.credential.password
        document.querySelector('input#user').value = items.credential.username
        cb()
      } else {
        loginBtn.addEventListener('click', saveCredential)
      }
    })
  }

  var loginBtn = document.querySelector('input[value="Login"]')
  var canLogin = true  // TODO: try to avoid such state
  function quickLogin() {
    chrome.storage.sync.get('quickLogin', function (items) {
      if (items.quickLogin) {
        loginBtn.value = 'Loading...'
        loginBtn.click()
      } else {
        var cd = 3
        loginBtn.value = 'Login(' + cd + ')'
        var i = setInterval(function () {
          if (cd === 0) loginBtn.click()

          if (canLogin) {
            cd -= 1
            if (cd >= 0) {
              loginBtn.value = 'Login(' + cd + ')'
            } else {
              loginBtn.value = 'Loading...'
            }
          } else {
            clearInterval(i)
          }
        }, 1000)
      }
    })
  }

  function cancleLogin () {
    canLogin = false
    loginBtn.value = 'Login'
  }

  document.querySelector('form[name="cplogin"]').addEventListener('submit', saveCredential)
  document.querySelector('input[value="Cancel"]').addEventListener('click', cancleLogin)

  loadCredential(quickLogin)
})()
