export const formatBoardExpectation = (value: string): string => {
  const map: Record<string, string> = {
    Title: "Title Challenge",
    Top4: "Top 4",
    MidTable: "Mid Table",
    Survival: "Avoid Relegation",
  };

  return map[value] ?? value;
};