import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import duration from 'dayjs/plugin/duration';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(LocalizedFormat);
dayjs.extend(LocalizedFormat);
dayjs.extend(duration);

export const getRelativeDate = (
  date: string | Date | undefined,
  locale = 'ar'
): string => {
  return dayjs(date).locale(locale).toNow();
};

export const getFullDate = (
  date: string | Date | undefined,
  locale = 'ar'
): string | undefined => {
  if (!date) return '';

  return dayjs(date).locale(locale).format('LL');
};

export const getYear = (
  date: string | Date | undefined,
  locale = 'ar'
): string | undefined => {
  if (!date) return '';

  return dayjs(date).locale(locale).format('YYYY');
};

export const getCurrentYear = (): string | undefined => {
  return dayjs().locale('ar').format('YYYY');
};

export const getCurrentMonth = (): number => {
  return Number(dayjs().locale('ar').format('M'));
};
export const getMonthName = (monthNumber: number): string => {
  return dayjs(`2022-${monthNumber}-01`).locale('ar').format('MMMM');
};

export const getDuration = (seconds = 0) => {
  const format = seconds > 3600 ? 'HH:mm:ss' : 'mm:ss';
  return dayjs.duration(seconds, 'seconds').locale('ar').format(format);
};
