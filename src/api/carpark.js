export const getCarParkInfo = async () => {
  return await fetch(`https://resource.data.one.gov.hk/td/carpark/basic_info_all.json`).then(
    (res) => res.json()
  );
};

export const getCarParkSlot = async () => {
  return await fetch(`https://resource.data.one.gov.hk/td/carpark/vacancy_all.json`).then(
    (res) => res.json()
  );
};

export const getCarParkIntegrated = async (data, vehicleTypes, carparkIds, extent, lang) => {
  return await fetch(
    `https://api.data.gov.hk/v1/carpark-info-vacancy?data=${data}&vehicleTypes=${vehicleTypes}&carparkIds=${carparkIds}&extent=${extent}&lang=${lang}`
  ).then((res) => res.json());
};
