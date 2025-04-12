import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '실시간 트래픽 제어',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        NetFUNNEL은 트래픽 폭주 상황에서 실시간으로 진입 제어를 수행하여 시스템을 안정적으로 보호합니다.
      </>
    ),
  },
  {
    title: '간편한 연동',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        간단한 초기화 함수 호출만으로 다양한 플랫폼(iOS, Android, Web)에서 에이전트를 연동할 수 있습니다.
      </>
    ),
  },
  {
    title: '강력한 커스터마이징',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        템플릿 사용 또는 직접 구현을 통해 대기 화면, 메시지, 스타일을 자유롭게 커스터마이징할 수 있습니다.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
