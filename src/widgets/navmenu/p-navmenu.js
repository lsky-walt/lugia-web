/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Navmenu from './';
import Widget from '../consts/index';
import styled from 'styled-components';
import Icon from '../icon';
const RowWrap = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: row;
`;

const RowWrapItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;
const H1 = styled.h1`
  text-align: center;
  background: #000;
  color: #fff;
  margin: 0 0 10px;
`;

const data = [
  {
    value: 'Lugia Design of React',
    text: 'Lugia Design of React',
    icon: 'lugia-icon-financial_add_pic',
    disabled: true,
  },
  { value: 'Lugia-mobile', text: 'Lugia-mobile', icon: 'lugia-icon-financial_add_pic' },
  {
    value: 'Components',
    text: 'Components',
    icon: 'lugia-icon-financial_add_pic',
    children: [
      {
        value: 'General',
        text: 'General',
      },

      {
        value: 'Layout',
        text: 'Layout',
        disabled: true,
      },

      {
        value: 'Navigation',
        text: 'Navigation',
        icon: 'lugia-icon-financial_add_pic',
        children: [{ value: 'Affix', text: 'Affix' }, { value: 'tag', text: 'tag' }],
      },
    ],
  },
];

const horizontalData = [
  {
    value: 'Lugia Design of React',
    text: 'Lugia Design of React',
    icon: 'lugia-icon-financial_add_pic',
  },
  {
    value: 'Lugia-web',
    text: 'Lugia-web',
    icon: 'lugia-icon-financial_columns',
  },
  { value: 'Lugia-mobile', text: 'Lugia-mobile' },
  {
    value: 'Components',
    text: 'Components',
    icon: 'lugia-icon-financial_add_pic',
    children: [
      {
        value: 'General',
        text: 'General',
        disabled: true,
        children: [
          {
            value: 'Button',
            text: 'Button',
            icon: 'lugia-icon-financial_add_pic',
          },
          {
            value: 'Icon',
            text: 'Icon',
            icon: 'lugia-icon-financial_archive',
          },
        ],
      },
      {
        value: 'Layout',
        text: 'Layout',
        icon: 'lugia-icon-financial_add_pic',
        disabled: true,
        children: [{ value: 'Grid', text: 'Grid' }],
      },

      {
        value: 'Navigation',
        text: 'Navigation',
        describe: true,
        children: [{ value: 'Affix', text: 'Affix' }, { value: 'tag', text: 'tag' }],
      },

      {
        value: 'Data Entry',
        text: 'Data Entry',
        describe: true,
        children: [{ value: 'rate', text: 'rate' }, { value: 'Cascader', text: 'Cascader' }],
      },
    ],
  },
];

const menuTheme = {
  [Widget.NavMenu]: {
    Tree: {
      TreeItem: {
        TreeItemWrap: {
          normal: {
            background: { color: '#fff' },
          },
        },
        SelectedTreeItemWrap: {
          normal: {
            background: { color: 'pink' },
          },
        },

        SelectedText: {
          normal: {
            background: { color: 'none' },
          },
        },
      },
    },
  },
};

const menuTheme1 = {
  [Widget.NavMenu]: {
    Tabs: {
      TabHeader: {
        SelectLine: {
          normal: {
            width: 100,
            height: 10,
            background: {
              color: 'red',
            },
          },
        },
      },
    },
  },
};

const primaryMenuTheme = {
  [Widget.NavMenu]: {
    Tree: {
      TreeItem: {
        SubTreeWrap: {
          normal: {
            background: {
              color: '#e20c0c',
            },
          },
        },
        SelectedText: {
          normal: {
            background: {
              color: '#50e3c2',
            },
            font: {
              size: '',
            },
            color: '#f8e71c',
          },
        },
      },
    },
  },
};

export default class LimitDemo extends React.Component<Object, Object> {
  all: boolean;
  constructor(props) {
    super(props);
    this.state = { value: ['Affix 固钉'], activityValue: '项目实战', height: 500 };
  }

  tabsOnChange = (target: Object) => {
    const { newValue } = target;
    this.setState({ activityValue: newValue });
  };

  render() {
    return [
      <H1>垂直菜单 </H1>,
      <RowWrap>
        <RowWrapItem>
          <H1> themeStyle：light 垂直菜单 </H1>
          <Navmenu data={data} mode={'vertical'} />,
        </RowWrapItem>
        <RowWrapItem>
          <H1> themeStyle：dark 垂直菜单 </H1>
          <Navmenu data={data} mode={'vertical'} themeStyle={'dark'} />
        </RowWrapItem>
      </RowWrap>,
      <H1>水平菜单 </H1>,
      <RowWrap>
        <RowWrapItem>
          <H1> themeStyle：light </H1>
          <Navmenu theme={menuTheme1} data={horizontalData} mode={'horizontal'} />,
        </RowWrapItem>
        <RowWrapItem>
          <H1> themeStyle：dark </H1>
          <Navmenu data={horizontalData} mode={'horizontal'} themeStyle={'dark'} />
        </RowWrapItem>
      </RowWrap>,
      <H1>侧栏导航 Primary 风格 </H1>,
      <RowWrap>
        <RowWrapItem>
          <H1> themeStyle：light </H1>
          <Navmenu
            indentDistance={26}
            data={data}
            parentIsHighlight={false}
            theme={primaryMenuTheme}
            selectLinePosition="left"
          />
          ,
        </RowWrapItem>
        <RowWrapItem>
          <H1> themeStyle：dark </H1>
          <Navmenu
            data={data}
            parentIsHighlight={false}
            themeStyle={'dark'}
            theme={primaryMenuTheme}
            selectLinePosition="right"
          />
        </RowWrapItem>
      </RowWrap>,
      <H1>侧栏导航 Ellipse 风格 </H1>,
      <RowWrap>
        <RowWrapItem>
          <H1> themeStyle：light </H1>
          <Navmenu parentIsHighlight={false} theme={menuTheme} data={data} inlineType={'ellipse'} />
          ,
        </RowWrapItem>
        <RowWrapItem>
          <H1> themeStyle：dark </H1>
          <Navmenu data={data} themeStyle={'dark'} inlineType={'ellipse'} />
        </RowWrapItem>
      </RowWrap>,
    ];
  }
}
