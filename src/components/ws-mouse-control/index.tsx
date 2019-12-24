import React, { useState, useEffect } from 'react';
import { w3cwebsocket, IMessageEvent } from 'websocket';

import View from './index-view';

import ContainerProps from './interface/container-props';
import { OriginMouse } from './interface';

import Mouse from './class/mouse';

import { WEBSOCKET_SITE } from './constants';
import MouseEventType from './constants/mouse-event-type';

function mouseLeftClick(mouseData: OriginMouse): void {
	const elements: Element[] = document.elementsFromPoint(
		mouseData.x,
		mouseData.y,
	);

	for (const element of elements) {
		if (element instanceof HTMLElement) {
			const x1 = element.offsetLeft;
			const x2 = x1 + element.offsetWidth;
			const y1 = element.offsetTop;
			const y2 = y1 + element.offsetHeight;
			if (
				mouseData.x >= x1 &&
				mouseData.x <= x2 &&
				mouseData.y >= y1 &&
				mouseData.y <= y2
			) {
				element.click();
				break;
			}
		}
	}
}

function getNowMouse(mouseList: Mouse[], mouseData: OriginMouse): Mouse {
	for (const mouse of mouseList) {
		if (mouseData.id === mouse.getId()) {
			return mouse;
		}
	}
	return new Mouse(mouseData.id, mouseData.x, mouseData.y);
}

function setMouseListHOC(
	nowMouse: Mouse,
	mouseList: Mouse[],
	setMouseList: React.Dispatch<React.SetStateAction<Mouse[]>>,
): void {
	const result: Mouse[] = [];
	let foundFlag = false;
	for (const mouse of mouseList) {
		if (nowMouse.getId() === mouse.getId()) {
			result.push(nowMouse);
			foundFlag = true;
		} else {
			result.push(mouse);
		}
	}
	if (!foundFlag) {
		result.push(nowMouse);
	}
	setMouseList(result);
}

function wsOnOpen(client: w3cwebsocket): () => void {
	return (): void => {
		// client.send('test');
		console.log('client connect server success!');
	};
}

function wsOnMessage(
	setWsMessage: React.Dispatch<React.SetStateAction<string>>,
): (message: IMessageEvent) => void {
	return ({ data }: IMessageEvent): void => {
		setWsMessage(data as string);
	};
}

export default function Container(props: ContainerProps): JSX.Element {
	const { children } = props;

	const [wsMessage, setWsMessage] = useState('');
	const [mouseList, setMouseList] = useState(new Array<Mouse>());
	const [authModalVisible, setAuthModalVisible] = useState(false);

	useEffect(() => {
		const client = new w3cwebsocket(WEBSOCKET_SITE);
		client.onopen = wsOnOpen(client);
		client.onmessage = wsOnMessage(setWsMessage);

		return (): void => {
			client.close();
		};
	}, []);

	useEffect(() => {
		if (wsMessage === '') {
			return;
		}
		console.log(wsMessage);
		const mouseData: OriginMouse = JSON.parse(wsMessage);
		const nowMouse: Mouse = getNowMouse(mouseList, mouseData);
		switch (mouseData.type) {
			// case 1 : 鼠标移动
			case MouseEventType.MOUSE_MOVE:
				if (nowMouse.hasAuth(MouseEventType.MOUSE_MOVE)) {
					nowMouse.setXY(mouseData.x, mouseData.y);
				}
				break;
			// case 2 ：鼠标左击（需要权限）
			case MouseEventType.MOUSE_LEFT_CLICK:
				if (nowMouse.hasAuth(MouseEventType.MOUSE_LEFT_CLICK)) {
					mouseLeftClick(mouseData);
				}
				break;
			// case 3 : 鼠标右击（需要权限）
			case MouseEventType.MOUSE_RIGHT_CLICK:
				// TODO 暂时只有第一个鼠标才有分配其他权限的权限
				if (mouseList.length > 0 && mouseData.id === mouseList[0].getId()) {
					setAuthModalVisible(true);
				}
		}
		setMouseListHOC(nowMouse, mouseList, setMouseList);
	}, [wsMessage]);

	return (
		<View
			mouseList={mouseList}
			authModalVisible={authModalVisible}
			setAuthModalVisible={setAuthModalVisible}
		>
			{children}
		</View>
	);
}
