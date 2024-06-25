import React from 'react';

const CodeSegment = ({ content }) => 
    <pre className='codeContainer'>
      <code>{content}</code>
    </pre>

export default CodeSegment;