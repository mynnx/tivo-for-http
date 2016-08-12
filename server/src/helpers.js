export function delay(duration) {
  return function () {
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve(duration * 1000), duration * 1000));
  }
}


