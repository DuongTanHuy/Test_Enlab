import Radio from "./radio/Radio";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const schema = yup.object({
  answer: yup.string().required(),
});

const Quiz = ({
  count,
  question,
  setCount,
  result,
  setResult,
  startTime,
  setStartTime,
  setStart,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { answer: "" },
    resolver: yupResolver(schema),
  });

  const [show, setShow] = useState(false);
  const [time, setTime] = useState(0);

  const onNext = (values) => {
    if (!isValid) return;
    if (values?.answer === question?.correct) setResult(result + 1);
    setCount(count + 1);
    var radio = document.querySelector(`input[name="answer"]:checked`);
    if (radio) {
      radio.checked = false;
    }
    reset();
  };

  const onSubmit = (values) => {
    if (!isValid) return;
    if (values?.answer === question?.correct) setResult(result + 1);
    var radio = document.querySelector(`input[name="answer"]:checked`);
    if (radio) {
      radio.checked = false;
    }
    setTime(
      Math.floor(((new Date().getTime() - startTime?.getTime()) / 1000) % 60)
    );
    reset();
    setShow(true);
  };

  return (
    <div className="quiz-form absolute w-full h-full flex flex-col gap-6 justify-between items-center p-6">
      <div
        className={`fixed flex flex-col text-center  justify-around items-center p-6 top-0 left-0 right-0 bottom-0 bg-white ${
          show ? "" : "scale-0"
        } transition-all bg-5xl-gradient`}
      >
        <div
          className={`w-40 h-40 shadow-lg rounded-full p-6 ${
            result >= 3 ? "bg-yellow-300" : "bg-green-300"
          }`}
        >
          {result >= 3 ? (
            <img
              src="./party-popper.png"
              alt="finish-icon"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <img
              src="./checked.png"
              alt="finish-icon"
              className="w-full h-full object-cover object-center"
            />
          )}
        </div>
        <h2 className="font-bold text-4xl">
          {result >= 3 ? "Congratulations!" : "Completed!"}
        </h2>
        <p className="font-semibold text-2xl">
          {result >= 3 ? "You are amazing!" : "Better luck next time!"}
        </p>
        <p className="font-semibold text-2xl">
          {result}/5 correct answers in {time} seconds
        </p>
        <button
          onClick={() => {
            setCount(0);
            setShow(false);
            setResult(0);
            setStartTime(new Date());
            setStart(false);
          }}
          className="w-[20%] h-[9%] bg-orange-500 rounded-full shadow-lg font-semibold text-white hover:shadow-none hover:scale-95 transition-all"
        >
          Play again
        </button>
      </div>
      <header className="font-bold text-2xl text-white">
        Question {count + 1}/5
      </header>
      <div className="text-xl text-white select-none">
        <span className="font-semibold">Question {count + 1}:</span>{" "}
        {question?.question}
      </div>
      <form
        onSubmit={handleSubmit(count <= 3 ? onNext : onSubmit)}
        className="w-full h-full flex flex-wrap gap-6 justify-around items-center mt-10"
      >
        <Radio
          name="answer"
          control={control}
          value="a"
          content={question?.a}
        ></Radio>
        <Radio
          name="answer"
          control={control}
          value="b"
          content={question?.b}
        ></Radio>
        <Radio
          name="answer"
          control={control}
          value="c"
          content={question?.c}
        ></Radio>
        <Radio
          name="answer"
          control={control}
          value="d"
          content={question?.d}
        ></Radio>
        <div className="foot w-full h-[40px] flex justify-between items-center sm:mr-[3%]">
          <label className="text-red-500">
            {errors?.answer?.message || ""}
          </label>
          <div className="btn flex gap-x-3">
            <button
              type="submit"
              className="w-[93px] hover:scale-95 select-none transition-all px-4 py-3 rounded-md bg-4xl-gradient font-semibold text-white"
            >
              {count >= 4 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Quiz;
