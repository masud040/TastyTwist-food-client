import { Input } from "@material-tailwind/react";

export default function SearchField() {
  return (
    <div>
      <p className="text-sm mb-1  font-bold">Seacrch</p>
      <Input color="indigo" label="Search by name" />
    </div>
  );
}
