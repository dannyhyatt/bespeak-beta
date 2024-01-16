import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

export default ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }) => (
  <NodeViewWrapper className="code-block relative">
    {/* <select className="absolute right-2 top-2"
      contentEditable={false} defaultValue={defaultLanguage} onChange={event => updateAttributes({ language: event.target.value })}>
      <option value="null">
        auto
      </option>
      <option disabled>
        —
      </option>
      {extension.options.lowlight.listLanguages().map((lang, index) => (
        <option key={index} value={lang}>
          {lang}
        </option>
      ))}
    </select> */}
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
)