export default ({ onChange, tagData = {} }) => (<div>
  <div className="form-group">
    <label>Component: </label>
    <p>{`${tagData.component.type}s/${tagData.component.name}`}</p>
  </div>
</div>)