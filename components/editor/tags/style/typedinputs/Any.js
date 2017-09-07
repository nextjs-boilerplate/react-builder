export default ({ value, onChange, cssProperty = {} }) => (<div className="form-group">
  <label>fill value:</label>
  <textarea
    className="form-control"
    rows="3"
    onChange={(e) => onChange(e.target.value)}
    value={value || ''}
  />
  <span id="helpBlock" className="help-block">{`format: ${cssProperty.type}, use data like \`\${data}\``}</span>
</div>)