export const navigation = [
  {
    title: true,
    name: '报修管控'
  },
  {
    name: '报修管理',
    url: '/#',
    icon: 'icon-puzzle',
    children: [
      {
        name: '我的报修',
        url: '/repair',
        icon: 'icon-puzzle'
      },
      {
        name: '历史报修',
        url: '/repair/history/3',
        icon: 'icon-puzzle'
      }
    ]
  }
];

export const navigation4Admin = [
  {
    name: '用户管理',
    url: '/user',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
    }
  },
  {
    title: true,
    name: '报修管控'
  },
  {
    name: '维修系统',
    url: '/#',
    icon: 'icon-puzzle',
    children: [
      {
        name: '报修审批',
        url: '/repair/assertRepairList/0',
        icon: 'icon-puzzle'
      },
      {
        name: '维修管理',
        url: '/repair/unHandledRepairList/2',
        icon: 'icon-puzzle'
      },
      {
        name: '维修评估',
        url: '/repair/evaluateRepairList/3',
        icon: 'icon-puzzle'
      },
      {
        name: '历史维修',
        url: '/repair/historyRepairList/4',
        icon: 'icon-puzzle'
      }
    ]
  },
];
