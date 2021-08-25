import { useState } from "react";

import { BiPlus } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

const AccordianItem = ({ header, body }) => {
  const [bodyDisplay, setBodyDisplay] = useState(false);

  const handleBodyDisplay = () => {
    setBodyDisplay((prevValue) => !prevValue);
  };

  return (
    <li className="accordian__list--item">
      <button className="accordian__list--ques" onClick={handleBodyDisplay}>
        <span> {header} </span>
        {!bodyDisplay && <BiPlus className="accordian__icon" />}
        {bodyDisplay && <IoMdClose className="accordian__icon" />}
      </button>
      {bodyDisplay && (
        <div className="accordian__list--answ">
          <span>{body}</span>
        </div>
      )}
    </li>
  );
};

export default AccordianItem;
