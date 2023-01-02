import type { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";

const sanityToken = process.env.SANITY_TOKEN;

type Data = {
  hint: string;
  initials: string;
  answer: string;
  id: string;
};

type Question = {
  _createdAt: String;
  _id: String;
  _rev: String;
  _type: String;
  _updatedAt: String;
  answer: String;
  hint: String;
  initials: String;
  used: boolean;
};

const client = sanityClient({
  projectId: "qqo9n2ek", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  token: sanityToken,
  apiVersion: "2023-01-02",
  useCdn: true,
});

const resetQuestions = async () => {
  const res = await fetch(
    "https://qqo9n2ek.api.sanity.io/v2021-06-07/data/query/production?query=*%5B_type%20%3D%3D%20%22question%22%20%26%26%20used%20%3D%3D%20true%5D"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  const questions = data.result;

  questions.forEach((question: any) => {
    client
      .patch(question._id)
      .set({ used: false })
      .commit()
      .then((question) => {
        console.log("Question set to unused:");
        console.log(question);
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });
  });
};

const markAsUsed = (id: string) => {
  client
    .patch(id)
    .set({ used: true })
    .commit()
    .then((question) => {
      console.log("Question set to used:");
      console.log(question);
    })
    .catch((err) => {
      console.error("Oh no, the update failed: ", err.message);
    });
};

const fetchQuestion = async (): Promise<any> => {
  const res = await fetch(
    "https://qqo9n2ek.api.sanity.io/v2021-06-07/data/query/production?query=*%5B_type%20%3D%3D%20%22question%22%20%26%26%20used%20%3D%3D%20false%5D"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const questions = await res.json();

  const totalQuestions = questions.result.length;

  if (totalQuestions == 1) {
    resetQuestions();
  }

  const selectedQuestion =
    questions.result[randomIntFromInterval(1, totalQuestions) - 1];

  markAsUsed(selectedQuestion._id);

  return selectedQuestion;
};

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const questionData = fetchQuestion();
  const question = await questionData;
  res.status(200).json({
    hint: question.hint,
    initials: question.initials,
    answer: question.answer,
    id: question._id,
  });
}
