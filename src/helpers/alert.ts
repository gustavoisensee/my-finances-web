import { StateProps } from '@/components/shared/Toast';
import Observable from './observable';

export const obsAlert = new Observable();

export const openAlert = (state: StateProps) =>
  obsAlert.notify<StateProps>(state);