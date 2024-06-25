import React from 'react';

const CodeSegment = ({ content }) => {
  return (
    <pre className='codeContainer'>
      <code>{content}</code>
    </pre>
  );
};

export default CodeSegment;