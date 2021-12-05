import { Route } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { DraggableItem, DroppableList } from "../../components";
import { useDragAndDrop } from "../../hooks";

const LibraryPage = () => {
  const [isEditMode, setEdit] = useState(false);
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

  const handleEnableEditMode = () => setEdit(true);
  const handleDisableEditMode = () => setEdit(false);

  return (
    <>
      {isEditMode ? (
        <EditModeWorld
          superHeroes={superHeroes}
          setSuperHeroes={setSuperHeroes}
          onDisableEditMode={handleDisableEditMode}
        />
      ) : (
        <>
          <Box p={3} pb={5}>
            <Button onClick={handleEnableEditMode} colorScheme="blue">
              Edit
            </Button>
          </Box>

          <Box {...ulStyles}>
            {superHeroes.map((superHero) => (
              <Box key={superHero.id} {...liStyles}>
                {superHero.name}
              </Box>
            ))}
          </Box>
        </>
      )}
    </>
  );
};

const EditModeWorld = ({
  superHeroes: propSuperHeroes,
  setSuperHeroes: setPropSuperHeroes,
  onDisableEditMode,
}) => {
  const [superHeroes, setSuperHeroes] = useState(propSuperHeroes);

  const { handleDragEnd } = useDragAndDrop(superHeroes, setSuperHeroes);

  const handleDeleteSuperHero = (id) => {
    const newSuperHeroes = [...superHeroes];

    const dragSuperIndex = superHeroes.findIndex((s) => s.id === id);
    newSuperHeroes.splice(dragSuperIndex, 1);

    setSuperHeroes(newSuperHeroes);
  };

  const handleEditSave = () => {
    setPropSuperHeroes(superHeroes);
    onDisableEditMode();
  };

  return (
    <>
      <Box p={3} pb={5}>
        <Button mr={3} colorScheme="blue" onClick={handleEditSave}>
          Save
        </Button>

        <Button onClick={onDisableEditMode}>Cancel</Button>
      </Box>

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
            <Box onDoubleClick={handleDeleteSuperHero.bind(null, superHero.id)}>
              {superHero.name}
            </Box>
          </DraggableItem>
        ))}
      </DroppableList>
    </>
  );
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

export const LibraryPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <LibraryPage {...props} />} />;
};
