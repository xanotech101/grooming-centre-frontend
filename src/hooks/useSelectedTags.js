import { useState } from "react";

/**
 * Manage selectedTags
 * @returns {{
 *  selectedTags: Array<{ id: string, label: string }>,
 *  handleTagSelectMany: (tag) => void,
 *  handleTagSelectOne: (tag) => void,
 *  handleTagDeselect: (tag) => void
 * }}
 */
export const useSelectedTags = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagSelectMany = (tag) => {
    const selectedTag = [...selectedTags].find(({ id }) => id === tag.id);

    if (!selectedTag) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const handleTagSelectOne = (tag) => {
    const selectedTag = [...selectedTags].find(({ id }) => id === tag.id);

    if (!selectedTag) {
      setSelectedTags([tag]);
    }
  };

  const handleTagDeselect = (tag) => {
    const newSelectedTags = selectedTags.filter(({ id }) => id !== tag.id);
    setSelectedTags(newSelectedTags);
  };

  return {
    selectedTags,
    handleTagSelectMany,
    handleTagSelectOne,
    handleTagDeselect,
  };
};
