import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../store";
import { removeParam } from "../../../helpers/removeParams";
import useFetchAws from "../../../hooks/useFetchAws";
import axios from "axios";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

function WebinarForm({ onAddWebinar }) {
  const inputArr = [
    {
      language: "",
      videoUrl: "",
    },
  ];

  const [arr, setArr] = useState(inputArr);
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({});
  const [headingPoints, setHeadingPoints] = useState();
  const [loading, setLoading] = useState();

  const dispatch = useDispatch();
  const { setMessage } = bindActionCreators(actionCreators, dispatch);

  function handleSubmit(e) {
    e.preventDefault();

    const point = {
      point: {
        ...data.point,
        points: headingPoints,
      },
    };

    if (headingPoints) {
      Object.assign(data, point);
    }

    if (arr) {
      Object.assign(data, { languages: arr });
    }
console.log(data);
    onAddWebinar(data);
  }
  useEffect(()=>{
    console.log(headingPoints);
  },[headingPoints])
  const addInput = (e) => {
    e.preventDefault();
    setArr((s) => {
      return [
        ...s,
        {
          language: "",
          videoUrl: "",
        },
      ];
    });
  };

  const handleLanguage = (e) => {
    const { dataset, name, value } = e.target;

    let temp_Arr = [...arr];

    let temp_ele = { ...temp_Arr[dataset.id] };

    if (name === "videoUrl") {
      temp_ele.videoUrl = value;
    } else if (name === "language") {
      temp_ele.language = value;
    } else {
      return;
    }

    temp_Arr[dataset.id] = temp_ele;

    setArr(temp_Arr);
  };

  function handleLangDelete(e, index) {
    e.preventDefault();

    const newArr = [...arr];
    newArr.splice(index, 1);

    setArr(newArr);
  }

  function handleChange(e) {
    const { dataset, name, value, type, files } = e.target;

    if (type !== "file") {
      // Use a functional state update
      setData((datas) => ({
        ...datas,
        ...(dataset.id
          ? {
              // update the correct dataset id
              [dataset.id]: {
                // shallow copy existing dataset values
                ...datas[dataset.id],

                // if value is nested then update nested state value
                ...(dataset.nested
                  ? {
                      [dataset.nested]: {
                        // shallow copy existing nested values
                        ...datas[dataset.id]?.[dataset.nested],

                        // update nested field value
                        [name]: value,
                      },
                    }
                  : {
                      // update unnested field value
                      [name]: value,
                    }),
              },
            }
          : {
              // update unnested field value
              [name]: value,
            }),
      }));
    } else {
      // Use a functional state update
      setData((datas) => ({
        ...datas,
        ...(dataset.id
          ? {
              // update the correct dataset id
              [dataset.id]: {
                // shallow copy existing dataset values
                ...datas[dataset.id],

                // if value is nested then update nested state value
                ...(dataset.nested
                  ? {
                      [dataset.nested]: {
                        // shallow copy existing nested values
                        ...datas[dataset.id]?.[dataset.nested],

                        // update nested field value
                        [name]: files[0],
                      },
                    }
                  : {
                      // update unnested field value
                      [name]: files[0],
                    }),
              },
            }
          : {
              // update unnested field value
              [name]: files[0],
            }),
      }));
    }
  }

  async function handleImage(e) {
    const { dataset } = e.target;
    const file = e.target.files[0];

    const url = await useFetchAws(file, "webinar");

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);

        setLoading(percent);
      },
    };

    await axios
      .put(url, file, options)
      .then(({ config }) => {
        const alteredUrl = removeParam("Content-Type", config.url);
        // Use a functional state update
        setData((datas) => ({
          ...datas,
          ...(dataset.id
            ? {
                // update the correct dataset id
                [dataset.id]: {
                  // shallow copy existing dataset values
                  ...datas[dataset.id],

                  // if value is nested then update nested state value
                  ...(dataset.nested
                    ? {
                        [dataset.nested]: {
                          // shallow copy existing nested values
                          ...datas[dataset.id]?.[dataset.nested],

                          // update nested field value
                          [e.target.name]: alteredUrl,
                        },
                      }
                    : {
                        // update unnested field value
                        [e.target.name]: alteredUrl,
                      }),
                },
              }
            : {
                // update unnested field value
                [e.target.name]: alteredUrl,
              }),
        }));
        setMessage({ sc: "Uploaded successfully", er: "" });

        setTimeout(() => {
          setLoading(null);
          setMessage({ sc: "", er: "" });
        }, 2000);
      })
      .catch((err) => {
        setMessage({ sc: "", er: err.message });
        console.log(err.message);
      });

    setTimeout(() => {
      setMessage({ sc: "", er: "" });
    }, 5000);
  }

  function _next(e) {
    e.preventDefault();

    setCurrentStep((prevState) => prevState + 1);
  }

  function _prev(e) {
    e.preventDefault();

    setCurrentStep((prevState) => prevState - 1);
  }

  return (
    <form onSubmit={handleSubmit}>
      {loading > 0 ? (
        <div className="w-full h-full fixed flex items-center justify-center top-0 left-0 bg-white bg-opacity-90 z-50">
          <div className="percent">
            <svg>
              <circle cx="70" cy="70" r="70"></circle>
              <circle cx="70" cy="70" r="70"></circle>
            </svg>
            <div className="number">
              <h2>
                {loading}
                <span>%</span>
              </h2>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Step1
        handleChange={handleChange}
        handleImage={handleImage}
        setHeadingPoints={setHeadingPoints}
        headingPoints={headingPoints}
        currentStep={currentStep}
        data={data}
      />
      <Step2
        data={data}
        handleImage={handleImage}
        handleChange={handleChange}
        currentStep={currentStep}
      />
      <Step3
        handleChange={handleChange}
        currentStep={currentStep}
        data={data}
        arr={arr}
        addInput={addInput}
        handleLanguage={handleLanguage}
        handleLangDelete={handleLangDelete}
      />

      <div className="flex">
        {currentStep !== 1 && (
          <button onClick={_prev} className="userBtn py-3">
            Prev
          </button>
        )}
        {currentStep !== 3 && (
          <button onClick={_next} className="userBtn py-3 ml-auto">
            Next
          </button>
        )}

        {currentStep === 3 && (
          <button onClick={handleSubmit} className="userBtn py-3 ml-auto">
            Submit
          </button>
        )}
      </div>
    </form>
  );
}

export default WebinarForm;
