import { FC, useState } from 'react'
import AppManager from './app-manager'
import Nav from './nav'

const AdminContainer: FC = () => {
  const [curTab, setCurTab] = useState(0)
  const tabList = ['Manage Applications', 'View Stats']
  const tabs = [<AppManager key='0' />, null]
  return (
    <div>
      <Nav tabs={tabList} onTabChange={num => setCurTab(num)} curTab={curTab} />
      {tabs[curTab]}
    </div>
  )
}

export default AdminContainer
