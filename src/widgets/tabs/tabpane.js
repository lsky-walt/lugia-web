/**
 *
 * create by liangguodong on 2018/9/6
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import Widget from '../consts/index';
import { TabType, TabPositionType } from '../css/tabs';
import Icon from '../icon';
import Divider from '../divider';
import { isVertical, matchType } from './utils';
import { ObjectUtils } from '@lugia/type-utils';

import CSSComponent, { css, keyframes, StaticComponent } from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import get from '../css/theme-common-dict';
import { deepMerge } from '@lugia/object-utils';

import { getBorder } from '@lugia/theme-utils';
const superLightColor = '$lugia-dict.@lugia/lugia-web.superLightColor';
const borderRadiusValue = '$lugia-dict.@lugia/lugia-web.borderRadiusValue';
const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const disableColor = '$lugia-dict.@lugia/lugia-web.disableColor';
const marginToSameElement = '$lugia-dict.@lugia/lugia-web.marginToSameElement';
const xxsFontSize = '$lugia-dict.@lugia/lugia-web.xxsFontSize';
const sFontSize = '$lugia-dict.@lugia/lugia-web.sFontSize';

const SelectTab = CSSComponent({
  tag: 'div',
  className: 'SelectTabPan',
  normal: {
    selectNames: [
      ['color'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['margin'],
      ['padding'],
      ['font'],
      ['opacity'],
      ['width'],
      ['height'],
      ['boxShadow'],
      ['textAlign'],
    ],
    defaultTheme: {
      color: darkGreyColor,
      fontSize: 14,
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const { color } = theme;
      const {
        propsConfig: {
          isSelect,
          tabType,
          tabPosition,
          lineTheme: {
            width: lineWidth,
            height: lineHeight,
            background: { color: lineColor } = {},
          } = {},
        },
      } = themeProps;
      let display = 'inline-flex';
      let defaultTextAlign = 'center';
      let position = '';
      if (isVertical(tabPosition)) {
        display = 'block';
        if (tabPosition === 'left') {
          defaultTextAlign = 'right';
        } else {
          defaultTextAlign = 'left';
        }
      }
      const { textAlign = defaultTextAlign } = theme;
      const textAlignStyle = `text-align:${textAlign};`;
      if (isSelect && tabType === 'line') {
        let cssString = css`
          width: ${lineWidth ? lineWidth + 'px' : '100%'};
          height: ${lineHeight || 2}px;
          left: 50%;
          transform: translateX(-50%);
        `;
        let pos = tabPosition === 'top' ? 'bottom: 0px;' : 'top: 0px;';
        if (isVertical(tabPosition)) {
          pos = tabPosition === 'left' ? 'right: -20px;' : 'left: -20px;';
          cssString = css`
            width: ${lineWidth || 2}px;
            height: ${lineHeight ? lineHeight + 'px' : '100%'};
            top: 50%;
            transform: translateY(-50%);
          `;
        }
        return css`
          display: ${display};
          ${textAlignStyle} & > div::before {
            content: '';
            background: ${lineColor || color || get('themeColor')};
            border-radius: 2px;
            position: absolute;
            ${pos} ${cssString};
          }
        `;
      }
      if (tabType === 'card') {
        position = 'bottom: -1px;';
      }
      return css`
        display: ${display};
        ${textAlignStyle} ${position};
      `;
    },
  },
  hover: {
    selectNames: [],
    getCSS: (theme: Object, themeProps: Object) => {
      const {
        propsConfig: { tabType, showDeleteBtn },
      } = themeProps;
      let cssString = `
        & > .IconContainer {
          opacity: 1;
        }
      `;
      if (tabType === 'card' && showDeleteBtn === true) {
        cssString += ` & > .cardTitle {
          transition: all 0.3s linear;
          transform: translateX(-8px);
        }`;
      }
      return css`
        ${cssString};
      `;
    },
  },
  disabled: {
    selectNames: [['color'], ['cursor']],
    defaultTheme: {
      cursor: 'not-allowed',
    },
    getCSS(theme: Object, themeProps: Object) {
      return css`
        & > div.cardTitle {
          transition: none;
          transform: none;
        }
      `;
    },
  },
  css: css`
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    padding: 0 20px;
    align-items: center;
  `,
  option: { hover: true },
});

const BaseTab = CSSComponent({
  extend: SelectTab,
  className: 'DefaultTabPan',
  hover: {
    selectNames: [['color'], ['background'], ['border'], ['font'], ['opacity']],
  },
});

SelectTab.displayName = 'Tabpane';

const addWidth = keyframes`
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
`;

const addHeight = keyframes`
    0% {
      height: 0;
    }
    100% {
      height: 100%;
    }
`;

const Title = CSSComponent({
  tag: 'div',
  className: 'TitleLine',
  normal: {
    selectNames: [['height']],
    defaultTheme: {
      height: 42,
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const { textAlign } = theme;
      let justify = 'center';
      switch (textAlign) {
        case 'left':
          justify = 'flex-start';
          break;
        case 'right':
          justify = 'flex-end';
          break;
        case 'justify':
          justify = 'space-between';
          break;
        default:
          break;
      }
      return `justify-content: ${justify};`;
    },
    getThemeMeta: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      return {
        lineHeight: height ? `${height}` : '3.4rem',
      };
    },
  },
  hover: {
    selectNames: [['color']],
    defaultTheme: {
      color: themeColor,
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: disableTextColor,
    },
  },
  css: css`
    position: relative;
    box-sizing: border-box;
    user-select: none;
    width: 100%;
    display: flex;
    align-items: center;

    & > * {
      max-width: 100%;
    }
  `,
  option: {
    hover: true,
  },
});

const CardTitle = CSSComponent({
  tag: 'div',
  className: 'TitleCard',
  normal: {
    selectNames: [['height'], ['lineHeight']],
    defaultTheme: {
      height: 32,
      lineHeight: 32,
    },
    getThemeMeta: (theme: Object, themeProps: Object) => {
      const { height } = theme;
      const { propsConfig: { tabType } = {} } = themeProps;
      if (tabType === 'card') {
        return {
          lineHeight: height ? `${height}px` : '32px',
          width: '100%',
        };
      }
      return {
        lineHeight: height ? `${height}px` : '32px',
      };
    },
  },
  hover: {
    selectNames: [['color']],
    defaultTheme: {
      color: themeColor,
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: disableTextColor,
    },
  },
  css: css`
    position: relative;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    user-select: none;
    &:focus {
      color: ${get('themeColor')};
    }
  `,
  option: {
    hover: true,
  },
});

const ClearButtonContainer = CSSComponent({
  tag: 'div',
  className: 'IconContainer',
  css: css`
    transition: all 0.3s linear 0.1s;
    z-index: 2;
    opacity: 0;
    margin-left: -5px;
    vertical-align: middle;
    display: flex;
    align-items: center;
    height: 100%;
  `,
  normal: {
    selectNames: [],
    getCSS: (themeConfig, themeProps) => {
      const {
        propsConfig: { tabType },
      } = themeProps;
      if (tabType !== 'card') {
        return 'opacity: 1;margin-left:10px;';
      }
      return `position: absolute;
        right: 7px;`;
    },
  },
  hover: {
    selectNames: [],
  },

  disabled: {
    selectNames: [],
  },
});

const TabPanContainer = StaticComponent({
  tag: 'div',
  className: 'TabPanContainer',
  css: css`
    text-align: center;
    display: ${props => {
      return props.isVertical ? '' : 'inline-block';
    }};
  `,
});

type TabpaneState = {};

type TabpaneProps = {
  title: string,
  onDelete?: Function,
  icon?: string,
  suffixIcon?: string,
  tabType?: TabType,
  tabPosition?: TabPositionType,
  index: number,
  activityValue: string,
  keyVal: string,
  isSelect?: boolean,
  disabled?: boolean,
  showDeleteBtn?: boolean,
  onClick?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  showDividerLine: boolean,
  deleteIcon: string,
};

class Tabpane extends Component<TabpaneProps, TabpaneState> {
  static displayName = Widget.Tabpane;

  render() {
    const {
      title,
      tabType,
      tabPosition,
      isSelect,
      icon,
      suffixIcon,
      disabled,
      showDeleteBtn,
      showDividerLine,
      createEventChannel,
    } = this.props;
    const { TargetTab, themeProps } = this.getHTabPaneThemeProps(
      tabType,
      isSelect,
      tabPosition,
      showDeleteBtn,
      disabled
    );

    const prefixIconTheme = this.getIconTheme('PrefixIcon', isSelect);
    const suffixIconTheme = this.getIconTheme('SuffixIcon', isSelect);
    const isLineType = matchType(tabType, 'line');

    const channel = createEventChannel(['hover']);
    const Target = (
      <TargetTab
        themeProps={themeProps}
        disabled={disabled}
        tabType={tabType}
        onClick={this.handleClick}
        isSelect={isSelect}
        tabPosition={tabPosition}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        {...channel.provider}
      >
        {isLineType ? (
          <Title
            lugiaConsumers={channel.consumer}
            className={'lineTitle'}
            themeProps={themeProps}
            tabType={tabType}
            isSelect={isSelect}
            disabled={disabled}
          >
            {this.getTabIconContainer(icon, prefixIconTheme, channel)}
            {title}
            {this.getTabIconContainer(suffixIcon, suffixIconTheme, channel)}
            {this.getClearButton()}
          </Title>
        ) : (
          <CardTitle
            lugiaConsumers={channel.consumer}
            className={'cardTitle'}
            themeProps={themeProps}
            tabType={tabType}
            isSelect={isSelect}
            disabled={disabled}
          >
            {this.getTabIconContainer(icon, prefixIconTheme, channel)}
            {title}
            {this.getTabIconContainer(suffixIcon, suffixIconTheme, channel)}
          </CardTitle>
        )}

        {!isLineType && this.getClearButton()}
      </TargetTab>
    );
    let resTabPan = Target;
    if (isLineType && showDividerLine) {
      resTabPan = (
        <TabPanContainer isVertical={isVertical(tabPosition)}>
          {Target}
          {this.getDivider(isVertical(tabPosition))}
        </TabPanContainer>
      );
    }
    return resTabPan;
  }

  getHTabPaneThemeProps(
    tabType: ?string,
    isSelect: ?boolean,
    tabPosition: ?string,
    showDeleteBtn: ?boolean,
    disabled: ?boolean
  ) {
    let titleThemeProps = this.props.getPartOfThemeProps('DefaultTabPan', {
      props: {
        isSelect,
        tabType,
        tabPosition,
        showDeleteBtn,
        disabled,
        lineTheme: this.getSelectLineTheme(),
      },
    });

    let selectThemeProps = this.props.getPartOfThemeProps('SelectTabPan', {
      props: { isSelect, tabType, tabPosition, showDeleteBtn, disabled },
    });
    const defaultSelectTheme = () => ({ themeConfig: { normal: { color: get('themeColor') } } });
    selectThemeProps = deepMerge(titleThemeProps, defaultSelectTheme(), selectThemeProps);
    switch (tabType) {
      case 'card':
        const targetObj = {
          themeConfig: {
            normal: {
              borderRadius: {
                topLeft: borderRadiusValue,
                topRight: borderRadiusValue,
              },
              margin: {
                left: 4,
                right: 4,
              },
              background: {
                color: disableColor,
              },
            },
          },
        };
        titleThemeProps = deepMerge(targetObj, titleThemeProps);
        const cardSelectObj = {
          themeConfig: {
            normal: {
              margin: {
                left: borderRadiusValue,
                right: borderRadiusValue,
              },
              border: getBorder(
                { color: superLightColor, width: 1, style: 'solid' },
                { directions: ['l', 'r', 't'] }
              ),
              borderRadius: {
                topLeft: borderRadiusValue,
                topRight: borderRadiusValue,
              },
              background: { color: 'white' },
            },
          },
        };
        selectThemeProps = deepMerge(cardSelectObj, selectThemeProps);
        break;
      case 'window':
        const windowSelectObj = {
          themeConfig: {
            normal: {
              border: getBorder({ border: 'none' }),
              borderRadius: {
                topLeft: borderRadiusValue,
                topRight: borderRadiusValue,
              },
              background: {
                color: 'white',
              },
            },
          },
        };
        selectThemeProps = deepMerge(windowSelectObj, selectThemeProps);
        break;
      default:
        break;
    }
    const TargetTab = isSelect ? SelectTab : BaseTab;
    const themeProps = isSelect ? selectThemeProps : titleThemeProps;
    return { TargetTab, themeProps };
  }

  getSelectLineTheme = () => {
    const { themeConfig: { normal = {} } = {} } = this.props.getPartOfThemeProps('SelectLine');
    return normal;
  };

  getIconTheme = (themeName: string, isSelect: ?boolean) => {
    let userThemeConfig = this.props.getPartOfThemeHocProps(themeName);
    const { theme, viewClass } = userThemeConfig;
    const { icon, suffixIcon } = this.props;
    const themeObj = {
      [viewClass]: {
        normal: {
          color: darkGreyColor,
          fontSize: sFontSize,
          getThemeMeta: (theme: Object, themeProps: Object) => {
            const { propsConfig: { isSelect } = {} } = themeProps;
            const titleSelectColor = isSelect ? { color: themeColor } : {};
            return {
              margin: {
                left: suffixIcon ? marginToSameElement : 0,
                right: icon ? marginToSameElement : 0,
              },
              ...titleSelectColor,
            };
          },
        },
        hover: {
          color: themeColor,
        },
        disabled: {
          color: disableTextColor,
          cursor: 'not-allowed',
        },
      },
    };
    userThemeConfig = {
      theme: deepMerge(themeObj, theme),
      viewClass,
    };

    if (isSelect) {
      const { theme: selectTheme, viewClass: selectViewClass } = this.props.getPartOfThemeHocProps(
        `Select${themeName}`
      );
      const { theme: defaultTheme } = userThemeConfig;
      userThemeConfig = {
        theme: deepMerge({ [selectViewClass]: defaultTheme[viewClass] }, selectTheme),
        viewClass: selectViewClass,
      };
    }

    return { ...userThemeConfig };
  };

  handleClick = () => {
    const { index, onClick, disabled, keyVal } = this.props;
    if (!disabled) onClick && onClick({ index, activityValue: keyVal });
  };

  getTabIconContainer(icon: ?string, themeProps?: Object = {}, channel: any) {
    return icon ? this.getIcon(icon, themeProps, channel) : null;
  }
  getIcon(icon: string, themeProps: Object, channel: any) {
    const { disabled, isSelect } = this.props;
    if (ObjectUtils.isString(icon)) {
      return (
        <Icon
          lugiaConsumers={channel.consumer}
          propsConfig={{ isSelect }}
          {...themeProps}
          iconClass={icon}
          disabled={disabled}
          singleTheme
        />
      );
    }
    return icon;
  }
  getDivider(isVertical: boolean): React$Node {
    const { theme, viewClass } = this.props.getPartOfThemeHocProps('DividerTheme');

    const props = isVertical ? 'width' : 'height';
    const size = isVertical ? 30 : 20;
    const type = isVertical ? null : 'vertical';
    const { normal = {} } = theme[viewClass];

    const themeObj = {
      [viewClass]: {
        Divider: {
          normal: deepMerge(
            {
              background: {
                color: get('superLightColor'),
              },
              [props]: size,
            },
            normal
          ),
        },
      },
    };

    return <Divider theme={themeObj} viewClass={viewClass} type={type} />;
  }
  onDeleteClick = e => {
    e.stopPropagation();
    const { onDelete, index, keyVal } = this.props;
    onDelete && onDelete({ index, activityValue: keyVal });
  };
  getClearButton() {
    const { tabType, disabled, showDeleteBtn, themeProps, deleteIcon } = this.props;
    const { viewClass, theme } = this.props.getPartOfThemeHocProps('DeleteIcon');
    themeProps.propsConfig = { tabType };
    const defaultIconTheme = {
      [viewClass]: {
        normal: {
          color: mediumGreyColor,
          fontSize: xxsFontSize,
        },
        hover: {
          color: darkGreyColor,
        },
        disabled: {
          cursor: 'not-allowed',
          color: disableTextColor,
        },
      },
    };
    const iconTheme = deepMerge(defaultIconTheme, theme);
    if (showDeleteBtn) {
      return (
        <ClearButtonContainer className={'IconContainer'} themeProps={themeProps} tabType={tabType}>
          <Icon
            singleTheme
            theme={iconTheme}
            viewClass={viewClass}
            iconClass={deleteIcon}
            disabled={disabled}
            onClick={this.onDeleteClick}
          />
        </ClearButtonContainer>
      );
    }
    return null;
  }

  onMouseEnter = (e: Object) => {
    const { onMouseEnter, index, keyVal } = this.props;
    onMouseEnter && onMouseEnter({ index, activityValue: keyVal });
  };
  onMouseLeave = (e: Object) => {
    const { onMouseLeave, index, keyVal } = this.props;
    onMouseLeave && onMouseLeave({ index, activityValue: keyVal });
  };
}

const TabPanHoc = ThemeHoc(Tabpane, Widget.Tabpane, {
  hover: false,
  active: false,
});
export default TabPanHoc;
