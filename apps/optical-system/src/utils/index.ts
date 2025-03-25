import { format } from 'date-fns';

export const formatDateTime = (date: Date | string | undefined | null) => {
  if (!date) {
    return { date: '-', datetime: '-' };
  }
  const d = new Date(date);
  const datetime = format(new Date(d), 'dd/MM/yyyy HH:mm:ss');
  const onlyDate = format(new Date(d), 'dd/MM/yyyy');
  return { date: onlyDate, datetime: datetime };
};
