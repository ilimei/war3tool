import React, { useCallback, useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    RouteComponentProps,
    Redirect,
} from "react-router-dom";


export interface MenuConfig {
    title: string;
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export interface MenuLayoutProps {
    configs: Array<MenuConfig>;
}

function useHash() {
    const [hash, setHash] = useState(location.hash);
    const onHashChange = useCallback(() => {
        setHash(location.hash);
    }, []);
    useEffect(() => {
        window.addEventListener('hashchange', onHashChange)
        return ()=>window.removeEventListener('hashchange', onHashChange);
    }, [])
    return hash;
}

export const MenuLayout: React.FC<MenuLayoutProps> = ({ configs }) => {

    const hash = useHash()

    const fd = configs.find(v=>v.path === hash.slice(1));
    if(fd) {
        document.title = fd.title;
    }

    return <Router>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <Menu selectedKeys={[hash.slice(1)]} theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {
                        configs.map(v => {
                            return <Menu.Item key={v.path}>
                                <Link to={v.path}>{v.title}</Link>
                            </Menu.Item>
                        })
                    }
                </Menu>
            </Sider>
            <Content style={{ margin: '0 16px' }}>
                <Switch>
                    {
                        configs.map(v => {
                            return <Route key={v.path} exact path={v.path} component={v.component} />
                        })
                    }
                    <Redirect to={configs[0].path} />
                </Switch>
            </Content>
        </Layout>
    </Router>
}

export default MenuLayout;



