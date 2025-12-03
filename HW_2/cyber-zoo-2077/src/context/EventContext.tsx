import React, { createContext, useState, ReactNode } from 'react';

interface EventContextType {
  events: string[];
  addEvent: (event: string) => void;
  clearEvents: () => void;
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (event: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEvents(prev => [`[${timestamp}] ${event}`, ...prev].slice(0, 50));
  };

  const clearEvents = () => {
    setEvents([]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent, clearEvents }}>
      {children}
    </EventContext.Provider>
  );
};