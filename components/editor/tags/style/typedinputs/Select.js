export default ({ value, onChange, cssProperty = {} }) => {
  const { options = [] } = cssProperty
  return (<div className="form-group">
    <label>fill value:</label>
    <select
      className="form-control"
      onChange={(e) => onChange(e.target.value)}
      value={value || ''}
    >
      <option value={''}>choose</option>
      {options.map((k) => <option key={k} value={k}>{k}</option>)}
    </select>
  </div>)
}