import config from '../../config'

export default ({ pattern = {} }) => {
  const { type, name = '' } = pattern
  const path = (type === 'page') ? `${name.toLowerCase()}` : `_builder/${type}s/${name.toLowerCase()}`
  return (
    <iframe
      src={`http://${config.host}:3009/${path}`}
      style={{
        height: 400,
        width: '100%',
      }}
    />)
}