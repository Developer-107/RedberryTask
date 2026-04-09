"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface EnrolledCoursesContextType {
  isEnrolledCoursesOpen: boolean;
  openEnrolledCourses: () => void;
  closeEnrolledCourses: () => void;
  setEnrolledCoursesOpen: (value: boolean) => void;
}

const EnrolledCoursesContext = createContext<EnrolledCoursesContextType | undefined>(undefined);

export const EnrolledCoursesProvider = ({ children }: { children: ReactNode }) => {
  const [isEnrolledCoursesOpen, setIsEnrolledCoursesOpen] = useState(false);

  const openEnrolledCourses = () => setIsEnrolledCoursesOpen(true);
  const closeEnrolledCourses = () => setIsEnrolledCoursesOpen(false);
  const setEnrolledCoursesOpen = (value: boolean) => setIsEnrolledCoursesOpen(value);

  return (
    <EnrolledCoursesContext.Provider value={{ isEnrolledCoursesOpen, openEnrolledCourses, closeEnrolledCourses, setEnrolledCoursesOpen }}>
      {children}
    </EnrolledCoursesContext.Provider>
  );
};

export const useEnrolledCourses = () => {
  const context = useContext(EnrolledCoursesContext);
  if (!context) throw new Error("useEnrolledCourses must be used within EnrolledCoursesProvider");
  return context;
};