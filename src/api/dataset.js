export const getEngDatasetJSON = async () => {
  return await fetch(`https://resource.data.one.gov.hk/ogcio/open-data-list/open-data-dataset-list-en.json`).then((res) => res.json());
};

export const getChiDatasetJSON = async () => {
  return await fetch(`https://resource.data.one.gov.hk/ogcio/open-data-list/open-data-dataset-list-zh-hant.json`).then((res) => res.json());
};
