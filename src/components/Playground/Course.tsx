import { Button, Divider, Flex, Grid, Stack, Text, Title, useMantineTheme } from "@mantine/core"
import { Course } from "@/types"
import CourseLibrary from "./CourseLibrary"
import { IconTrash } from "@tabler/icons-react"

type CourseBoxProps = {
    course: Course;
    handleRemove: () => void;
    isDragging: boolean;
}

export default function CourseBox({ course, handleRemove, isDragging }: CourseBoxProps) {
    const { courseCode, courseTitle, creditHours, sections, alias } = course

    const code = alias ? courseCode + " / " + alias : courseCode

    const theme = useMantineTheme()

    return (
        <Flex direction="column" className="relative justify-center p-2 shadow-lg mx-4 rounded-md mt-6"
            style={{ backgroundColor: isDragging ? theme.colors.dark[3] : theme.colors.gray[7], userSelect: "none" }}
        >
            <Grid>
                <Grid.Col className="flex items-center" span={6}><Title order={4}>{code}</Title></Grid.Col>
                <Grid.Col className="flex items-center" span={4}><Title order={4}>{sections[0].section}</Title></Grid.Col>
                <Grid.Col span={2}><div className="hover:rounded-xl hover:bg-slate-500 py-2 grid place-content-center" onClick={handleRemove}>
                    <IconTrash size={20} />
                </div></Grid.Col>
            </Grid>
            <Divider mb={2} />
            <Flex gap={10}>
                <Stack spacing={2} className="bg-slate-700 px-2 rounded-lg">
                    <Text ta="center" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} variant="gradient">{sections[0].startTime}</Text>
                    <Text ta="center" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} variant="gradient">{sections[0].endTime}</Text>
                    <Text ta="center" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} variant="gradient">{sections[0].days}</Text>
                </Stack>
                <Stack spacing={2}>
                    <Text>{courseTitle}</Text>
                    <Text>{sections[0].instructors.join(', ')}</Text>
                </Stack>
            </Flex>
            {
                sections.slice(1)?.map((section, index) => (
                    <>
                        <Divider mt={2}/>
                        <Grid>
                            <Grid.Col span={3}><Text>{section.section}</Text></Grid.Col>
                            <Grid.Col span={3}><Text>{section.startTime}</Text></Grid.Col>
                            <Grid.Col span={3}><Text>{section.endTime}</Text></Grid.Col>
                            <Grid.Col span={3}><Text>{section.days}</Text></Grid.Col>
                        </Grid>
                    </>
                ))
            }
        </Flex>
    )
}
