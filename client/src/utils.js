const uuid = () => {
  return Math.random().toString(16).slice(2)
}

const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
}

export function getMediaBreakpoint(size) {
  switch (size) {
    case "xs":
      return 425;
    case "sm":
      return 600;
    case "md":
      return 774;
    case "lg":
      return 900;
    case "xl":
      return 1200;
    case "xxl":
      return 1400;
    default:
      return 0; //xxs
  }
}

export default {
  uuid,
  randomNumber
}
