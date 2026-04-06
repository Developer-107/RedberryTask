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
