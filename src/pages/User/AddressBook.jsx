import { useForm } from "react-hook-form";

const AddressBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleAddAddress = (data) => console.log(data);
  return (
    <div className=" w-[95%] mx-auto">
      <p className="text-sm mb-6 ">Add New Delivery Address</p>

      <form onSubmit={handleSubmit(handleAddAddress)} className="space-y-5">
        <div className="md:flex justify-between gap-8 items-center space-y-6 md:space-y-0">
          <div className="flex-1 relative">
            <label className="text-xs mb-1 block">Full Name</label>
            <input
              placeholder="Input full Name"
              {...register("firstName", { required: true })}
              className="block border focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm"
            />

            {errors.firstName && (
              <p className="text-primary text-xs absolute">
                You can not leave this empty.
              </p>
            )}
          </div>
          <div className="flex-1 relative">
            <label className="text-xs mb-1 block">Address</label>
            <input
              placeholder="House no. / building / street / area"
              {...register("address", { required: true })}
              className="block border focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm"
            />

            {errors.address && (
              <p className="text-primary text-xs absolute">
                You can not leave this empty.
              </p>
            )}
          </div>
        </div>
        <div className="md:flex space-y-6 md:space-y-0 justify-between gap-8 items-center ">
          <div className="flex-1 relative">
            <label className="text-xs mb-1 block">Mobile Number</label>
            <input
              placeholder="Input mobile number"
              {...register("mobileNumber", { required: true })}
              className="block border focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm"
            />

            {errors.mobileNumber && (
              <p className="text-primary text-xs absolute">
                You can not leave this empty.
              </p>
            )}
          </div>
          <div className="flex-1 ">
            <label className="text-xs mb-1 block">Landmark(Optional)</label>
            <input
              placeholder="E.g. beside train station"
              {...register("landmark", { required: true })}
              className="block border focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm"
            />
          </div>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default AddressBook;
