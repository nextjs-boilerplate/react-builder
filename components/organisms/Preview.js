export default ({ pattern = {} }) => {
  const { type, name = '' } = pattern
  const path = (type === 'page') ? `${name.toLowerCase()}` : `_builder/${type}s/${name.toLowerCase()}`
  return (
    <iframe
      src={`http://localhost:3005/${path}`}
      style={{
        height: 400,
        width: '100%',
      }}
    />)
}