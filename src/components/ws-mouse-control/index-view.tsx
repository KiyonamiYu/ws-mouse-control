import React from 'react';
import { Modal, Tree } from 'antd';
import ViewProps from './interface/view-props';
import { WsMouseControlPanel } from './styles';
import MouseCanvas from './mouse-canvas';
import MouseEventType from './constants/mouse-event-type';
import Mouse from './class/mouse';
const { TreeNode } = Tree;
const TREE_KEY_SEPERATE = '-';

function getMouseEventTypeZh(num: MouseEventType): string {
	switch (num) {
		case MouseEventType.MOUSE_MOVE:
			return '鼠标移动';
		case MouseEventType.MOUSE_LEFT_CLICK:
			return '鼠标左键点击';
		case MouseEventType.MOUSE_RIGHT_CLICK:
			return '鼠标右键点击';
		default:
			return '';
	}
}

let checkedTreeKeys: string[] = [];

function onTreeChecked(
	checkedKeys:
		| string[]
		| {
				checked: string[];
				halfChecked: string[];
		  },
): void {
	checkedTreeKeys = checkedKeys as string[];
}

export default function View(props: ViewProps): JSX.Element {
	const { children, mouseList, authModalVisible, setAuthModalVisible } = props;

	// const testArr = [new Mouse(1, 3, 1, 1), new Mouse(2, 4, 2, 2)];

	return (
		<WsMouseControlPanel>
			<MouseCanvas mouseList={mouseList} />

			{children}

			<Modal
				title="分配权限"
				visible={authModalVisible}
				onOk={(): void => {
					checkedTreeKeys.forEach(key => {
						const nums = key.split(TREE_KEY_SEPERATE);
						console.log(nums);
						if (nums.length === 1) {
							return;
						}
					});
					setAuthModalVisible(false);
				}}
				onCancel={(): void => {
					setAuthModalVisible(false);
				}}
			>
				<Tree checkable onCheck={onTreeChecked}>
					{mouseList.map(mouse => {
						return (
							<TreeNode title={mouse.getId()} key={`${mouse.getId()}`}>
								{Object.values(MouseEventType).map(num =>
									typeof num !== 'string' ? (
										<TreeNode
											title={getMouseEventTypeZh(num)}
											key={`${mouse.getId()}${TREE_KEY_SEPERATE}${num}`}
										/>
									) : null,
								)}
							</TreeNode>
						);
					})}
				</Tree>
			</Modal>
		</WsMouseControlPanel>
	);
}
