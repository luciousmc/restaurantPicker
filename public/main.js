const getRestaurntBtn = document.querySelector('[data-random-btn]');

getRestaurntBtn.addEventListener('click', async (e) => {
  try {
    const test = await fetch('/restaurant');
    console.log(test);
  } catch (error) {
    console.log(error);
  }
});
