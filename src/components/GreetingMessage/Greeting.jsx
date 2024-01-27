export default function Greeting({ message }) {
  return (
    <div className="flex justify-center items-center text-3xl font-semibold text-center text-primary h-[150px]">
      <h1>{message}</h1>
    </div>
  );
}
