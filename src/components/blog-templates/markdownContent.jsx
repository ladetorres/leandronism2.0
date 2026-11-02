import ReactMarkdown from 'react-markdown'
import { bodyStyle, featuredStyle, FONT_HEADER } from '../../styles/siteFonts'

export function normalizeMarkdown(text) {
  return String(text ?? '')
    .split(/\n{2,}/)
    .map((para) =>
      para
        .replace(/^[ \t]+/gm, '')
        .replace(/\s+/g, ' ')
        .trim()
    )
    .filter(Boolean)
    .join('\n\n')
}

export const markdownComponents = {
  p: ({node, ...props}) => <span style={{ display: 'inline', width: '100%', fontFamily: bodyStyle.fontFamily }} {...props} />,
  strong: ({node, ...props}) => <strong style={{ fontWeight: 'bold', display: 'inline', fontFamily: bodyStyle.fontFamily }} {...props} />,
  em: ({node, ...props}) => <em style={{ fontStyle: 'italic', display: 'inline', fontFamily: bodyStyle.fontFamily }} {...props} />,
  code: ({node, ...props}) => <code style={{ display: 'inline', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word', fontFamily: bodyStyle.fontFamily }} {...props} />,
  pre: ({node, ...props}) => <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: bodyStyle.fontFamily }} {...props} />,
}

const headerBlockStyle = {
  fontFamily: FONT_HEADER,
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: 1.25,
  wordBreak: 'break-word',
}

export function contentBlockSpacingClass(block) {
  switch (block?.spacing) {
    case 'tight':
      return 'mb-6'
    case 'tighter':
      return 'mb-3'
    case 'tightest':
      return 'mb-0'
    default:
      return 'mb-12'
  }
}

export function MarkdownContentBlocks({ blocks }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <div className="max-w-full" style={{ width: '100%' }}>
      {blocks.map((block, index) => {
        const spacingClass = contentBlockSpacingClass(block)

        if (block.type === 'paragraph') {
          return (
            <div key={index} className={`${spacingClass} max-w-full`} style={{ width: '100%' }}>
              <div
                className="leading-tight"
                style={{
                  ...bodyStyle,
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}
              >
                <ReactMarkdown components={markdownComponents}>
                  {normalizeMarkdown(block.text)}
                </ReactMarkdown>
              </div>
            </div>
          )
        }

        if (block.type === 'featured-line') {
          return (
            <div key={index} className={`${spacingClass} max-w-full`} style={{ width: '100%' }}>
              <div
                className="leading-tight"
                style={{
                  ...featuredStyle,
                  whiteSpace: 'pre-wrap'
                }}
              >
                <ReactMarkdown components={markdownComponents}>
                  {normalizeMarkdown(block.text)}
                </ReactMarkdown>
              </div>
            </div>
          )
        }

        if (block.type === 'header') {
          return (
            <div key={index} className={`${spacingClass} max-w-full`} style={{ width: '100%' }}>
              <div
                className="leading-tight"
                style={{
                  ...headerBlockStyle,
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}
              >
                <ReactMarkdown components={markdownComponents}>
                  {normalizeMarkdown(block.text)}
                </ReactMarkdown>
              </div>
            </div>
          )
        }

        if (block.type === 'quote') {
          return (
            <div key={index} className={`${spacingClass} max-w-full`} style={{ width: '100%' }}>
              <div
                className="leading-tight"
                style={{
                  ...bodyStyle,
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  paddingLeft: '2em',
                  borderLeft: '2px solid #000000',
                  opacity: 0.8
                }}
              >
                <span style={{ marginRight: '4px' }}>"</span>
                <ReactMarkdown components={markdownComponents}>
                  {normalizeMarkdown(block.text)}
                </ReactMarkdown>
                <span style={{ marginLeft: '4px' }}>"</span>
              </div>
            </div>
          )
        }

        if (block.type === 'divider') {
          return (
            <div key={index} className={`${spacingClass} max-w-full`} style={{ width: '100%' }}>
              <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                <div className="border-t" style={{ borderColor: '#00000026' }}></div>
              </div>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
