import React, {useContext, useState} from "react";
import Aside from "../../common/components/Aside";
import ChartContainer from "./ChartContainer";
import Layout from "../../common/components/Layout";
import Main from "../../common/components/Main";
import SummaryContainer from "./SummaryContainer";
import Select from '../../common/components/Select';
import DataContext from '../../context/DataContextProvider';

export default function DashboardShell () {

  const [selectedLabel, setSelectedLabel] = useState(''),
    { setDataLocation } = useContext(DataContext);

  function handleSelectChange(event) {
    const selectedLabel = event.target.selectedOptions[0].text;
    setSelectedLabel(selectedLabel);

    const endpoint = event.target.selectedOptions[0].value;
    setDataLocation(endpoint);
  }

  const optionsForSelect = [
    { label: "Sales", value: `${process.env.REACT_APP_BASE_URL}/sales/` },
    {
      label: "Subscriptions",
      value: `${process.env.REACT_APP_BASE_URL}/subscriptions/`
    }
  ];

  return (
    <Layout>
      <Aside>
        <h2># Polly dashboard</h2>
        <Select id="select-chart"
                label="Please, select a chart"
                options={optionsForSelect}
                onChange={handleSelectChange}
        />
      </Aside>
      <Main>
        <h1>
          Welcome, <span className="bold">learner!</span>
        </h1>
        <SummaryContainer />
        <ChartContainer selectedLabel={selectedLabel} />
      </Main>
    </Layout>
  );
}
