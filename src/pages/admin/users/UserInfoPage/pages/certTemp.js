import { useRef } from "react";
import logo from "../../../../../assets/images/newlogo.png";
import badge from "../../../../../assets/images/badge-level-1.png";
import tr from "../../../../../assets/images/tr.png";
import "./style.css";
import { AdminMainAreaWrapper } from "../../../../../layouts";
import { Button } from "../../../../../components";
import { Box, Flex } from "@chakra-ui/react";
import { truncateText } from "../../../../../utils";
import { exportAsImage } from "../../../../../utils/exportToPng";

export const Certificate = ({ name, title }) => {
  const certificateWrapper = useRef(null);
  return (
    <div>
      <div className="">
        <div id="cert" ref={certificateWrapper}>
          <div id=""></div>

          <div
            style={{
              backgroundColor: "#800020",
              padding: "20px",
              overflow: "hidden",
              position: "relative",
              height: "100%",
            }}
          >
            <div className="design-1"></div>
            <div className="design-2"></div>
            <div className="angle"></div>
            <div className="angle-2"></div>
            <div
              style={{
                position: "absolute",
                bottom: "30px",
                right: "30px",
              }}
            >
              <img src={tr} width={"60px"} />
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                paddingBottom: "20px",
              }}
            >
              <div className="main-b">
                <div>
                  <img src={logo} width={"50px"} />
                </div>
                <h1>Grooming Center Training</h1>
              </div>
              <div className="main-b">
                <h1>Certificate of Completion</h1>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                <h3>This is to proudly certify that</h3>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "20px",
                    fontSize: "30px",
                    fontFamily: "Sacramento",
                  }}
                >
                  <div className="line-c">
                    <p>{name}</p>
                    <p className="line"></p>
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "28px",
                    paddingLeft: "30px",
                    paddingRight: "30px",
                  }}
                >
                  <h3>
                    has fullfilled all the neccessary requirements requested for
                  </h3>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                      fontSize: "30px",
                      fontFamily: "Sacramento",
                    }}
                  >
                    <div className="line-c">
                      <p>{truncateText(title, 20)}</p>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "30px",
                    }}
                  >
                    <img
                      src={badge}
                      width={"70px"}
                      style={{
                        margin: "auto",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Flex justifyContent={"flex-end"} mt={6}>
        <Button
          onClick={() => {
            exportAsImage(
              certificateWrapper.current,
              `${title} certificate for ${name}`
            );
          }}
        >
          Export
        </Button>
      </Flex>
    </div>
  );
};
