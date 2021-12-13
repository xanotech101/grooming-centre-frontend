import PropTypes from "prop-types";
import FormGroup, { FormGroupPropTypes } from "../FormGroup";
import MUIRichTextEditor from "mui-rte";
import { Box } from "@chakra-ui/layout";

export const RichText = ({
  error,
  id,
  isRequired,
  label,
  placeholder = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima voluptatum velit mollitia dolorem facilis suscipit cumque, molestias ut ex magni natus laudantium totam quisquam odit consectetur reprehenderit non quae vitae?",
  defaultValue,
  onChange,
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
      error={error}
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
            onChange={onChange}
            defaultValue={defaultValue}
          />
        </Box>
      )}
    />
  );
};

RichText.propTypes = {
  ...FormGroupPropTypes,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
};
