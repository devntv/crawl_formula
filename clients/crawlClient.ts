const getDataRaceClient = async () => {
  const response = await fetch("/api/raceResult");
  const data = await response.json();
  return data;
};

export default {
  getDataRaceClient,
};
