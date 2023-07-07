import { useRef } from "react";
import template from "../../../../../assets/images/grooming-cert.png";
import "./style.css";
import { AdminMainAreaWrapper } from "../../../../../layouts";
import { Button } from "../../../../../components";
import { Box, Flex } from "@chakra-ui/react";
import { truncateText } from "../../../../../utils";
import { exportAsImage } from "../../../../../utils/exportToPng";

export const Certificate = ({ name, title, top = "226" }) => {
  const certificateWrapper = useRef(null);
  return (
    <div>
      <div className="App">
        <div id="downloadWrapper" ref={certificateWrapper}>
          <div id="certificateWrapper">
            <div
              style={{
                color: "#000",
                display: "flex",
                position: "absolute",
                width: "100%",
                height: "100%",
                fontSize: "40px",
                top: "0",
                left: "0",
                fontFamily: "Sacramento",
                textTransform: "capitalize",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  top: "226px",
                  left: "280px",
                  position: "absolute",
                }}
              >
                {name}
              </div>
              <p
                color="others.3"
                style={{
                  display: "flex",
                  position: "absolute",
                  top: "370px",
                  left: title?.length < 20 ? "40%" : "30%",
                  fontFamily: "Sacramento",
                  fontSize: "20px",
                }}
              >
                {truncateText(title, 20)}
              </p>
            </div>
            <img src={template} alt="Certificate" />
          </div>
        </div>
      </div>
      <Flex justifyContent={"flex-end"} mr={6}>
        <Button
          onClick={() => {
            exportAsImage(
              certificateWrapper.current,
              `${title} certificate for ${name}`
            );
          }}
        >
          Download
        </Button>
      </Flex>
    </div>
  );
};
