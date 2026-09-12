export const formatBoardExpectation = (value) => {
  const map = {
    Title: "Title Challenge",
    Top4: "Top 4",
    MidTable: "Mid Table",
    Survival: "Avoid Relegation",
  };

  return map[value] ?? value;
};