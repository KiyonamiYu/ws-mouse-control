import React from 'react';
import ViewProps from './interface/view-props';

export default function View(props: ViewProps): JSX.Element {
	const { children } = props;
	return <div>{children}</div>;
}
