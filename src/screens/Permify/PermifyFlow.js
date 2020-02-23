import React, { useReducer } from 'react';
import { Icon, Typography as T, Steps } from 'antd';

import { PermifyReducer, initialState } from './permify.reducer';
import { Boast } from './Boast';
import { FindByDOI } from './Find';
import { Permify } from './Permify';

export default function PermifyFlow() {
  const [state, dispatch] = useReducer(PermifyReducer, initialState)
  const { currentStep, isLoading, summary, permaID } = state

  const waitStatus = (step) => {
    return currentStep === step && isLoading
  }

  return (
    <Steps direction="vertical" current={currentStep}>
      <Steps.Step
        title={<T.Title level={4} className="marginless">Find a Paper</T.Title>}
        description={currentStep === 0 && <FindByDOI dispatch={dispatch} />}
        icon={waitStatus(0) && <Icon type="loading"/>}
      />
      <Steps.Step
        title={<T.Title level={4} className="marginless">Permify</T.Title>}
        description={currentStep === 1 && <Permify dispatch={dispatch} summary={summary} />}
        icon={waitStatus(1) && <Icon type="loading" />}
      />
      <Steps.Step
        title={<T.Title level={4} className="marginless">Boast</T.Title>}
        description={currentStep === 2 && <Boast dispatch={dispatch} summary={summary} permaID={permaID} />}
      />
    </Steps>
  )
}
