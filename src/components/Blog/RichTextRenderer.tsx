import React, { ElementType } from 'react'
import { Props, RichTextItem } from './blog.types'

const RichTextRenderer: React.FC<Props> = ({ content }) => {
  const headingSizes = ['4xl', '3xl', '2xl', 'xl', 'lg', 'base', 'sm']

  const renderNode = (node: RichTextItem, index: number) => {
    if (node.type === 'paragraph') {
      return (
        <p key={index} className="mb-6">
          {node.children?.map((child, i) => renderNode(child, i))}
        </p>
      )
    } else if (node.type === 'text') {
      let textContent = <>{node.text}</>

      if (node.bold) textContent = <strong>{textContent}</strong>
      if (node.italic) textContent = <em>{textContent}</em>
      if (node.underline) textContent = <u>{textContent}</u>
      if (node.strikethrough) textContent = <s>{textContent}</s>
      if (node.code) textContent = <code className="bg-gray-200 p-1">{textContent}</code>

      return <span key={index}>{textContent}</span>
    } else if (node.type === 'link' && node.url) {
      return (
        <a
          key={index}
          className="text-primary hover:underline"
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {node.children?.map((child, i) => renderNode(child, i))}
        </a>
      )
    } else if (node.type === 'list' && node.format) {
      const ListTag = node.format === 'ordered' ? 'ol' : 'ul'
      return (
        <ListTag key={index} className="ml-5 list-disc">
          {node.children?.map((child, i) => renderNode(child, i))}
        </ListTag>
      )
    } else if (node.type === 'list-item') {
      return <li key={index}>{node.children?.map((child, i) => renderNode(child, i))}</li>
    } else if (node.type === 'heading' && node.level) {
        const HeadingTag = (`h${node.level}` as ElementType)
      return (
        <HeadingTag key={index} className={`text-${headingSizes[node.level - 1]} font-bold mt-6 mb-3`}>
          {node.children?.map((child, i) => renderNode(child, i))}
        </HeadingTag>
      )
    } else if (node.type === 'image' && node.image) {
      return (
        <img
          key={index}
          src={node.image.url}
          alt={node.image.alternativeText || 'image'}
          className="max-w-full h-auto my-4"
        />
      )
    } else if (node.type === 'quote') {
      return (
        <blockquote key={index} className="border-l-4 border-gray-400 pl-4 italic text-gray-600">
          {node.children?.map((child, i) => renderNode(child, i))}
        </blockquote>
      )
    } else if (node.type === 'code') {
      return (
        <pre key={index} className="bg-gray-100 p-3 rounded-md">
          <code>{node.children?.map((child, i) => renderNode(child, i))}</code>
        </pre>
      )
    }

    return null
  }

  return (
    <div className="text-base">
      {content.map((node, index) => renderNode(node, index))}
    </div>
  )
}

export default RichTextRenderer
