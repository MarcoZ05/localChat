export function elemById(id) {
  return document.getElementById(id);
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function cLog(msg) {
  console.log(msg);
}

export function getStor(name) {
  return localStorage.getItem(name);
}

export function setStor(name, value) {
  localStorage.setItem(name, value);
}
