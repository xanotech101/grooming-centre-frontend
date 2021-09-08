import PropTypes from "prop-types";
import FormGroup, { FormGroupPropTypes } from "../FormGroup";
import MUIRichTextEditor from "mui-rte";
import { Box } from "@chakra-ui/layout";

export const RichText = ({
  id,
  isRequired,
  label,
  placeholder,
  value,
  onChange = () => {},
}) => {
  const save = (data) => {
    console.log(data);
  };

  const emojis = [
    {
      keys: ["face", "grin"],
      value: "😀",
      content: "😀",
    },
    {
      keys: ["face", "joy"],
      value: "😂",
      content: "😂",
    },
    {
      keys: ["face", "sweat"],
      value: "😅",
      content: "😅",
    },
  ];

  return (
    <FormGroup
      id={id}
      label={label}
      isRequired={isRequired}
      renderControl={() => (
        <Box
          border="1px"
          borderColor="accent.2"
          rounded="sm"
          paddingX={2}
          paddingBottom={2}
          className="rich-text"
        >
          <MUIRichTextEditor
            label={placeholder}
            onSave={save}
            autocomplete={{
              strategies: [
                {
                  items: emojis,
                  triggerChar: ":",
                },
              ],
            }}
            draftEditorProps={{ spellCheck: true }}
          />
        </Box>
      )}
    />
  );
};

const MyBlock = (props) => {
  return (
    <div
      style={{
        padding: 10,
        backgroundColor: "#ebebeb",
      }}
    >
      My Block content is:
      {props.children}
    </div>
  );
};

RichText.propTypes = {
  ...FormGroupPropTypes,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
