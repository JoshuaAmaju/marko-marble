export function animate (to, fn = () => {}) {
  const from = JSON.parse (localStorage.getItem ('from'));

  let transition = new SharedElement ({to});

  transition.points ({from}).init ().play (fn);
}
