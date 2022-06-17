export const getMTRETA = async (line, station) => {
  return await fetch(
    `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${line}&sta=${station}`
  ).then((res) => res.json());
};
