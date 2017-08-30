export default ({ pattern = {} }) => {
  const { type, name = '' } = pattern
  const path = type === 'page' ? `${name.toLowerCase()}` : `_builder/${type}s/${name.toLowerCase()}`
  return (<div className="row">
    <div className="col-xs-8">
      <iframe
        src={`http://localhost:3005/${path}`}
        style={{
          height: 400,
          width: '100%',
        }}
      />
    </div>
    <div className="col-xs-4">

    </div>
  </div>)
}