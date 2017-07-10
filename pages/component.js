
import Layout from '../components/MyLayout.js'

const Component = (props) => {  
  return (<div>
    <h1>Component-xxx</h1>
    <div className="row">
      <div className="col-xs-8">
col-xs-8
      </div>
      <div className="col-xs-4">
col-xs-4
      </div>
    </div> 
  </div>
)}

export default Layout(Component)