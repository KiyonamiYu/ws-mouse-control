import React from 'react';
import ViewProps from './interface/view-props';
import { WsMouseControlPanel, MouseCircle } from './styles';

export default function View(props: ViewProps): JSX.Element {
	const { children, mouseList } = props;
	return (
		<WsMouseControlPanel>
			{children}
			{mouseList.map(item => {
				if (item.getId() < 0) {
					return;
				}
				return (
					<MouseCircle
						x={item.getX()}
						y={item.getY()}
						color={item.getColor()}
						key={item.getId()}
					/>
				);
			})}
		</WsMouseControlPanel>
	);
}
