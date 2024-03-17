import React, { useContext } from "react";
import "./HighlightHTML.css";
import htmlToReact from "html-react-parser";
import { normalizeInnerText } from "../utils";
import PropTypes from "prop-types";

const HighlightDataContext = React.createContext();

function HighlightHTMLChunk({ text, startIndex }) {
  const highlightData = useContext(HighlightDataContext);

  let prevIndexInText = 0;
  let keyIndex = 0;
  const result = [];
  for (const index of highlightData.indexes) {
    let indexInText = index - startIndex;
    let endIndexInText = index + highlightData.length - startIndex;

    if (indexInText < 0 && endIndexInText < 0) continue;
    if (indexInText >= text.length) break;

    let openLeft = false;
    let openRight = false;

    if (indexInText < 0) {
      openLeft = true;
      indexInText = 0;
    }
    if (endIndexInText > text.length) {
      openRight = true;
      endIndexInText = text.length;
    }

    if (indexInText == endIndexInText) continue;

    result.push(
      <React.Fragment key={keyIndex++}>
        {text.substring(prevIndexInText, indexInText)}
      </React.Fragment>
    );

    result.push(
      <span
        className="highlight-text"
        key={keyIndex++}
        style={{
          borderLeft: openLeft ? "none" : null,
          borderRight: openRight ? "none" : null,
        }}
      >
        {text.substring(indexInText, endIndexInText)}
      </span>
    );

    prevIndexInText = endIndexInText;
  }
  if (prevIndexInText < text.length)
    result.push(
      <React.Fragment key={keyIndex++}>
        {text.substring(prevIndexInText)}
      </React.Fragment>
    );
  return result;
}

HighlightHTMLChunk.propTypes = {
  text: PropTypes.string.isRequired,
  startIndex: PropTypes.number.isRequired,
};

export function HighlightHTML({ text, pattern }) {
  let currentText = "";
  let nextTextIndex = 0;
  const parsed = htmlToReact(text, {
    transform(reactNode, domNode, index) {
      if (domNode.type !== "text") return reactNode;

      const currentTextIndex = nextTextIndex;
      nextTextIndex += reactNode.length;
      currentText += normalizeInnerText(reactNode);
      return (
        <HighlightHTMLChunk
          key={index}
          startIndex={currentTextIndex}
          text={reactNode}
        />
      );
    },
  });

  const highlightData = {
    length: pattern.length,
    indexes: [],
  };

  if (highlightData.length > 0) {
    const lowerCasedPattern = pattern.toLowerCase();
    const lowerCasedText = currentText.toLowerCase();
    let lastIndex = 0;
    let currentIndex = 0;

    while (
      ((currentIndex = lowerCasedText.indexOf(lowerCasedPattern, lastIndex)),
      currentIndex >= 0)
    ) {
      highlightData.indexes.push(currentIndex);
      lastIndex = currentIndex + pattern.length;
    }
  }

  return (
    <HighlightDataContext.Provider value={highlightData}>
      {parsed}
    </HighlightDataContext.Provider>
  );
}

HighlightHTML.propTypes = {
  text: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
};
