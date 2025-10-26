import React, { createContext, useContext, useState } from 'react';

export type BookingFormData = {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  distance?: string;
  tripType?: 'one-way' | 'round-trip';
  returnDate?: string;
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
    distance: '',
    tripType: 'one-way',
    returnDate: '',
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
