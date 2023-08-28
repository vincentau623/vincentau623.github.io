
import { useEffect, useState } from 'react';
import { getEngDatasetJSON, getChiDatasetJSON } from '../../api/dataset';
import { groupBy } from 'lodash';

const Dataset = () => {
  const [engDataset, setEngDataset] = useState([]);
  const [chiDataset, setChiDataset] = useState([]);

  useEffect(() => {
    const init = async () => {
      const result_en = await getEngDatasetJSON();
      const result_zh = await getChiDatasetJSON();
      setEngDataset(Object.values(groupBy(result_en.Data, "Collection of Datasets")));
      setChiDataset(result_zh);
    };
    init();
  }, []);

  useEffect(() => {
    console.log(engDataset);
  }, [engDataset]);

  return (<div>Dataset</div>);
};

export default Dataset;