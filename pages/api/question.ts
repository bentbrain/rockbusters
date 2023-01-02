import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  hint: string,
  initials: string,
  answer: string,
}

const fetchQuestion = async () => {
    const res = await fetch(
      "https://qqo9n2ek.api.sanity.io/v2021-06-07/data/query/production?query=*%5B_type%20%3D%3D%20%22question%22%20%26%26%20used%20%3D%3D%20false%5D"
    );
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
  
    const questions = await res.json();
  
    const totalQuestions = questions.result.length;
  
    const selectedQuestion =
      questions.result[randomIntFromInterval(1, totalQuestions) - 1];
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
    const questionData = fetchQuestion()
    const question = await questionData
  res.status(200).json({ hint: question.hint, initials: question.initials, answer: question.answer })
}
