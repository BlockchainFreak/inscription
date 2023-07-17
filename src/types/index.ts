export type Section = {
    section: string;
    session: string;
    days: string;
    startTime: string;
    endTime: string;
    instructors: string[];
}

export type Course = {
    id: string;
    courseCode: string;
    courseTitle: string;
    creditHours: number;
    alias: string | null;
    sections: Section[];
}

export type TimeRange = [number, number]
export type DaySchedule = TimeRange[]
export type WeekSchedule = [DaySchedule, DaySchedule, DaySchedule, DaySchedule, DaySchedule, DaySchedule, DaySchedule]
