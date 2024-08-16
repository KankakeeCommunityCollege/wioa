// import Modal from 'bootstrap/js/dist/modal';

// function openModal(modalEl) {
//   // You should only every have one modal open at a time:
//   const closeOpenModal = new Promise((resolve, reject) => {
//     if (!document.querySelector('.modal.show'))
//       resolve();
      
//     const openModalEl = document.querySelector('.modal.show');

//     if (openModalEl == modalEl) { // No need to open one that's already open
//       reject(`Modal already opened.`);
//     } else {
//       const openModal = Modal.getInstance(openModalEl);

//       openModalEl.addEventListener('hidden.bs.modal', _e => resolve());
//       openModal.hide();
//     }
//   });

//   closeOpenModal.then(() => {
//     const modal = new Modal(modalEl);

//     modal.show();
//   }).catch(err => {
//     // console.log(err);
//     return;
//   })
// }

async function openModal(modalEl) {
  const { default: Modal } = await import('bootstrap/js/dist/modal');
  const modal = new Modal(modalEl);

  modal.show();
}

function checkForMatchingModal(hash) {
  if (document.querySelector(`.modal${hash}`)) {
    const modalEl = document.querySelector(`.modal${hash}`);

    openModal(modalEl);
  }
}

function openModalOnLocationHash() {
  if (window.location.hash) {
    checkForMatchingModal(window.location.hash);
  }
  // window.addEventListener('hashchange', e => {
  //   const newURL = new URL(e.newURL);

  //   if (newURL.hash) {
  //     checkForMatchingModal(newURL.hash);
  //   }
  // });
}

export default openModalOnLocationHash;
