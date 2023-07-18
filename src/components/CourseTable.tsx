import { useState } from "react";
import { Button, Flex, Grid, Modal, Pagination, Table, Text, Title } from "@mantine/core";
import { useElementSize, usePagination } from "@mantine/hooks";
import { useClashFreeWeeks } from "@/hooks";
import { Course } from "@/types";
import { StringifyTime, QuantifyTime, ParseTime } from "@/lib";
import { parseTime } from "@/lib/clash-resolver";
import CoursePreview from "@/components/CoursePreview";
import { IconList, IconTable } from "@tabler/icons-react";
// 8 -> 24
const hourTags = Array.from({ length: 17 }, (_, i) => i + 8)

const weekdaysTag = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const WTC = "MTWTFSU"

const borderStyles = "border border-solid border-gray-700 grid place-items-center"

export default function CourseTable() {

    const { clashFreeWeeks, setClashFreeWeeks } = useClashFreeWeeks()

    const { ref, height } = useElementSize()

    const [isListView, setIsListView] = useState(false)

    const TABSIZE = height / 18;
    console.log(TABSIZE)
    const [page, onChange] = useState(1);
    const pagination = usePagination({ total: clashFreeWeeks.length, page, onChange });

    if (clashFreeWeeks.length === 0) {
        return null
    }
    const week = clashFreeWeeks[page - 1];

    console.log(clashFreeWeeks, page)

    const findCourse = (hour: number, day: string, index: number) => {
        const w1 = week.find(course =>
            course.sections[0].days.includes(day) &&
            QuantifyTime(parseTime(course.sections[0].startTime)).hour === hour
        )
        if (w1) return { sectionIdx: 0, course: w1 }
        const w2 = week.find(course =>
            course.sections[1]?.days.includes(WTC[index]) &&
            QuantifyTime(parseTime(course.sections[1].startTime)).hour === hour
        )
        return { sectionIdx: 1, course: w2 }
    }

    const Cols = hourTags.map((hour) => (
        <>
            <Grid.Col className={borderStyles} span={1} key={"Col" + hour}>{StringifyTime({ hour, minute: 0 })}</Grid.Col>
            {
                WTC.split('').map((day, index) => (
                    <Grid.Col className={borderStyles + " relative"} span={1} key={day + hour}>
                        {week && <CoursePreview
                            height={TABSIZE}
                            {...findCourse(hour, day, index)}
                        />}
                    </Grid.Col>
                ))
            }
        </>
    ))

    const handleClose = () => {
        setClashFreeWeeks([])
        onChange(1)
    }

    return (
        <Modal
            size={10000}
            opened={clashFreeWeeks.length > 0}
            onClose={handleClose}
        >
            <Modal.Body>
                <Flex gap={32}>
                    <Title order={1}>Clash Free Weeks</Title>
                    <Pagination
                        onChange={pagination.setPage}
                        onFirstPage={pagination.first}
                        onLastPage={pagination.last}
                        onNextPage={pagination.next}
                        onPreviousPage={pagination.previous}
                        value={pagination.active}
                        total={clashFreeWeeks.length}
                    />
                    <div className="flex flex-grow" />
                    <Button color="emerald.7" onClick={() => setIsListView(v => !v)}>
                        {isListView ? <IconList /> : <IconTable />}
                        <Text ml={4}>{isListView ? "List View" : "Table View"}</Text>
                    </Button>
                </Flex>
                <div className="my-8 h-96">
                    {
                        isListView ? (
                            <Table striped highlightOnHover withBorder withColumnBorders>
                                <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th>Section</th>
                                        <th>Day</th>
                                        <th>Time</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Instructors</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        week.map((course: Course) => (
                                            <tr key={course.courseCode + course.sections}>
                                                <td>{course.courseCode}</td>
                                                <td>{course.sections[0].section}</td>
                                                <td>{course.sections[0].days}</td>
                                                <td>{course.sections[0].startTime} - {course.sections[0].endTime}</td>
                                                <td>{course.sections[0].startTime}</td>
                                                <td>{course.sections[0].endTime}</td>
                                                <td>{course.sections[0].instructors.join(", ")}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        ) : (
                            <Grid columns={8} ref={ref} gutter={0}>
                                <Grid.Col span={1}></Grid.Col>
                                {weekdaysTag.map((day) => (<Grid.Col className={borderStyles} span={1} key={day}>{day}</Grid.Col>))}
                                {Cols}
                            </Grid>
                        )
                    }
                </div>
            </Modal.Body>
        </Modal>
    )

}