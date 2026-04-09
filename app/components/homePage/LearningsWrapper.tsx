'use client'

import { useSession } from "next-auth/react";
import ContinueLearning from "./ContinueLearning";
import StartLearningToday from "./StartLearningToday";

export default function LearningsWrapper() {
          const { data: session, status } = useSession();

  return (
    <div className={`flex ${session ? "flex-col-reverse" : "flex-col"}`}>
     <StartLearningToday />
     <ContinueLearning />
     </div>
  )
}
