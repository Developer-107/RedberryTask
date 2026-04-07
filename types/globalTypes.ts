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
