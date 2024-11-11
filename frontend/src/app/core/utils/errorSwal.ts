import Swal from 'sweetalert2';

export const errorSwal = (errors: { [key: string]: any }) => {
  const errorMessages = Object.entries(errors).map(
    ([field, error]) => `<strong>${field}:</strong> ${Object.keys(error).join(', ')}`
  );

  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    html: `Error in the following fields:<br>${errorMessages.join('<br>')}`,
  });
};
