export const getSurvey = async () => {
  const response = await fetch("/api/surveyEndPoint");
  const data = await response.json();
  return data;
};
