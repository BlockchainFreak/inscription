
import { ParseTime } from "@/lib";
import { Course } from "@/types";
import { Stack, HoverCard, Button, Center, Title, Text } from "@mantine/core";
import { usePagination } from "@mantine/hooks";

export default function CoursePreview({ course, height, sectionIdx }: { course: Course | undefined, sectionIdx: number, height: number }) {

    if (!course) return null
    if (!course.sections[sectionIdx]) return null

    const start = ParseTime(course.sections[sectionIdx].startTime)
    const end = ParseTime(course.sections[sectionIdx].endTime)
    const minHeight = height * (end - start) / 60
    console.log(minHeight)

    return (
        <HoverCard width={280} shadow="md">
            <HoverCard.Target>
                <div className="absolute w-full h-full z-50">
                    <Center style={{ minHeight }} className="rounded-md bg-gradient-to-tr from-emerald-500 from-10% via-emerald-700 via-30% to-emerald-900 to-90%">
                        <Text size={14}>{course.courseCode} - {course.sections[sectionIdx].section}</Text>
                    </Center>
                </div>
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <Stack spacing={1}>
                    <Title order={5}>{course.courseCode} - {course.sections[sectionIdx].section}</Title>
                    <Title order={6}>{course.courseTitle}</Title>
                    {course.sections[sectionIdx].instructors.map((instructor, index) => (
                        <Text key={index}>{instructor}</Text>
                    ))}
                    <Text>{course.sections[sectionIdx].startTime} - {course.sections[sectionIdx].endTime}</Text>
                    <Text>{course.sections[sectionIdx].days}</Text>
                    {
                        course.sections.slice(1)?.map((section, index) => (
                            <Text key={index}>{section.section} - {section.startTime} - {section.endTime} - {section.days}</Text>
                        ))
                    }
                </Stack>
            </HoverCard.Dropdown>
        </HoverCard>
    )
}