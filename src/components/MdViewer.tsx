import gfm from '@bytemd/plugin-gfm'
import { Viewer, type ViewerProps } from '@bytemd/react'
import highlight from '@bytemd/plugin-highlight'
import 'highlight.js/styles/default.css'
import gemoji from '@bytemd/plugin-gemoji'
import mermaid from '@bytemd/plugin-mermaid'
import math from '@bytemd/plugin-math'
import 'github-markdown-css/github-markdown-dark.css'
import 'bytemd/dist/index.css'

const plugins = [gfm(), highlight(), gemoji(), mermaid(), math()]


const MdViewer = ({ value }: ViewerProps) => {
  console.log('value', value)
  return <Viewer value={value} plugins={plugins} />
}

export default MdViewer