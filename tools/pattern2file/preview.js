export default ({ type, name }) => {
  
  return `import Layout from '../../../components/Layout'
import ${name} from '../../../components/${type}s/${name}'    

export default Layout(${name})`
}