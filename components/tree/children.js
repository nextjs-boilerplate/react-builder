export default ({
  TreeNode,
  data = {},
  onUpdateData,
  Template,
  path = '',
}) => {
  if (!data.children) {
    return []
  }

  const pathPrifix = path ? `${path}.` : ''

  return data.children.map((data, i) => {
    return (<TreeNode
      data={data}
      onUpdateData={onUpdateData}
      Template={Template}
      path={`${pathPrifix}children.${i}`}
    />)
  })
}