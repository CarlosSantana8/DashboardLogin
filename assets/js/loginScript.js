var formSignin = document.querySelector('#signin');
var formSignup = document.querySelector('#signup');
var btnColor = document.querySelector('.btnColor');
var lockConf = document.getElementById('lockConf')
var mostrarIcone = true;

let signinEmail = document.querySelector(".signinEmail");
let signinPassword = document.querySelector(".signinPassword");
let signupEmail = document.querySelector(".signupEmail");
let signupPassword = document.querySelector(".signupPassword");
let signupPasswordConfirm = document.querySelector(".signupPasswordConfirm");
let registeredUsers = [];

const url = `http://${window.location.host}/`;

document.querySelector('#btnSignin')
  .addEventListener('click', () => {
    formSignin.style.left = "25px";
    formSignup.style.left = "450px";
    btnColor.style.left = "0px";
  });

document.querySelector('#btnSignup')
  .addEventListener('click', () => {
    formSignin.style.left = "-450px";
    formSignup.style.left = "25px";
    btnColor.style.left = "110px";
  });

function isNewUser(email) {
  for (let i = 0; i < registeredUsers.length; i++) {
    if (registeredUsers[i].email === email) {
      return false;
    }
  }
  return true;
}

function validUser(user) {
  for (let i = 0; i < registeredUsers.length; i++) {
    console.log(registeredUsers[i].email, user.email, registeredUsers[i].password, user.password)
    if (registeredUsers[i].email === user.email && registeredUsers[i].password == user.password) {
      return true;
    }
  }
  return false;
}

function signupSubmit(e) {
  e.preventDefault()
  if (isNewUser(signupEmail.value)) {
    const newUser = {
      email: signupEmail.value,
      password: signupPassword.value
    }
    if (newUser.password === signupPasswordConfirm.value) {
      registeredUsers.push(newUser)
      window.alert("Usuário cadastrado com sucesso! Realize seu login na aba SIGN-IN")
    } else {
      window.alert("As senhas fornecidas são diferentes! Tente novamente")
    }
  } else {
    window.alert("Este Email ja está cadastrado, Realize seu login na aba SIGN-IN")
  }
}

function signinSubmit(e) {
  e.preventDefault()
  const user = {
    email: signinEmail.value,
    password: signinPassword.value
  }
  if (validUser(user)) {
    window.location.href = `${url}dashboard.html`
  } else if (isNewUser(user.email)) {
    window.alert("Usuário não cadastrado!! Realize seu cadastro na aba SIGN-UP")
  } else {
    window.alert("Usuário ou senha Inválidos!! Tente novamente")
  }
}

formSignup.addEventListener('submit', signupSubmit)
formSignin.addEventListener('submit', signinSubmit)




