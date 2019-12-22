import React from 'react';
import View from './index-view';

import ContainerProps from './interface/container-props';

export default function Container(props: ContainerProps): JSX.Element {
	const { children } = props;
	return <View>{children}</View>;
}
