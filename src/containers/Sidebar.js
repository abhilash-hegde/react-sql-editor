import { Layout, Menu } from "antd";
import items from "../constants/items";
const { Sider } = Layout;

export default function Sidebar({ selected, setSelected }) {
  return (
    <Sider className='sidebar'>
      <h2 className='app-title'> SQL Editor </h2>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[selected]}
        items={items}
        onSelect={(target) => setSelected(target.key)}
      />
    </Sider>
  );
}
