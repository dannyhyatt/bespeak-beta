import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'
import { aliasList } from './Lowlight'

export default ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }) => (
  <NodeViewWrapper className="code-block relative">
    <select className="absolute right-2 top-2 bg-background text-foreground"
      contentEditable={false} defaultValue={defaultLanguage} onChange={event => updateAttributes({ language: event.target.value })}>
      <option value="null">
        Auto
      </option>
      <option disabled>
        —
      </option>
      {aliasList.map((lang, index) => (
        <option key={index} value={lang}>
          {lang}
        </option>
      ))}
    </select>
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
)