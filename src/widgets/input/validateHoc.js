import React from 'react';
import { deepMerge } from '@lugia/object-utils';
import get from '../css/theme-common-dict';
import ToolTip from '../tooltip/index';
import { DefaultHelp, isValidateError } from '../css/validateHoc';
import { TipBottom, InnerTipText, FatherContainer, BottomContainer } from './validateCSS';

const ValidateHoc = (Target: Object, displayName?: string) => {
  class ValidateContainer extends React.Component {
    state = {
      _isValidateVisible: false,
    };

    onFocus = (event: UIEvent) => {
      const { onFocus, disabled, readOnly } = this.props;
      if (disabled || readOnly) {
        return;
      }
      this.setState({ _isValidateVisible: false });
      onFocus && onFocus(event);
    };

    onBlur = (event: UIEvent) => {
      const { onBlur, disabled, readOnly } = this.props;

      if (disabled || readOnly) {
        return;
      }
      this.setState({ _isValidateVisible: true });
      onBlur && onBlur(event);
    };
    render() {
      const {
        validateType,
        validateStatus,
        help,
        getPartOfThemeHocProps,
        getPartOfThemeProps,
        isValidate = true,
      } = this.props;
      const { _isValidateVisible } = this.state;
      const theHelp = help || DefaultHelp;
      const result = (
        <Target
          {...this.props}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          validateTextThemeProps={() => getPartOfThemeProps('ValidateErrorText')}
        />
      );

      if (!isValidate) {
        return result;
      }
      if (validateType === 'top') {
        const { theme: validateTopTipThemeProps, viewClass } = getPartOfThemeHocProps(
          'ValidateErrorText'
        );
        const newTheme = {
          [viewClass]: {
            Container: deepMerge(
              {
                normal: {
                  background: { color: get('darkGreyColor') },
                  getCSS() {
                    return 'display: inline-block;';
                  },
                },
              },
              validateTopTipThemeProps[viewClass]
            ),
            TooltipTitle: deepMerge(
              { normal: { color: get('defaultColor') } },
              validateTopTipThemeProps[viewClass]
            ),
            ChildrenContainer: {
              normal: {
                getCSS() {
                  return 'display: block;width:100%;height:100%;';
                },
              },
            },
          },
        };
        return (
          <ToolTip
            theme={newTheme}
            viewClass={viewClass}
            title={theHelp}
            action={'focus'}
            popArrowType={'round'}
            placement={'topLeft'}
            visible={isValidateError(validateStatus) && !_isValidateVisible}
          >
            {result}
          </ToolTip>
        );
      }
      const innerProps = validateType === 'inner' ? { _isValidateVisible } : {};
      const validateThemeProps = getPartOfThemeProps('ValidateErrorText', {
        props: { validateStatus, ...innerProps },
      });
      if (validateType === 'bottom') {
        return (
          <BottomContainer themeProps={getPartOfThemeProps('Container')}>
            {result}
            <TipBottom themeProps={validateThemeProps}>{theHelp}</TipBottom>
          </BottomContainer>
        );
      }

      if (validateType === 'inner') {
        const { getPartOfThemeProps } = this.props;
        return (
          <FatherContainer displayName={displayName} themeProps={getPartOfThemeProps('Container')}>
            {result}
            <InnerTipText themeProps={validateThemeProps}>{theHelp}</InnerTipText>
          </FatherContainer>
        );
      }
      return result;
    }
  }
  return ValidateContainer;
};
export default ValidateHoc;
