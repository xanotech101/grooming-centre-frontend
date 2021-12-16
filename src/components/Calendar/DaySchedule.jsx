import { Box } from "@chakra-ui/layout";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import { AiFillEdit } from "react-icons/ai";
import { Button, DatePicker } from "..";
import { useDateTimePicker } from "../../hooks";
import { getServerDateNow } from "../../utils";

export const DaySchedule = ({ appointments }) => {
  const dateManger = useDateTimePicker(new Date(getServerDateNow()));

  return (
    <>
      <Box
        p={3}
        position="relative"
        transition=".3s"
        _hover={{ transform: "scale(1.02)" }}
      >
        <DatePicker
          id="startTime"
          onChange={dateManger.handleChange}
          value={dateManger.value}
        />

        <Button asIcon position="absolute" top="10px" left="150px" zIndex="-1">
          <AiFillEdit />
        </Button>
      </Box>

      <Box className="mini">
        <Scheduler data={appointments}>
          <ViewState currentDate={dateManger.value} />
          <DayView startDayHour={8.5} endDayHour={17.5} />
          <Appointments />
        </Scheduler>
      </Box>
    </>
  );
};
