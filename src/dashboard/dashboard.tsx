
import * as React from 'react';
import { RouterProps } from 'react-router';
import { withProps } from '../compose';
import { DashboardView, Props } from './dashboardView';

const enhancer = (Component: React.ComponentType<Props>) => (props: RouterProps) => (
  withProps({
    handleReceive: () => {
      // tslint:disable-next-line:no-console
      console.log('submitting');
    },
    handleSend: () => {
      props.history.push('/send');
    },
    ongAmount: 1000.54,
    ontAmount: 2000
  }, (injectedProps) => (
    <Component {...injectedProps} />
  ))
)

export const Dashboard = enhancer(DashboardView);
