import { Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import {
  DragDropContext,
  Droppable as Dropzone,
  Draggable,
} from "react-beautiful-dnd";
import { useState } from "react";

const LibraryPage = () => {
  const [superHeroes, setSuperHeroes] = useState([
    {
      name: "Super Man",
      id: "super-man",
    },
    {
      name: "Doctor Strange",
      id: "doctor-strange",
    },
    {
      name: "Zod",
      id: "zod",
    },
    {
      name: "Wonder Woman",
      id: "wonder-woman",
    },
    {
      name: "flash",
      id: "flash",
    },
  ]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const {
      destination,
      source,
      // draggableId
    } = result;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    // 0(n)
    // const dragSuperHero = superHeroes.find((s) => s.id === draggableId);

    const newSuperHeroes = [...superHeroes];
    // 0(1)
    const [dragSuperHero] = newSuperHeroes.splice(sourceIndex, 1);
    newSuperHeroes.splice(destinationIndex, 0, dragSuperHero);

    setSuperHeroes(newSuperHeroes);
  };

  return (
    <>
      LibraryPage
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Dropzone droppableId="superHeroes">
          {(provided) => (
            <Box
              as="ul"
              w="300px"
              border="1px"
              listStyleType="none"
              m={2}
              //
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {superHeroes.map((superHero, index) => (
                <DraggableItem
                  key={superHero.id}
                  draggableId={superHero.id}
                  draggableIndex={index}
                  //
                  name={superHero.name}
                  border="1px"
                  borderColor="accent.2"
                  p={5}
                />
              ))}

              {provided.placeholder}
            </Box>
          )}
        </Dropzone>
      </DragDropContext>
    </>
  );
};

const DraggableItem = ({ name, draggableIndex, draggableId, ...rest }) => (
  <Draggable index={draggableIndex} draggableId={draggableId}>
    {(provided) => (
      <Box
        as="li"
        {...rest}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {name}
      </Box>
    )}
  </Draggable>
);

export const LibraryPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <LibraryPage {...props} />} />;
};
