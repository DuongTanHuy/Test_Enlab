import { useController } from "react-hook-form";
import styled from "styled-components";

const RadioStyles = styled.label`
  cursor: pointer;
  width: 40%;
  @media (max-width: 760px) {
    width: 90%;
  }
  height: 50px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  :hover {
    opacity: 90%;
  }
  div {
    box-shadow: 0 0 0 8px #e8f0fe;
  }
  input:checked + div {
    color: white;
    background: #4ca1af;
    box-shadow: 0 0 0 2px white, 0 0 0 6px #4ca1af;
  }
`;

const Radio = ({ content, name, control, className, ...props }) => {
  const { field } = useController({
    name,
    control,
    value: "demo",
    defaultValue: "",
  });

  return (
    <RadioStyles>
      <input
        name={name}
        type="radio"
        className={`hidden w-full h-full ${className}`}
        {...field}
        {...props}
      ></input>
      <div className="w-full h-full rounded-sm bg-[#e8f0fe] transition-all flex justify-center items-center font- select-none font-semibold">
        {content}
      </div>
    </RadioStyles>
  );
};

export default Radio;
