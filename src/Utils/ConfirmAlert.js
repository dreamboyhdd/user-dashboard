import Swal from 'sweetalert2';
const AlertConfirm = (message, callback) => {

  Swal.fire({
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok, Delete',
    cancelButtonText: 'No, Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  })
}

export const ConfirmAlert = AlertConfirm;