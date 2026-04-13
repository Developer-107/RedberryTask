import { DateTime } from "next-auth/providers/kakao";

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  durationWeeks: number;
  isFeatured: boolean;
  avgRating: number;
  reviewCount: number;
  category: {
    id: number;
    name: string;
    icon: string;
  };
  topic: {
    id: 0;
    name: string;
    categoryId: 0;
  };
  instructor: {
    id: 0;
    name: string;
    avatar: string;
  };
}

export interface CourseInProgress {
  id: number;
  quantity: number;
  totalPrice: number;
  progress: number;
  completedAt: Date;
  course: Course;
  schedule: {
    weeklySchedule: {
      id: number;
      label: string;
      days: [string, string];
    };
    timeSlot: {
      id: number;
      label: string;
      startTime: string;
      endTime: string;
    };
    sessionType: {
      id: number;
      courseScheduleId: number;
      name: string;
      priceModifier: number;
      availableSeats: number;
      location: string;
    };
    location: string;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  fullName: string;
  mobileNumber: string;
  age: number;
  profileComplete: boolean;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Topic {
  id: number;
  categoryId: number;
  name: string;
}

export interface Instructor {
  id: number;
  name: string;
  avatar: string;
}

export interface MetaData {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface CourseById {
  id: number;
  title: string;
  description: string;
  image: string;
  basePrice: number;
  durationWeeks: number;
  hours: string;
  isFeatured: boolean;
  reviews: [
    {
      userId: number;
      rating: number;
    },
  ];
  isRated: boolean;
  category: {
    id: number;
    name: string;
    icon: string;
  };
  topic: {
    id: number;
    name: string;
    categoryId: number;
  };
  instructor: {
    id: number;
    name: string;
    avatar: string;
  };
  enrollment: {
    id: number;
    quantity: number;
    totalPrice: number;
    progress: number;
    completedAt: DateTime;
    course: {
      id: number;
      title: string;
      description: string;
      image: string;
      basePrice: number;
      durationWeeks: number;
      isFeatured: boolean;
      avgRating: number;
      reviewCount: number;
      category: {
        id: number;
        name: string;
        icon: string;
      };
      topic: {
        id: number;
        name: string;
        categoryId: number;
      };
      instructor: {
        id: number;
        name: string;
        avatar: string;
      };
    };
    schedule: {
      weeklySchedule: {
        id: number;
        label: string;
        days: [string, string];
      };
      timeSlot: {
        id: number;
        label: string;
        startTime: string;
        endTime: string;
      };
      sessionType: {
        id: number;
        courseScheduleId: number;
        name: string;
        priceModifier: number;
        availableSeats: number;
        location: string;
      };
      location: string;
    };
  };
}

export interface conflictData {
  schedule?: string;
  conflictingCourseName: string;
}

export interface WeeklySchedule {
  id: number;
  label: string;
  days: [string, string];
}

export interface TimeSlot {
  id: number;
  label: string;
  startTime: string;
  endTime: string;
}

export interface SessionType {
  id: number;
  courseScheduleId: number;
  name: string;
  priceModifier: number;
  availableSeats: number;
  location: string;
}

export type Filters = {
  categories: number[];
  topics: number[];
  instructors: number[];
};
