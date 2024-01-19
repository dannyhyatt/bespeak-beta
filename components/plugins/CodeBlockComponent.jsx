import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'
import { aliasMap } from './Lowlight'

export default ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }) => (
  <NodeViewWrapper className="code-block relative">
    <select className="absolute right-2 top-2 bg-background text-foreground"
      contentEditable={false} defaultValue={defaultLanguage} onChange={event => updateAttributes({ language: aliasMap[event.target.value] ?? 'null' })}>
      <option value="null">
        Auto
      </option>
      <option disabled>
        —
      </option>
      {Object.keys(aliasMap).map((lang, index) => (
        <option key={index} value={lang}>
          {lang}
        </option>
      ))}
    </select>
    <pre>
      <NodeViewContent as="code" className={`language-${defaultLanguage}`} />
    </pre>
  </NodeViewWrapper>
)