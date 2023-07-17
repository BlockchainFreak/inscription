import React, { CSSProperties, useState } from "react";
import ReactDOM from "react-dom";
import {
  DragDropContext, Droppable, Draggable, OnDragEndResponder, DraggingStyle,
  NotDraggingStyle,
  DraggableLocation
} from "react-beautiful-dnd";
import { Flex, Box, Center, Stack, Grid, Button, Container } from "@mantine/core"
import { useClashFreeWeeks, useMounted, usePlaygroundBuckets } from "@/hooks";
import { useMantineTheme } from "@mantine/core";
import CourseBox from "@/components/Playground/Course";
import { Course } from "@/types";
import { IconCpu, IconPlus } from "@tabler/icons-react";
import { calculateClashFreeWeeks } from "@/lib/clash-resolver";
import CourseLibrary from "@/components/Playground/CourseLibrary";


const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source: any[], destination: any[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {} as Record<string, any[]>;
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default function Playground() {
  const mounted = useMounted()
  const theme = useMantineTheme()
  const { buckets, currentActiveBucket, setPlayground } = usePlaygroundBuckets()
  const { setClashFreeWeeks } = useClashFreeWeeks()

  const handleAdd = (index: number) => {
    setPlayground(p => ({ ...p, currentActiveBucket: index }))
  }

  const handleProcess = () => {
    const clashFreeWeeks = calculateClashFreeWeeks(buckets)
    console.log(clashFreeWeeks)
    setClashFreeWeeks(clashFreeWeeks)
  }

  const handleCourseRemove = (bi: number, ci: number) => {
    setPlayground(p => {
      const newBuckets = [...p.buckets]
      newBuckets[bi] = [...newBuckets[bi]]
      newBuckets[bi].splice(ci, 1)
      const filteredBuckets = newBuckets.filter((bucket, bi) => bucket.length > 0 || bi === 0);
      while (filteredBuckets[0].length === 0 && filteredBuckets.length > 1) {
        filteredBuckets.shift()
      }
      return { ...p, buckets: filteredBuckets }
    })
  }

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      setPlayground(p => {
        const newBuckets = [...p.buckets]
        newBuckets[sInd] = reorder(newBuckets[sInd], source.index, destination.index);
        return { ...p, buckets: newBuckets }
      })
    } else {
      setPlayground(p => {
        const movedResults = move(p.buckets[sInd], p.buckets[dInd], source, destination);
        const newBuckets = [...p.buckets];
        newBuckets[sInd] = movedResults[sInd];
        newBuckets[dInd] = movedResults[dInd];
        // delete empty buckets
        const filteredBuckets = newBuckets.filter((bucket, bi) => bucket.length > 0 || bi === 0);
        while (filteredBuckets[0].length === 0 && filteredBuckets.length > 1) {
          filteredBuckets.shift()
        }
        return { ...p, buckets: filteredBuckets }
      })
    }
  }

  return (
    <div className='px-4 h-full flex flex-col'>
      <div className="flex flex-row gap-4 p-4 h-5/6 overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          {mounted && buckets.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className="w-72 flex flex-col rounded-md overflow-y-auto"
                  style={{ backgroundColor: theme.colors.gray[8] }}
                  {...provided.droppableProps}
                >
                  <Flex direction="row-reverse" className="gap-8 mb-4">
                    <Button onClick={() => handleAdd(ind)}>
                      <IconPlus size={20} />
                      Add Course
                    </Button>
                    <Center className="flex grow" >Bucket {ind + 1}</Center>
                  </Flex>
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id ?? ""}
                      draggableId={item.id ?? ""}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                        >
                          <CourseBox
                            course={item}
                            isDragging={snapshot.isDragging}
                            handleRemove={() => handleCourseRemove(ind, index)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
        <div onClick={() => setPlayground(p => ({ ...p, buckets: [...p.buckets, []] }))}
          className="w-72 grid place-items-center rounded-md overflow-y-auto hover:bg-gray-700 bg-slate-800">
          <IconPlus size={40} />
        </div>
      </div>
      <Flex direction="row-reverse" className="mt-4">
        <Button onClick={handleProcess}>
          <IconCpu size={20} className='mr-2' />
          Process
        </Button>
      </Flex>
      <CourseLibrary />
    </div>
  );
}
