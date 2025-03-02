"use client";

import { Checkbox } from "@/_components/common/Checkbox";
import { Dog } from "@/_components/Icons/Dog";
import { SpeechBubble } from "@/_components/Icons/SpeechBubble";
import { useEffect, useState } from "react";

interface Task {
  checked: boolean;
  label: string;
  name: string;
}
interface TaskList {
  [key: string]: { allChecked: boolean; tasks: Task[] };
}

interface Props {
  params: { team: string };
}

export default function Content({ params }: Props) {
  const { team } = params;

  const [data, setData] = useState<TaskList>({});
  const [name, setName] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checklist?team=${team}`);
    const res = await response.json();
    delete res["TeamName"];
    const submittedBy = res["submittedBy"];
    if (submittedBy) {
      setName(submittedBy);
      setAlreadySubmitted(true);
    } else {
      setName("");
    }
    delete res["submittedBy"];
    const sortedData = Object.keys(res)
      .map((key) => {
        return { ...res[key], name: key };
      })
      .sort((a, b) => a.category.localeCompare(b.category));
    const formattedData: TaskList = sortedData.reduce((acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = {
          allChecked: true,
          tasks: [],
        };
      }
      acc[task.category].tasks.push(task);
      return acc;
    }, {});

    for (const key in formattedData) {
      if (formattedData[key].tasks.some((task) => task.checked === false)) {
        formattedData[key].allChecked = false;
      }
    }
    setData(formattedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (name?.length && Object.values(data).every((category) => category.allChecked)) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [data, name]);

  const handleCheck = (category: string, index: number) => {
    setData((prevState) => {
      const newState = { ...prevState };
      newState[category].tasks[index].checked = !newState[category].tasks[index].checked;
      newState[category].allChecked = newState[category].tasks.every((task) => task.checked);
      return newState;
    });
  };

  const handleSubmit = async () => {
    if (alreadySubmitted) return;
    const dataToSend = {
      submittedBy: name,
      data: Object.values(data).flatMap((category) => category.tasks),
      team,
    };
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checklist`, {
      method: "PUT",
      body: JSON.stringify(dataToSend),
    });
    fetchData();
  };

  const handleReset = async () => {
    const dataToSend = {
      submittedBy: name,
      data: Object.values(data).flatMap((category) => category.tasks),
      team,
    };
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset`, {
      method: "POST",
      body: JSON.stringify(dataToSend),
    });
    setAlreadySubmitted(false);
    fetchData();
  };
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <svg className="h-20 w-20 animate-spin" viewBox="0 0 800 800">
          <circle
            className=""
            cx="400"
            cy="400"
            fill="none"
            r="200"
            strokeWidth="50"
            stroke="gray"
            strokeDasharray="457 1400"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  const getSpeechBubbleText = () => {
    if (team === "hospitality") {
      return "What Lenny said";
    }
    if (team === "general") {
      return "See the need, sow the seed";
    }
    return "howdy";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-16 max-w-64 md:max-w-80 mx-auto">
      <h1 className="text-4xl font-bold mb-14 text-center w-full">Setup Checklist: {team}</h1>
      <div className="flex my-2">
        <Dog className="self-end" />
        <SpeechBubble text={getSpeechBubbleText()} className="transform -translate-y-16" />
      </div>
      <main className="flex flex-col gap-4">
        {Object.keys(data).map((category) => {
          return (
            <div
              className={`border rounded-lg p-4 ${
                data[category].allChecked ? "bg-green-100" : "animate-border-pulse"
              } `}
              key={category}
            >
              <h2 className="text-xl font-bold">{category}</h2>
              {data[category].tasks.map((task, index) => {
                return (
                  <Checkbox
                    disabled={alreadySubmitted}
                    key={task.name}
                    onClick={() => {
                      handleCheck(category, index);
                    }}
                    label={task.label}
                    checked={task.checked}
                  />
                );
              })}
            </div>
          );
        })}
        <div className="flex items-center gap-2">
          <label htmlFor="name">Name:</label>
          <input
            disabled={alreadySubmitted}
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            type="text"
            className="bg-blue-100 p-2 rounded-lg outline-none "
          />
        </div>
        <button
          disabled={submitDisabled}
          onClick={handleSubmit}
          className={`p-2 rounded-lg cursor-pointer ${
            submitDisabled || alreadySubmitted
              ? "opacity-50 bg-slate-200 text-black"
              : "bg-blue-500 text-white hover:bg-green-100 hover:text-black"
          }`}
        >
          Submit
        </button>
        <button
          onClick={handleReset}
          className="p-2 rounded-lg cursor-pointer bg-slate-200 text-black bg-rose-300 hover:bg-rose-600 hover:text-black"
        >
          Reset Checklist
        </button>
      </main>
      <div className="text-xs">
        Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed by CC BY 4.0
      </div>
    </div>
  );
}
