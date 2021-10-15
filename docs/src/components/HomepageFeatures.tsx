/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";
import { useThemeContext } from "@theme/hooks/useThemeContext";
import { Stack, Text } from "@fluentui/react";

type FeatureItem = {
  heading: string;
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    heading: "Client App",
    title: "React",
    image: "img/tech-logos/react.png",
    description: (
      <>
        Extend or modify Based's React template to create a rich client UI for
        your dApp
      </>
    ),
  },
  {
    heading: "Terra Smart Contracts",
    title: "Rust",
    image: "img/tech-logos/rust.png",
    description: (
      <>
        Re-compose modular smart contracts written in Rust for rapid iteration
        and experimentation
      </>
    ),
  },
  {
    heading: "Deployment",
    title: "Docker",
    image: "img/tech-logos/docker.png",
    description: (
      <>
        Run a local Terra node inside a Docker container and abstract away
        cross-platform environment issues
      </>
    ),
  },
];

function Feature({ heading, title, image, description }: FeatureItem) {
  return (
    <div className={clsx(`${styles.featureCol} col col--4`)}>
      <Stack horizontalAlign="center" grow={1}>
        <Text
          style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          variant="xxLarge"
          as="h3"
        >{heading}</Text>
      </Stack>
      <div className="text--center">
        <img className={styles.featureImg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h4>{title}</h4>
        <Text variant="large" as="p">{description}</Text>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  // const { isDarkTheme } = useThemeContext();
  return (
    <section
      className={styles.features}
    >
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
