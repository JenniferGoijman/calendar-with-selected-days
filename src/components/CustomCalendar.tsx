import React from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Calendar as AntdCalendar } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import './CustomCalendar.css';

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

const CustomCalendar: React.FC = () => {
  const declinedDates = ['2025-07-02'];
  const delayedDates = ['2025-07-10'];
  const onTrackDates = ['2025-07-15', '2025-07-26'];
  const completedDates = ['2025-07-24'];

  const getStatus = (dateString: string) => {
    if (declinedDates.includes(dateString)) return 'declined';
    if (delayedDates.includes(dateString)) return 'delayed';
    if (onTrackDates.includes(dateString)) return 'onTrack';
    if (completedDates.includes(dateString))return 'completed';
    return null;
  }

  const dateCellRender = (date: Dayjs) => {
    const dateString = date.format('YYYY-MM-DD');
    const status = getStatus(dateString);

    if (!status) return null;

    return (
      <div className={`calendar-cell ${status}`} />
    );
  };

  const headerRender = ({ value, onChange }: {
    value: Dayjs,
    onChange: (date: Dayjs) => void,
  }) => {
    const monthName = value.format('MMMM YYYY');

    return (
      <div className='calendar-header'>
        <ArrowLeftOutlined
          onClick={() => onChange(value.subtract(1, 'month'))}
          className='arrow'
        />
        <p>{monthName}</p>
        <ArrowRightOutlined
          onClick={() => onChange(value.add(1, 'month'))}
          className='arrow'
        />
      </div>
    );
  };

  return (
    <div className='calendar-container'>
      <AntdCalendar
        fullscreen={false}
        onPanelChange={onPanelChange}
        cellRender={dateCellRender}
        headerRender={headerRender}
      />
    </div>
  );
};

export default CustomCalendar;