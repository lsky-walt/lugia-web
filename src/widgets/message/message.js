/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import { unmountComponentAtNode } from 'react-dom';
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import { Message, MessageContent } from '../css/message';
import type { MessageProps, MessageState } from '../css/message';
import IconContent from './icon-content';
import get from '../css/theme-common-dict';
import { getBorderRadius } from '@lugia/theme-utils';
import { deepMerge } from '@lugia/object-utils';

const defaultMessageContentTheme = () => ({
  themeConfig: {
    normal: {
      boxShadow: get('normalBoxShadow'),
      borderRadius: getBorderRadius(get('borderRadiusValue')),
    },
  },
});

export default ThemeProvider(
  class extends React.Component<MessageProps, MessageState> {
    closeTimer: any;
    removeTimer: any;
    constructor() {
      super();
      this.state = {
        visible: true,
        opening: true,
        closing: false,
      };
    }
    componentDidMount() {
      setTimeout(() => {
        this.setState({
          opening: false,
        });
      }, 300);
      const { time, callBack } = this.props;
      const endTime = time * 1000;
      const closeStart = endTime - 150;
      this.closeTimer = setTimeout(() => {
        this.setState({
          closing: true,
        });
      }, closeStart);
      this.removeTimer = setTimeout(() => {
        this.setState({
          visible: false,
          closing: false,
        });
        callBack && callBack();
        this.removeDom();
      }, endTime);
    }
    componentWillUnmount() {
      clearTimeout(this.closeTimer);
      clearTimeout(this.removeTimer);
    }

    render() {
      const {
        iconType = 'info',
        content,
        getPartOfThemeProps,
        getPartOfThemeHocProps,
      } = this.props;
      const { visible, opening, closing } = this.state;
      const messageTheme = getPartOfThemeProps('Container');
      const messageTextTheme = getPartOfThemeProps('MessageText');
      const messageIconThemeObj = getPartOfThemeHocProps('MessageIcon');
      const messageContentTheme = deepMerge(defaultMessageContentTheme(), messageTheme);
      const { themeConfig: { normal: { height = 40 } = {} } = {} } = messageContentTheme;
      if (visible) {
        return (
          <Message>
            <MessageContent opening={opening} closing={closing} themeProps={messageContentTheme}>
              <IconContent
                iconType={iconType}
                content={content}
                height={height - 20}
                textTheme={messageTextTheme}
                iconTheme={messageIconThemeObj}
              />
            </MessageContent>
          </Message>
        );
      }
      return null;
    }
    removeDom = () => {
      const { parentDom, rootDom } = this.props;
      if (parentDom && rootDom) {
        unmountComponentAtNode(parentDom);
        rootDom.removeChild(parentDom);
      }
    };
  },
  Widget.Message
);
