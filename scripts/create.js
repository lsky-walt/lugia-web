/**
 *
 * create by guorg
 *
 * @flow
 */
const createDesignInfo = require('@lugia/devtools-material').createDesignInfo;
const createThemeMeta = require('@lugia/devtools-material').createThemeMeta;
const path = require('path');
const ensureFileSync = require('fs-extra').ensureFileSync;
const writeFileSync = require('fs-extra').writeFileSync;

const targetPath = path.join(__dirname, '../src/widgets');
const commonInvalid = ['common', 'consts', 'css', 'utils'];
const componentInvalid = [
  ...commonInvalid,
  'align',
  'code-box',
  'check-button',
  'inputtag',
  'page-loading',
  'screen-shot',
  'scroller',
  'theme',
  'theme-provider',
  'trigger',
  'empty',
  'design-responsive',
  'affix',
  'grid',
  'layout',
  'new-table'
];
const hideInTollPanelComponents = {
  message: 'message',
  anchor: 'index',
  notification: 'notification',
  popover: 'index',
  tooltip: 'index',
  popconfirm: 'index',
  'back-top': 'index',
};
const themeInvalid = [...commonInvalid];

const loadStr = "import { load } from './css/theme-common-dict.js';\n" + 'export { load };';

async function createDesignInfoFile() {
  const designInfoStr = await createDesignInfo(targetPath, componentInvalid, {
    outFile: 'string',
    hideInTollPanelComponents,
  });
  const designInfoPath = path.join(targetPath, 'designInfo.js');
  ensureFileSync(designInfoPath);
  writeFileSync(designInfoPath, designInfoStr + loadStr);
}

createDesignInfoFile();
createThemeMeta({ targetPath, invalid: themeInvalid });
