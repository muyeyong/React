
export const menuList = [
    {
        title: '首页',
        icon: 'HomeOutlined',
        key: '/home'
    },
    {
        title: '订单',
        icon: 'AppstoreOutlined',
        key: '/products',
        children: [
            {
                title: '订单类别管理',
                icon: 'BarsOutlined',
                key: '/category'
            },
            {
                title: '服务申请',
                icon: 'ToolOutlined',
                key: '/product'
            }
        ]
    },
    {
        title: '角色管理',
        icon: 'InsuranceOutlined',
        key: '/role'
    },
    {
        title: '用户管理',
        icon: 'UserOutlined',
        key: '/user'
    }
    ,
    {
        title: '图形图标',
        incon: 'AreaChartOutlined',
        key: '/charts',
        children: [
            {
                title: '柱状图',
                icon: 'BarChartOutlined',
                key: '/charts/bar'
            },
            {
                title: '饼状图',
                icon: 'PieChartOutlined',
                key: '/charts/pie'
            },
            {
                title: '折线图',
                icon: 'StockOutlined',
                key: '/charts/line'
            }
        ]
    }

]
