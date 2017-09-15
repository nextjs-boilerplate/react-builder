export default ({ type, name, dom = {} }) => {
  const { datas = { default: {} }, dataKey = 'default' } = dom
  const propsStr = JSON.stringify(datas[dataKey])
  const backPath = (type === 'page') ? '../' : '../../../'
  return `import Layout from '${backPath}components/Layout'
import ${name} from '${backPath}components/${type}s/${name}'    

const props = ${propsStr}
const Preview = ()=>(<${name} {...props} />)

export default Layout(Preview)`
}