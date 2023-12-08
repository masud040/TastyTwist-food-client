import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { getAllFaqs } from "../../../utils/getAllFaqs";

const FaQ = () => {
  const [open, setOpen] = useState(1);

  const { data: faqs } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => await getAllFaqs(),
  });
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="mt-24 ">
      <h1 className="text-dark-gray font-semibold text-xl md:text-2xl mb-6 text-center  ">
        Need Help? Check Our FAQs
      </h1>
      {faqs?.map((faq, index) => (
        <Accordion key={index} open={open === faq.index}>
          <AccordionHeader
            className="text-lg md:text-xl"
            onClick={() => handleOpen(faq.index)}
          >
            {faq.question}
          </AccordionHeader>
          <AccordionBody>{faq.answer}</AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};

export default FaQ;
