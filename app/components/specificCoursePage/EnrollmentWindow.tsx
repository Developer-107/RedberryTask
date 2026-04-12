import { CourseById } from '@/types/globalTypes'
import EnrolledWindow from './EnrolledWindow';
import CompletedRetakeWindow from './CompletedRetakeWindow';
import { Session } from 'next-auth';

interface Props {
    course?: CourseById,
    session?: Session,
}

export default function EnrollmentWindow( { course, session } : Props ) {


  return (
    <div className='mt-21 pl-33.25 col-span-2'>

      {/* Enrolled */}
      { course?.enrollment && ( course?.enrollment?.completedAt ? <CompletedRetakeWindow courseInProgress={course} session={session ? session : undefined} /> : <EnrolledWindow courseInProgress={course} session={session ? session : undefined}/>) }

    </div>
  )
}
