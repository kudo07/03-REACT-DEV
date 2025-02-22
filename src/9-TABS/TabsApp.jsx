import React from 'react';
import TabsShow from './components/TabsShow';
import { tabsData } from './constants';

const TabsApp = () => {
  const handlerChanger = (index) => {
    console.log(index);
  };
  return (
    <div>
      <TabsShow dataTabs={tabsData} onChanger={handlerChanger} />
    </div>
  );
};

export default TabsApp;
