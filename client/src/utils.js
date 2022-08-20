const uuid = () => {
  return Math.random().toString(16).slice(2)
}

const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
}

export default {
  uuid,
  randomNumber
}
