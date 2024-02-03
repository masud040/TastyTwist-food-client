import Swal from "sweetalert2";

export default function confirmEditRestaurant() {
  return Swal.fire({
    title: "Are you sure want to edit your Restaurant?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Edit it!",
  }).then((result) => {
    if (result.isConfirmed) {
      return { confirm: true };
    }
    return { confirm: false };
  });
}
