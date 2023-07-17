import { useRecoilState } from "recoil";
import { playgroundState } from "@/state";
import { Table, Center, Flex, Text, Title, Modal, Button, Box, TextInput, Accordion, Stack } from "@mantine/core";
import { ChangeEvent, use, useEffect, useRef, useState } from "react";
import { getStaticCourses } from "@/data";
import { usePlaygroundBuckets, useSearchResults } from "@/hooks";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { Course } from "@/types";

const staticCourses = getStaticCourses()

export default function CourseLibrary() {

    const searchRef = useRef<HTMLInputElement>(null)

    const { searchResults, setSearchResults } = useSearchResults()

    const { buckets, currentActiveBucket, setPlayground } = usePlaygroundBuckets()

    const handleSearch = () => {

        if(searchRef.current?.value.trim() === "") return;

        const filteredCourses = staticCourses
            .filter((course) => {
                const jsonify = JSON.stringify(course).toLowerCase()
                return searchRef.current?.value
                    .toLowerCase()
                    .split(/s+/g)
                    .every(token => jsonify.includes(token))
            })
        setSearchResults(filteredCourses)
    }

    const InstructorMenu = (instructors: string[]) => {
        if (instructors.length <= 1) {
            return (
                <Text>{instructors}</Text>
            )
        }
        return (
            <Accordion>
                <Accordion.Item value="NULL">
                    <Accordion.Control>{instructors[0]}</Accordion.Control>
                    <Accordion.Panel>
                        <Stack spacing={1}>
                            {instructors.map((instructor, index) => (
                                <Text key={index}>{instructor}</Text>
                            ))}
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        )
    }

    const handleCourseSelect = (index: number) => {
        if (currentActiveBucket === null) return
        const course = searchResults[index]
        const newBuckets = [...buckets]
        newBuckets[currentActiveBucket] = [...newBuckets[currentActiveBucket], course]
        setPlayground({ buckets: newBuckets, currentActiveBucket })
    }

    const doesCourseExist = (course: Course) => {
        const flattenedBuckets = buckets.flat()
        return flattenedBuckets.some(({ id }) => course.id === id)
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => { event.key === "Enter" && handleSearch() }
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    const Labels = ["#", "Code", "Section", "Course", "Name", "Credits", "Instructor", "Start Time", "End Time", "Days", ""]

    return (
        <Modal
            size={10000}
            opened={currentActiveBucket !== null}
            onClose={() => setPlayground({ buckets, currentActiveBucket: null })}
        >
            <Center>
                <Box className="flex flex-col gap-8" style={{ width: "80dvw", height: "80dvh" }}>
                    <Flex gap={2}>
                    <TextInput
                        className="w-96"
                        placeholder="Anth 100"
                        label="Course Details"
                        description="Enter a course code to add it to the library"
                        ref={searchRef}
                        rightSection={<IconSearch onClick={handleSearch} size={18}/>}
                    />
                    </Flex>
                    <div className="overflow-y-auto">
                        <Table striped highlightOnHover withBorder>
                            <thead><tr>{Labels.map(label => <th key={label} style={{ textAlign: "left" }}>{label}</th>)}</tr></thead>
                            <tbody>
                                {searchResults.map((course, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{course.courseCode.split(" ")[0]}</td>
                                        <td>{course.sections[0].section}</td>
                                        <td>{course.courseCode.split(" ")[1]}</td>
                                        <td>{course.courseTitle}</td>
                                        <td>{course.creditHours}</td>
                                        <td>{InstructorMenu(course.sections[0].instructors)}</td>
                                        <td>{course.sections[0].startTime}</td>
                                        <td>{course.sections[0].endTime}</td>
                                        <td>{course.sections[0].days}</td>
                                        <td><Button disabled={doesCourseExist(course)} variant="subtle" onClick={() => handleCourseSelect(index)}><IconPlus /></Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Box>
            </Center>
        </Modal>
    )
}