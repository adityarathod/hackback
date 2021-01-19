import { FC, useMemo, useState } from 'react'
import AppManager from './app-manager'
import Nav from './nav'

const AdminContainer: FC = () => {
  const [curTab, setCurTab] = useState(0)
  const tabList = ['Manage Applications', 'Send Decision Emails']
  const tabs = useMemo(() => [<AppManager key='0' />, <div key='1'>TBD</div>], [])
  return (
    <div>
      <Nav tabs={tabList} onTabChange={num => setCurTab(num)} curTab={curTab} />
      {tabs[curTab]}
    </div>
  )
}

export default AdminContainer
