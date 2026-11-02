import { createElement, useEffect, useState } from 'react'

const RUNNER_SPRITE_ROOT = '/game-photos/rowlet-run/runners'

function resolveRunnerSpritePath(fileName) {
  if (!fileName) return ''
  if (fileName.startsWith('public/')) {
    return '/' + fileName.replace(/^public\//, '')
  }
  if (fileName.startsWith('/game-photos/')) return fileName
  if (fileName.startsWith('/')) return `${RUNNER_SPRITE_ROOT}${fileName}`
  return `${RUNNER_SPRITE_ROOT}/${fileName}`
}

export function RunnerSpriteAnimation({ fileName, duration, rows, cols, row, dimension }) {
  const [frame, setFrame] = useState(0)
  const [frameWidth, setFrameWidth] = useState(0)
  const [frameHeight, setFrameHeight] = useState(0)

  const spritePath = resolveRunnerSpritePath(fileName)
  const frameCount = Math.max(1, cols)
  const rowCount = Math.max(1, rows)
  const rowIndex = Math.min(Math.max(row, 1), rowCount) - 1

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setFrameWidth(img.width / frameCount)
      setFrameHeight(img.height / rowCount)
    }
    img.src = spritePath
  }, [spritePath, frameCount, rowCount])

  useEffect(() => {
    setFrame(0)
    const frameMs = (duration * 1000) / frameCount
    if (!Number.isFinite(frameMs) || frameMs <= 0) return undefined

    const timer = setInterval(() => {
      setFrame((current) => (current + 1) % frameCount)
    }, frameMs)

    return () => clearInterval(timer)
  }, [duration, frameCount, spritePath, rowIndex])

  if (!frameWidth || !frameHeight) return null

  const square = dimension == null ? null : Math.max(1, Number(dimension))
  const boxWidth = square ?? frameWidth
  const boxHeight = square ?? frameHeight
  const fit = square == null ? 1 : square / Math.max(frameWidth, frameHeight)

  return createElement('div', {
    style: {
      width: `${boxWidth}px`,
      height: `${boxHeight}px`,
      minWidth: `${boxWidth}px`,
      minHeight: `${boxHeight}px`,
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    },
  }, createElement('div', {
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: `${frameWidth}px`,
      height: `${frameHeight}px`,
      marginLeft: `${-frameWidth / 2}px`,
      marginTop: `${-frameHeight / 2}px`,
      backgroundImage: `url(${spritePath})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `${-frame * frameWidth}px ${-rowIndex * frameHeight}px`,
      imageRendering: 'pixelated',
      transform: `scale(${fit})`,
    },
  }))
}
