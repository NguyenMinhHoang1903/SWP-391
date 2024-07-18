import "./admin.css"
import Sidebar from './Sidebar'
import WidgetRevenueLM from "./WidgetRevenueLM"
import WidgetRevenueTM from "./WidgetRevenueTM"


export default function AdminHome() {
  return (
    <div className='adminHome-component'>
            <Sidebar/>
     <div className="adminHome-container">
      <div className='show-widget'>
        <WidgetRevenueTM/>
        <WidgetRevenueLM/>
      </div>
      </div>
    </div>
  )
}
