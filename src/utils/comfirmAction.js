import Swal from "sweetalert2";

export default function comfirmAction(message, action) {
  return Swal.fire({
    title: message,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `Yes, ${action} it!`,
  }).then((result) => {
    if (result.isConfirmed) {
      return { confirm: true };
    }
    return { confirm: false };
  });
}
