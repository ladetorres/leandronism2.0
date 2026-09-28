import { bodyStyle } from '../../styles/siteFonts'

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
