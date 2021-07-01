const mask = this.document.querySelector('.mask');
const menuBtn = this.document.querySelector('#side-menu-toggle');
const sideDrawer = this.document.querySelector('.mobile-nav');

mask.addEventListener('click', maskClickHandle);
menuBtn.addEventListener('click', menuToggleClickHandler);

function maskClickHandle() {
  mask.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  mask.style.display = 'block';
  sideDrawer.classList.add('open');
}

