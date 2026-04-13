"use client";

import { api } from "@/lib/api";
import {
  CourseById,
  SessionType,
  TimeSlot,
  WeeklySchedule,
  conflictData,
} from "@/types/globalTypes";
import { ArrowRightIcon, ChevronDownIcon } from "lucide-react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { sessionTypeInfos, timeSlotsNameIcon, weekdays } from "../Constants";
import Skeleton from "react-loading-skeleton";
import ConflictEnrollingWindow from "./ConflictEnrollingWindow";
import EnrollmentConfirm from "./EnrollementConfirm";
import SeatsNotAvailable from "./SeatsNotAvailable";
import AuthRequirementBox from "./AuthRequirementBox";

interface Props {
  course?: CourseById;
  session?: Session;
}

export default function EnrollWindow({ course, session }: Props) {
  const [isWeeklyScheduleWindowOpen, setIsWeeklyScheduleWindowOpen] =
    useState(false);
  const [isTimeSlotWindowOpen, setIsTimeSlotWindowOpen] = useState(false);
  const [isSessionTypeWindowOpen, setIsSessionTypeWindowOpen] = useState(false);

  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>([]);

  const [weeklyScheduleLoading, setWeeklyScheduleLoading] = useState(true);
  const [timeSlotLoading, setTimeSlotLoading] = useState(true);
  const [sessionTypesLoading, setSessionTypesLoading] = useState(true);

  const [chosenScheduleId, setChosenScheduleId] = useState<
    number | undefined
  >();
  const [chosenTimeSlotId, setChosenTimeSlotId] = useState<
    number | undefined
  >();
  const [chosenSessionId, setChosenSessionId] = useState<number | undefined>();
  const [courseScheduleId, setCourseScheduleId] = useState<
    number | undefined
  >();

  const [conflictWindowOpen, setConflictWindowOpen] = useState(false);
  const [successfullyEnrolledWindowOpen, setSuccessfullyEnrolledWindowOpen] =
    useState(false);
  const [seatsNotAvailableWindowOpen, setSeatsNotAvailableWindowOpen] =
    useState(false);
  const [conflictData, setConflictData] = useState<conflictData>();

  //   Fetching Schedule
  useEffect(() => {
    const fetchWeeklySchedule = async () => {
      if (!course?.id) return;

      try {
        setWeeklyScheduleLoading(true);

        const res = await api.get(`/courses/${course?.id}/weekly-schedules`);

        setWeeklySchedule(res.data.data ?? []);
      } catch (err) {
        console.log(err);
      } finally {
        setWeeklyScheduleLoading(false);
      }
    };
    fetchWeeklySchedule();
  }, [course?.id]);

  //   Fetching Time Slots
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!course?.id || !chosenScheduleId) return;

      try {
        setTimeSlotLoading(true);

        const res = await api.get(`/courses/${course?.id}/time-slots`, {
          params: {
            weekly_schedule_id: chosenScheduleId,
          },
        });

        setTimeSlots(res.data.data ?? []);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeSlotLoading(false);
      }
    };
    fetchTimeSlots();
  }, [chosenScheduleId]);

  //   Fetching Session
  useEffect(() => {
    const fetchSessionTypes = async () => {
      if (!course?.id || !chosenScheduleId || !chosenTimeSlotId) return;

      try {
        setSessionTypesLoading(true);

        const res = await api.get(`/courses/${course?.id}/session-types`, {
          params: {
            weekly_schedule_id: chosenScheduleId,
            time_slot_id: chosenTimeSlotId,
          },
        });
        setSessionTypes(res.data.data ?? []);
      } catch (err) {
        console.log(err);
      } finally {
        setSessionTypesLoading(false);
      }
    };
    fetchSessionTypes();
  }, [chosenScheduleId, chosenTimeSlotId]);

  const enroll = async () => {
    try {
      if (!course || !session) return;

      await api.post(
        `/enrollments`,
        {
          courseId: course?.id,
          courseScheduleId,
          force: false,
        },
        {
          headers: {
            Authorization: `Bearer ${(session as any).accessToken}`,
          },
        },
      );

      setSuccessfullyEnrolledWindowOpen(true);
    } catch (err: any) {
      if (err.response?.status === 409) {
        if (
          err.response.data.message === "No seats available for this schedule."
        ) {
          setSeatsNotAvailableWindowOpen(true);
        } else {
          const conflicts = err.response.data.conflicts;

          setConflictData(conflicts[0]);
          setConflictWindowOpen(true);
        }
      } else {
        console.log(err);
      }
    }
  };

  const courseBasePrice = Math.round(course?.basePrice || 0);
  const chosenSessionAdditionalPrice = Math.round(
    sessionTypes.find((sessionType) => sessionType.id === chosenSessionId)
      ?.priceModifier || 0,
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-8">
        {/* Weekly Schedule */}
        <div className="flex flex-col">
          <div
            onClick={() =>
              setIsWeeklyScheduleWindowOpen(!isWeeklyScheduleWindowOpen)
            }
            className={`flex gap-2 items-center font-medium hover:opacity-80 ${isWeeklyScheduleWindowOpen ? "text-[#0A0836]" : chosenScheduleId ? "text-[#0A0836]" : "text-gray-400"} cursor-pointer`}
          >
            <div
              className={`flex items-center justify-center border rounded-full p-px px-2 text-[14px] ${chosenScheduleId && "border-[#0A0836] bg-[#0A0836] text-white"}`}
            >
              1
            </div>
            <div className="text-[24px]">Weekly Schedule</div>
            <ChevronDownIcon
              className={`ml-auto transition duration-300 ${isWeeklyScheduleWindowOpen ? "" : "rotate-180"}`}
            />
          </div>

          <div
            className={`overflow-hidden transition-all duration-300  ${
              isWeeklyScheduleWindowOpen
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex gap-3 py-2 pt-5">
              {weeklyScheduleLoading
                ? [...Array(4)].map((_, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center h-22.75 px-4 w-full font-medium rounded-xl border bg-white border-gray-200"
                    >
                      <Skeleton className="h-5! w-17!" />
                    </div>
                  ))
                : weeklySchedule.map((schedule) => (
                    <div
                      onClick={() => {
                        setChosenScheduleId(schedule.id);
                        setChosenTimeSlotId(undefined);
                        setIsWeeklyScheduleWindowOpen(false);
                        setIsTimeSlotWindowOpen(true);
                        setIsSessionTypeWindowOpen(false);
                        setChosenSessionId(undefined);
                      }}
                      key={schedule?.id}
                      className={`flex items-center justify-center h-22.75 px-4 w-full font-medium rounded-xl border text-gray-800 cursor-pointer hover:bg-[#EEEDFC] hover:border-[#DDDBFA] hover:text-[#958FEF] ${chosenScheduleId === schedule.id ? "bg-[#DDDBFA] border-[#958FEF] text-[#4F46E5]!" : "bg-white border-gray-200"} `}
                    >
                      {schedule?.label === "Weekend Only"
                        ? "Weekend"
                        : `${weekdays.find((day) => day.name === schedule?.days?.[0])?.shortName} - ${
                            weekdays.find(
                              (day) => day.name === schedule?.days?.[1],
                            )?.shortName
                          }`}
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Time Slot */}
        <div className="flex flex-col">
          <button
            onClick={() => setIsTimeSlotWindowOpen(!isTimeSlotWindowOpen)}
            disabled={!chosenScheduleId}
            className={`flex gap-2 items-center font-medium not-disabled:hover:opacity-80 ${isTimeSlotWindowOpen ? "text-[#0A0836]" : chosenTimeSlotId ? "text-[#0A0836]" : "text-gray-400"} cursor-pointer`}
          >
            <div
              className={`flex items-center justify-center border rounded-full p-px px-2 text-[14px] ${chosenTimeSlotId && "border-[#0A0836] bg-[#0A0836] text-white"}`}
            >
              2
            </div>
            <div className="text-[24px]">Time Slot</div>
            <ChevronDownIcon
              className={`ml-auto transition duration-300 ${isTimeSlotWindowOpen ? "" : "rotate-180"}`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300  ${
              isTimeSlotWindowOpen
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex gap-3 py-2 pt-5">
              {timeSlotLoading
                ? [...Array(3)].map((_, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center h-17.75 px-4 w-full font-medium rounded-xl border bg-white border-gray-200"
                    >
                      <Skeleton className="h-7! w-19!" />
                    </div>
                  ))
                : timeSlots.map((timeSlot) => (
                    <div
                      onClick={() => {
                        setChosenTimeSlotId(timeSlot.id);
                        setIsTimeSlotWindowOpen(false);
                        setIsSessionTypeWindowOpen(true);
                        setChosenSessionId(undefined);
                      }}
                      key={timeSlot?.id}
                      className={`flex items-center justify-center h-17.75 px-4 w-full font-medium rounded-xl border  text-gray-800 cursor-pointer hover:bg-[#EEEDFC] hover:border-[#DDDBFA] hover:text-[#958FEF] ${chosenTimeSlotId === timeSlot.id ? "bg-[#DDDBFA] border-[#958FEF] text-[#4F46E5]!" : "bg-white border-gray-200"} `}
                    >
                      <div className="flex gap-3 items-center">
                        {
                          timeSlotsNameIcon.find(
                            (ts) => ts.name === timeSlot?.label?.split(" (")[0],
                          )?.icon
                        }

                        <div className="flex flex-col gap-0.5">
                          <p className="text-sm">
                            {timeSlot?.label?.split(" (")[0]}
                          </p>
                          <p className="text-[10px]">
                            {timeSlot?.label?.split(" (")[1].split(")")[0]}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Session Type */}
        <div className="flex flex-col">
          <button
            onClick={() => setIsSessionTypeWindowOpen(!isSessionTypeWindowOpen)}
            disabled={!chosenTimeSlotId}
            className={`flex gap-2 items-center font-medium not-disabled:hover:opacity-80 ${isSessionTypeWindowOpen ? "text-[#0A0836]" : chosenSessionId ? "text-[#0A0836]" : "text-gray-400"} cursor-pointer`}
          >
            <div
              className={`flex items-center justify-center border rounded-full p-px px-2 text-[14px] ${chosenSessionId && "border-[#0A0836] bg-[#0A0836] text-white"}`}
            >
              3
            </div>
            <div className="text-[24px]">Session Type</div>
            <ChevronDownIcon
              className={`ml-auto transition duration-300 ${isSessionTypeWindowOpen ? "" : "rotate-180"}`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300  ${
              isSessionTypeWindowOpen
                ? "max-h-55 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex gap-3 py-2 pt-5">
              {sessionTypesLoading
                ? [...Array(3)].map((_, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center h-42.75 px-4 w-full font-medium rounded-xl border bg-white border-gray-200"
                    >
                      <Skeleton className="h-25! w-25!" />
                    </div>
                  ))
                : sessionTypes.map((sessionType) => {
                    const sessionTypeInfo = sessionTypeInfos.find(
                      (st) => st.name === sessionType.name,
                    );

                    return (
                      <div
                        key={sessionType?.id}
                        className="flex flex-col items-center w-full gap-2"
                      >
                        <button
                          onClick={() => {
                            setChosenSessionId(sessionType.id);
                            setCourseScheduleId(sessionType.courseScheduleId);
                            setIsSessionTypeWindowOpen(false);
                          }}
                          disabled={sessionType?.availableSeats === 0}
                          className={`flex items-center justify-center h-42.75 px-4 w-full font-medium rounded-xl border  text-gray-800 not-disabled:cursor-pointer not-disabled:hover:bg-[#EEEDFC] not-disabled:hover:border-[#DDDBFA] not-disabled:hover:text-[#958FEF] ${chosenSessionId === sessionType.id ? "not-disabled:bg-[#DDDBFA] not-disabled:border-[#958FEF] not-disabled:text-[#4F46E5]!" : "bg-white border-gray-200"} `}
                        >
                          <div className="flex flex-col gap-1.5 items-center">
                            {sessionTypeInfo?.icon}
                            <p className="font-medium">
                              {sessionTypeInfo?.label}
                            </p>
                            <div className="text-12 font-normal">
                              {sessionTypeInfo?.name === "online" ? (
                                sessionType.location
                              ) : (
                                <div className="flex items-center gap-2">
                                  {sessionTypeInfo?.locIcon}
                                  {sessionType?.location}
                                </div>
                              )}
                            </div>

                            <div className="text-[#736BEA]">
                              {sessionType.priceModifier === 0
                                ? "Included"
                                : `+ $    ${Math.round(sessionType?.priceModifier)}`}
                            </div>
                          </div>
                        </button>
                        <div className="text-xs  font-medium">
                          {sessionType?.availableSeats === 0 ? (
                            <div className="flex gap-1 text-[#750000]">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.8 11.7557L9.33437 2.26379C9.19779 2.03124 9.00281 1.83843 8.76875 1.70445C8.53469 1.57048 8.26969 1.5 8 1.5C7.73031 1.5 7.4653 1.57048 7.23124 1.70445C6.99719 1.83843 6.8022 2.03124 6.66562 2.26379L1.2 11.7557C1.06858 11.9806 0.999329 12.2364 0.999329 12.4969C0.999329 12.7574 1.06858 13.0132 1.2 13.2382C1.33483 13.4721 1.52948 13.666 1.76397 13.7999C1.99847 13.9338 2.26436 14.0028 2.53437 14H13.4656C13.7354 14.0026 14.0011 13.9334 14.2353 13.7996C14.4696 13.6657 14.664 13.4719 14.7987 13.2382C14.9304 13.0134 14.9998 12.7576 15 12.4971C15.0003 12.2366 14.9312 11.9807 14.8 11.7557ZM13.9331 12.7375C13.8855 12.8188 13.8171 12.886 13.7349 12.9321C13.6528 12.9782 13.5598 13.0017 13.4656 13H2.53437C2.44017 13.0017 2.34723 12.9782 2.26508 12.9321C2.18293 12.886 2.11452 12.8188 2.06687 12.7375C2.02371 12.6645 2.00095 12.5812 2.00095 12.4963C2.00095 12.4114 2.02371 12.3281 2.06687 12.255L7.5325 2.76317C7.58111 2.68227 7.64983 2.61534 7.73197 2.56887C7.81411 2.5224 7.90688 2.49797 8.00125 2.49797C8.09562 2.49797 8.18839 2.5224 8.27053 2.56887C8.35267 2.61534 8.42139 2.68227 8.47 2.76317L13.9356 12.255C13.9784 12.3283 14.0007 12.4118 14.0003 12.4966C13.9999 12.5815 13.9767 12.6647 13.9331 12.7375ZM7.5 9.00004V6.50004C7.5 6.36743 7.55268 6.24026 7.64645 6.14649C7.74021 6.05272 7.86739 6.00004 8 6.00004C8.13261 6.00004 8.25978 6.05272 8.35355 6.14649C8.44732 6.24026 8.5 6.36743 8.5 6.50004V9.00004C8.5 9.13265 8.44732 9.25983 8.35355 9.35359C8.25978 9.44736 8.13261 9.50004 8 9.50004C7.86739 9.50004 7.74021 9.44736 7.64645 9.35359C7.55268 9.25983 7.5 9.13265 7.5 9.00004ZM8.75 11.25C8.75 11.3984 8.70601 11.5434 8.6236 11.6667C8.54119 11.7901 8.42406 11.8862 8.28701 11.943C8.14997 11.9997 7.99917 12.0146 7.85368 11.9856C7.7082 11.9567 7.57456 11.8853 7.46967 11.7804C7.36478 11.6755 7.29335 11.5418 7.26441 11.3964C7.23547 11.2509 7.25032 11.1001 7.30709 10.963C7.36385 10.826 7.45998 10.7088 7.58332 10.6264C7.70666 10.544 7.85166 10.5 8 10.5C8.19891 10.5 8.38968 10.5791 8.53033 10.7197C8.67098 10.8604 8.75 11.0511 8.75 11.25Z"
                                  fill="#750000"
                                />
                              </svg>

                              <p> Fully Booked </p>
                            </div>
                          ) : sessionType?.availableSeats < 5 ? (
                            <div className="flex gap-1 text-[#F4A316]">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.8 11.7557L9.33437 2.26379C9.19779 2.03124 9.00281 1.83843 8.76875 1.70445C8.53469 1.57048 8.26969 1.5 8 1.5C7.73031 1.5 7.4653 1.57048 7.23124 1.70445C6.99719 1.83843 6.8022 2.03124 6.66562 2.26379L1.2 11.7557C1.06858 11.9806 0.999329 12.2364 0.999329 12.4969C0.999329 12.7574 1.06858 13.0132 1.2 13.2382C1.33483 13.4721 1.52948 13.666 1.76397 13.7999C1.99847 13.9338 2.26436 14.0028 2.53437 14H13.4656C13.7354 14.0026 14.0011 13.9334 14.2353 13.7996C14.4696 13.6657 14.664 13.4719 14.7987 13.2382C14.9304 13.0134 14.9998 12.7576 15 12.4971C15.0003 12.2366 14.9312 11.9807 14.8 11.7557ZM13.9331 12.7375C13.8855 12.8188 13.8171 12.886 13.7349 12.9321C13.6528 12.9782 13.5598 13.0017 13.4656 13H2.53437C2.44017 13.0017 2.34723 12.9782 2.26508 12.9321C2.18293 12.886 2.11452 12.8188 2.06687 12.7375C2.02371 12.6645 2.00095 12.5812 2.00095 12.4963C2.00095 12.4114 2.02371 12.3281 2.06687 12.255L7.5325 2.76317C7.58111 2.68227 7.64983 2.61534 7.73197 2.56887C7.81411 2.5224 7.90688 2.49797 8.00125 2.49797C8.09562 2.49797 8.18839 2.5224 8.27053 2.56887C8.35267 2.61534 8.42139 2.68227 8.47 2.76317L13.9356 12.255C13.9784 12.3283 14.0007 12.4118 14.0003 12.4966C13.9999 12.5815 13.9767 12.6647 13.9331 12.7375ZM7.5 9.00004V6.50004C7.5 6.36743 7.55268 6.24026 7.64645 6.14649C7.74021 6.05272 7.86739 6.00004 8 6.00004C8.13261 6.00004 8.25978 6.05272 8.35355 6.14649C8.44732 6.24026 8.5 6.36743 8.5 6.50004V9.00004C8.5 9.13265 8.44732 9.25983 8.35355 9.35359C8.25978 9.44736 8.13261 9.50004 8 9.50004C7.86739 9.50004 7.74021 9.44736 7.64645 9.35359C7.55268 9.25983 7.5 9.13265 7.5 9.00004ZM8.75 11.25C8.75 11.3984 8.70601 11.5434 8.6236 11.6667C8.54119 11.7901 8.42406 11.8862 8.28701 11.943C8.14997 11.9997 7.99917 12.0146 7.85368 11.9856C7.7082 11.9567 7.57456 11.8853 7.46967 11.7804C7.36478 11.6755 7.29335 11.5418 7.26441 11.3964C7.23547 11.2509 7.25032 11.1001 7.30709 10.963C7.36385 10.826 7.45998 10.7088 7.58332 10.6264C7.70666 10.544 7.85166 10.5 8 10.5C8.19891 10.5 8.38968 10.5791 8.53033 10.7197C8.67098 10.8604 8.75 11.0511 8.75 11.25Z"
                                  fill="#F4A316"
                                />
                              </svg>

                              <p>
                                Only {sessionType?.availableSeats} are available
                              </p>
                            </div>
                          ) : (
                            `${sessionType?.availableSeats} Seats are available`
                          )}
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>

        {/* Total Price and Enroll Button */}
        <div className="flex items-center justify-center p-10 rounded-xl bg-white">
          <div className="flex flex-col gap-8 w-full text-gray-400">
            <div className="flex items-center justify-between font-medium">
              <p className="text-[20px]">Total Price</p>
              <p className="text-[32px] text-gray-800">
                ${courseBasePrice + chosenSessionAdditionalPrice}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p>Base Price</p>
                <p className="text-gray-800">+ ${courseBasePrice}</p>{" "}
              </div>
              <div className="flex items-center justify-between">
                <p>Session Price</p>
                <p className="text-gray-800">
                  + ${chosenSessionAdditionalPrice}
                </p>{" "}
              </div>
            </div>

            <button
              onClick={enroll}
              className="flex items-center justify-around p-4.25 rounded-lg bg-[#4F46E5] disabled:text-[#B7B3F4] disabled:bg-[#EEEDFC] text-white not-disabled:hover:opacity-80 w-full font-medium not-disabled:cursor-pointer text-[20px]"
              disabled={!chosenSessionId}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Authentication Required if* or Complete Your Profile */}
      {!session ? <AuthRequirementBox type="auth" /> : <AuthRequirementBox session={session} /> }
      

      {/* Conflict Modal */}
      {conflictWindowOpen && (
        <ConflictEnrollingWindow
          conflictedCourseTimeSchedule={conflictData?.schedule}
          conflictedCourseTitle={conflictData?.conflictingCourseName}
          conflictedWindowOpen={setConflictWindowOpen}
          successfullyEnrolledWindowOpen={setSuccessfullyEnrolledWindowOpen}
          session={session}
          courseScheduleId={courseScheduleId}
          courseInProgress={course}
        />
      )}

      {/* Successfully Enrolled Modal */}
      {successfullyEnrolledWindowOpen && (
        <EnrollmentConfirm courseTitle={course?.title} courseId={course?.id} />
      )}

      {/* No Seats Modal */}
      {seatsNotAvailableWindowOpen && (
        <SeatsNotAvailable
          seatsNotAvailableWindowOpen={setSeatsNotAvailableWindowOpen}
          courseTitle={course?.title}
        />
      )}
    </div>
  );
}
