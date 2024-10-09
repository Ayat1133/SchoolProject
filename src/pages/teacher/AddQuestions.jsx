import React, { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import classes from "../teacher/SendMessage.module.scss";
import {
  getUser,
  postMessage,
  postQuestion,
} from "../../store/slices/mainReducer";
const AddQuestion = () => {
  const dispatch = useDispatch();
  const { userData, addQuestionLoading } = useSelector((state) => state.main);
  const [disabled, setDisabled] = useState(true);
  const [departments, setDepartments] = useState(userData?.teacher_departments);
  const [success, setSuccess] = useState("");
  const [question, setQuestion] = useState({
    question_text: "",
    choice_1: "",
    choice_2: "",
    choice_3: "",
    choice_4: "",
    correct_choice: "",
    department: "",
  });
  const [answers, setAnswers] = useState([
    {
      id: 1,
      name: "Choice 1",
    },
    {
      id: 2,
      name: "Choice 2",
    },
    {
      id: 3,
      name: "Choice 3",
    },
    {
      id: 4,
      name: "Choice 4",
    },
  ]);

  const handleAddQuestion = () => {
    dispatch(postQuestion(question)).then((res) => {
      if (res?.payload?.id) {
        setSuccess("Question Added Successfully");
        setQuestion({
          question_text: "",
          choice_1: "",
          choice_2: "",
          choice_3: "",
          choice_4: "",
          correct_choice: "",
          department: "",
        });
      }
    });
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    if (
      question?.question_text &&
      question?.choice_1 &&
      question?.choice_2 &&
      question?.choice_3 &&
      question?.choice_4 &&
      question?.correct_choice &&
      question?.department
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [question]);

  useEffect(() => {
    dispatch(getUser()).then((res) => {
      setDepartments(res?.payload?.teacher_departments);
    });
  }, []);


  return (
    <section className={classes.container}>
      {success ? (
        <div className={classes.content}>
          <h3 className="center">Question Added successfully</h3>
        </div>
      ) : (
        <div className={classes.content}>
          <h3>Add Question</h3>
          <p>Select Topic</p>
          <select
            name="transportType"
            id="transportType"
            onChange={(e) =>
              setQuestion({ ...question, department: e.target.value })
            }
          >
            <option value="" disabled selected>
              Select Topic
            </option>
            {departments?.map((item) => (
              <option value={item?.id}>{item?.name}</option>
            ))}
          </select>
          <p>Question</p>
          <Input
            placeholder={"Question"}
            value={question?.question_text}
            onChange={(e) =>
              setQuestion({ ...question, question_text: e.target.value })
            }
            type="text"
          />

          <div style={{ display: "flex", gap: "1rem" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p>Choice 1</p>
              <Input
                placeholder={"Choice 1"}
                value={question?.choice_1}
                onChange={(e) =>
                  setQuestion({ ...question, choice_1: e.target.value })
                }
                type="text"
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p>Choice 2</p>
              <Input
                placeholder={"Choice 2"}
                value={question?.choice_2}
                onChange={(e) =>
                  setQuestion({ ...question, choice_2: e.target.value })
                }
                type="text"
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p>Choice 3</p>
              <Input
                placeholder={"Choice 3"}
                value={question?.choice_3}
                onChange={(e) =>
                  setQuestion({ ...question, choice_3: e.target.value })
                }
                type="text"
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p>Choice 4</p>

              <Input
                placeholder={"Choice 4"}
                value={question?.choice_4}
                onChange={(e) =>
                  setQuestion({ ...question, choice_4: e.target.value })
                }
                type="text"
              />
            </div>
          </div>
          <p>Correct Answer</p>
          <select
            name="transportType"
            id="transportType"
            onChange={(e) =>
                setQuestion({ ...question, correct_choice: e.target.value })
            }
          >
            <option value="" disabled selected>
              Select Correct Answer
            </option>
            {answers?.map((item) => (
              <option value={item?.id}>{item?.name}</option>
            ))}
          </select>

          <Button
            disabled={disabled}
            loading={addQuestionLoading}
            text={"Add Question"}
            onClick={handleAddQuestion}
          />
        </div>
      )}
    </section>
  );
};

export default AddQuestion;
