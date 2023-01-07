export const makeResultsString = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  guesses: string[],
  answer: string,
  maxGuesses: number,
  day: string
) => {
  e.currentTarget.innerText = "Copied";
  const answerPosition = guesses.indexOf(answer.toLowerCase());
  let resultString: string[] = [];

  if (answerPosition < 0)
    return `Rockbusters #${day}
    
    🙈 🟥 🟥 🟥 🟥 🟥
    https://rockbusters.lol/`;

  for (var i = 0; i < maxGuesses; i++) {
    if (resultString.includes("🟩")) {
      resultString.push("⬜️");
    } else {
      i == answerPosition ? resultString.push("🟩") : resultString.push("🟥");
    }
  }
  return `Rockbusters #${day}
    
🙊 ${resultString.join(" ")}
https://rockbusters.lol/`;
};
