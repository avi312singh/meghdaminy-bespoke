export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="birdsOfParadise"
      rel="preload"
      href="static/fonts/BirdsOfParadise.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
  ])
}
