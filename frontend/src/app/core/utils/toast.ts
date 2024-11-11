import Swal, { SweetAlertIcon } from 'sweetalert2'

interface toastInterface {
  icon?: SweetAlertIcon,
  title: string|undefined, 
  background?: string|undefined,
}
export const Toast = ({
  icon = undefined,
  title='', 
  background='rgb(0, 0, 122)',
}:toastInterface) => {

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    background: background,
    color: "white",
    iconColor: "white",
    
    width: "auto",
    showConfirmButton: false,
    timer: 3000,

    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: icon,
    title: title
  })
}