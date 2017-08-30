export default ({ onChange, tagData = {} }) => (<div>
  <div className="form-group">
    <label>Content:</label>
    <textarea
      className="form-control"
      rows="3"
      onChange={(e) => onChange('text', e.target.value)}
      value={tagData.text || ''}
    />
    <span id="helpBlock" className="help-block">{`do not use html encoded content, use data like \`\${data}\``}</span>
  </div>
</div>)