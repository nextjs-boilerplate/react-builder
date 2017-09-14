export default ({ type, name, dom = {} }) => {
  const { datas = { default: {} }, dataKey = 'default' } = dom
  const propsStr = JSON.stringify(datas[dataKey])
  return `import Layout from '../../../components/Layout'
import ${name} from '../../../components/${type}s/${name}'    

const props = ${propsStr}
const Preview = ()=>(<${name} {...props} />)

export default Layout(Preview)`
}