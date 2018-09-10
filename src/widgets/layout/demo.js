/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import Widget from '../consts';
import Theme from '../theme';
import Layout from '../layout';

const { Header, Content, Footer, Aside } = Layout;

const header = (
  <div style={{ height: '60px', lineHeight: '60px', textAlign: 'center', background: '#381be5' }}>
    Header
  </div>
);
const content = (
  <div
    style={{
      height: '200px',
      lineHeight: '200px',
      textAlign: 'center',
      background: '#0F89FF',
    }}
  >
    Content
  </div>
);
const footer = (
  <div
    style={{
      height: '60px',
      lineHeight: '60px',
      textAlign: 'center',
      background: '#0f13ff',
    }}
  >
    Footer
  </div>
);
const aside = (
  <div
    style={{
      height: '200px',
      lineHeight: '200px',
      width: '200px',
      textAlign: 'center',
      background: '#11b4ff',
    }}
  >
    Aside
  </div>
);

export const LayoutDemo = () => {
  const layoutView = {
    [Widget.Layout]: {
      width: 500,
      margin: {
        top: 20,
        bottom: 30,
        left: 50,
        right: 40,
      },
    },
    [Widget.Header]: {
      margin: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
    },
    [Widget.Footer]: {
      margin: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20,
      },
    },
    [Widget.Content]: {
      margin: {
        top: 20,
        bottom: 20,
        left: 10,
        right: 10,
      },
    },
  };
  return (
    <div>
      <p>default flex-direction: column;</p>
      <Layout>
        <Header>{header}</Header>
        <Content>{content}</Content>
        <Footer>{footer}</Footer>
      </Layout>
      <p>flex-direction: row;</p>
      <Layout>
        <Header>{header}</Header>
        <Layout direction="row">
          <Aside>{aside}</Aside>
          <Content>{content}</Content>
        </Layout>
        <Footer>{footer}</Footer>
      </Layout>
      <p>flex-direction: row;</p>
      <Layout>
        <Header>{header}</Header>
        <Layout direction="row">
          <Content>{content}</Content>
          <Aside>{aside}</Aside>
        </Layout>
        <Footer>{footer}</Footer>
      </Layout>
      <p>flex-direction: row;</p>
      <Layout direction="row">
        <Aside>
          <div
            style={{
              height: '320px',
              lineHeight: '200px',
              width: '200px',
              textAlign: 'center',
              background: '#11b4ff',
            }}
          >
            Aside
          </div>
        </Aside>
        <Layout>
          <Header>{header}</Header>
          <Content>{content}</Content>
          <Footer>{footer}</Footer>
        </Layout>
      </Layout>
      <p>flex-direction: row;</p>
      <Layout direction="row">
        <Aside>
          <div
            style={{
              height: '320px',
              lineHeight: '200px',
              width: '200px',
              textAlign: 'center',
              background: '#11b4ff',
            }}
          >
            Aside
          </div>
        </Aside>
        <Layout>
          <Header>{header}</Header>
          <Content>{content}</Content>
          <Footer>{footer}</Footer>
        </Layout>
        <Aside>
          <div
            style={{
              height: '320px',
              lineHeight: '200px',
              width: '200px',
              textAlign: 'center',
              background: '#11b4ff',
            }}
          >
            Aside
          </div>
        </Aside>
      </Layout>
      <p>flex-direction: row; Aside collapsible</p>
      <Layout direction="row">
        <Layout>
          <Header>{header}</Header>
          <Content>{content}</Content>
          <Footer>{footer}</Footer>
        </Layout>
        <Aside collapsible reverseArrow>
          <div>Aside</div>
        </Aside>
      </Layout>
      <p>flex-direction: row; Aside collapsible</p>
      <Layout direction="row">
        <Aside collapsible breakpoint={'lg'}>
          <div>Aside</div>
        </Aside>
        <Layout>
          <Header>{header}</Header>
          <Content>{content}</Content>
          <Footer>{footer}</Footer>
        </Layout>
      </Layout>
      <p>flex-direction: row; Aside collapsible</p>
      <Theme config={{ [Widget.Aside]: { backgroundColor: 'red' } }}>
        <Layout direction="row">
          <Layout>
            <Header>{header}</Header>
            <Content>{content}</Content>
            <Footer>{footer}</Footer>
          </Layout>
          <Aside collapsible reverseArrow>
            <div>Aside</div>
          </Aside>
        </Layout>
      </Theme>
      <p>theme</p>
      <Theme config={layoutView}>
        <Layout>
          <Header>{header}</Header>
          <Content>{content}</Content>
          <Footer>{footer}</Footer>
        </Layout>
      </Theme>
    </div>
  );
};
export class AsideDemo extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Aside collapsible>
          <div
            style={{
              height: '200px',
              lineHeight: '200px',
              textAlign: 'center',
              background: '#11b4ff',
            }}
          >
            Aside
          </div>
        </Aside>
        <p>collapsible trigger=null</p>
        <Aside collapsible trigger={null}>
          <div
            style={{
              height: '200px',
              lineHeight: '200px',
              textAlign: 'center',
              background: '#11b4ff',
            }}
          >
            Aside
          </div>
        </Aside>
        <p>collapsible collapsed=true trigger="hello"</p>
        <Aside collapsible collapsed={true} trigger="hello">
          <div
            style={{
              height: '200px',
              lineHeight: '200px',
              textAlign: 'center',
              background: '#11b4ff',
            }}
          >
            Aside
          </div>
        </Aside>
        <p>collapsible defaultCollapsed=true trigger="hello"</p>
        <Aside
          collapsible
          defaultCollapsed={true}
          breakpoint={'lg'}
          reverseArrow
          collapsedWidth={120}
        >
          <div
            style={{
              height: '200px',
              lineHeight: '200px',
              textAlign: 'center',
              background: '#11b4ff',
            }}
          >
            Aside
          </div>
        </Aside>
        <p>
          collapsible breakpoint={'lg'} collapsedWidth={64}
        </p>
        <Aside
          collapsible
          breakpoint={'lg'}
          collapsedWidth={64}
          onBreakpoint={() => console.info('1111')}
        >
          <div
            style={{
              height: '200px',
              lineHeight: '200px',
              textAlign: 'center',
              background: '#11b4ff',
            }}
          >
            Aside
          </div>
        </Aside>
      </div>
    );
  }
}
