import { Route } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import {
  DragDropContext,
  Droppable as Dropzone,
  Draggable,
} from "react-beautiful-dnd";
import { useState } from "react";

const LibraryPage = () => {
  const [edit, setEdit] = useState(false);
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
      name: "Flash",
      id: "flash",
    },
  ]);

  const { handleDragEnd } = useDragAndDrop(superHeroes, setSuperHeroes);

  const d = (id) => {
    const newSuperHeroes = [...superHeroes];

    const dragSuperIndex = superHeroes.findIndex((s) => s.id === id);
    newSuperHeroes.splice(dragSuperIndex, 1);

    setSuperHeroes(newSuperHeroes);
  };

  const ulStyles = {
    as: "ul",
    w: "300px",
    listStyleType: "none",
    m: 2,
    border: "1px",
  };
  const liStyles = {
    as: "li",
    borderColor: "accent.2",
    p: 5,
  };

  return (
    <>
      LibraryPage
      <Button onClick={() => setEdit((edit) => !edit)}>edit or not</Button>
      {edit ? (
        <DroppableList
          onDragEnd={handleDragEnd}
          //
          {...ulStyles}
        >
          {superHeroes.map((superHero, index) => (
            <DraggableItem
              key={superHero.id}
              //
              draggableId={superHero.id}
              draggableIndex={index}
              //

              border="1px"
              {...liStyles}
            >
              <Box onDoubleClick={d.bind(null, superHero.id)}>
                {superHero.name}
              </Box>
            </DraggableItem>
          ))}
        </DroppableList>
      ) : (
        <Box {...ulStyles}>
          {superHeroes.map((superHero) => (
            <Box key={superHero.id} {...liStyles}>
              {superHero.name}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

const useDragAndDrop = (list, setList) => {
  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    // 0(n)
    // const dragSuperHero = superHeroes.find((s) => s.id === draggableId);

    const newList = [...list];
    // 0(1)
    const [draggedItem] = newList.splice(sourceIndex, 1);
    newList.splice(destinationIndex, 0, draggedItem);

    setList(newList);
  };

  return {
    handleDragEnd,
  };
};

const DroppableList = ({ onDragEnd, children, ...rest }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Dropzone droppableId="superHeroes">
        {(provided) => (
          <Box
            {...rest}
            //
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {children}
            {provided.placeholder}
          </Box>
        )}
      </Dropzone>
    </DragDropContext>
  );
};

const DraggableItem = ({ children, draggableIndex, draggableId, ...rest }) => (
  <Draggable index={draggableIndex} draggableId={draggableId}>
    {(provided) => (
      <Box
        {...rest}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {children}
      </Box>
    )}
  </Draggable>
);

export const LibraryPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <LibraryPage {...props} />} />;
};
