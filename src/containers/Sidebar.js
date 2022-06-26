import Menu from "antd/lib/menu";
import Layout from "antd/lib/layout";
import items from "../constants/items";

import "antd/lib/menu/style/css";
import "antd/lib/layout/style/css";

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
