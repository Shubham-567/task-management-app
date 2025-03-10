import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css"; // Custom styles

type CalendarModalProps = {
  onSelectDate: (date: Date) => void;
  onClose: () => void;
};

const CalendarModal = ({ onSelectDate, onClose }: CalendarModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      onSelectDate(value);
      onClose();
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setSelectedDate(value[0]);
      onSelectDate(value[0]);
      onClose();
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
      <div className='rounded-lg shadow-lg'>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          next2Label={null}
          prev2Label={null}
        />
      </div>
    </div>
  );
};

export default CalendarModal;
