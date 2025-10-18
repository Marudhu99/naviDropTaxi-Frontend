import React, { createContext, useContext, useState } from 'react';

export type BookingFormData = {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
};

const BookingFormContext = createContext<{
  data: BookingFormData;
  setData: React.Dispatch<React.SetStateAction<BookingFormData>>;
} | undefined>(undefined);

export const BookingFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<BookingFormData>({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
  });
  return (
    <BookingFormContext.Provider value={{ data, setData }}>
      {children}
    </BookingFormContext.Provider>
  );
};

export const useBookingForm = () => {
  const context = useContext(BookingFormContext);
  if (!context) throw new Error('useBookingForm must be used within BookingFormProvider');
  return context;
}
