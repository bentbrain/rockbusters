import type { NextApiRequest, NextApiResponse } from "next";

const startDate = new Date("2023-01-02T14:00:00.000Z");
const currentDate = new Date();
const difference = getNumberOfDays(startDate, currentDate);

const calcDifference = (questions: any) => {
  const total = questions.length;
  if (difference >= total) {
    const amount = Math.floor(difference / total);
    var newDiff = difference - total * amount;
    return newDiff;
  } else {
    return difference;
  }
};

function getNumberOfDays(start: Date, end: Date) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}

type Data = {
  hint: string;
  initials: string;
  answer: string;
  id: string;
  day: string;
};

const fetchQuestions = async (): Promise<any> => {
  const res = await fetch(
    "https://qqo9n2ek.api.sanity.io/v2021-06-07/data/query/production?query=*%5B_type%20%3D%3D%20%22question%22%20%5D%20%20%7C%20order%28hint%20asc%29"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const questions = await res.json();

  return questions.result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const questionData = await fetchQuestions();
  const question = questionData[calcDifference(questionData)];
  res.status(200).json({
    hint: question.hint,
    initials: question.initials,
    answer: question.answer,
    id: question._id,
    day: difference.toString(),
  });
}
