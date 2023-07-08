const uuid = () => {
  return Math.random().toString(16).slice(2)
}

const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
}

export function getMediaBreakpoint(size) {
  switch (size) {
    case "xxs":
      return 450;
    case "xs":
      return 450;
    case "sm":
      return 600;
    case "md":
      return 785;
    case "lg":
      return 925;
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
