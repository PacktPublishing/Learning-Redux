import { JSDOM } from 'jsdom'

const serverSideRendering = (indexFile, loadStaticFile) => (req, res) => {
  // TODO
  if (loadStaticFile) return loadStaticFile(req, res)
}

export default serverSideRendering
