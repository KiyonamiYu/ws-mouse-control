import React, { useState, useEffect } from 'react';
import { w3cwebsocket, IMessageEvent } from 'websocket';

import View from './index-view';

import ContainerProps from './interface/container-props';
import { OriginMouse } from './interface';

import Mouse from './class/mouse';

import { WEBSOCKET_SITE } from './constants';
import MouseEventType from './constants/mouse-event-type';

function wsOnOpen(client: w3cwebsocket): () => void {
	return (): void => {
		// client.send('test');
		console.log('client connect server success!');
	};
}

function wsOnMessage(
	setNowMouse: React.Dispatch<React.SetStateAction<Mouse>>,
): (message: IMessageEvent) => void {
	return ({ data }: IMessageEvent): void => {
		console.log(data);

		const mouseData: OriginMouse = JSON.parse(data as string);
		switch (mouseData.type) {
			case MouseEventType.MOUSE_MOVE:
				setNowMouse(
					new Mouse(mouseData.id, mouseData.type, mouseData.x, mouseData.y),
				);
				break;
		}
	};
}

export default function Container(props: ContainerProps): JSX.Element {
	const { children } = props;

	const [nowMouse, setNowMouse] = useState(new Mouse(-1, -1, -1, -1));
	const [mouseList, setMouseList] = useState(new Array<Mouse>());

	useEffect(() => {
		const client = new w3cwebsocket(WEBSOCKET_SITE);
		client.onopen = wsOnOpen(client);
		client.onmessage = wsOnMessage(setNowMouse);

		return (): void => {
			client.close();
		};
	}, []);

	useEffect(() => {
		const newMouseList = new Array<Mouse>();
		let foundFlag = false;
		// 更新鼠标
		for (const mouse of mouseList) {
			if (!foundFlag && mouse.getId() === nowMouse.getId()) {
				mouse.setX(nowMouse.getX());
				mouse.setY(nowMouse.getY());
				foundFlag = true;
			}
			newMouseList.push(mouse);
		}
		// 新增鼠标
		if (!foundFlag) {
			newMouseList.push(nowMouse);
		}
		setMouseList(newMouseList);
	}, [nowMouse]);

	return <View mouseList={mouseList}>{children}</View>;
}
