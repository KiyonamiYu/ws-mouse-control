import React from 'react';
import { Modal, Tree } from 'antd';
import ViewProps from './interface/view-props';
import { WsMouseControlPanel } from './styles';
import MouseCanvas from './mouse-canvas';
import MouseEventType from './constants/mouse-event-type';
import Mouse from './class/mouse';
const { TreeNode } = Tree;
const TREE_KEY_SEPERATE = '-';

let checkedTreeKeys: string[] = [];

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

/**
 * 获得节点的 key
 * @param mouse
 * @param authId
 */
function getAuthTreeKey(mouse: Mouse, authId: MouseEventType): string {
	return `${mouse.getId()}${TREE_KEY_SEPERATE}${authId}`;
}

/**
 * 初始化默认选中 key
 * @param mouseList
 */
function getDefaultTreeCheckedKeys(mouseList: Mouse[]): string[] {
	const defaultCheckedKeys: string[] = [];
	for (const mouse of mouseList) {
		for (const authId of mouse.getAuths()) {
			defaultCheckedKeys.push(getAuthTreeKey(mouse, authId));
		}
	}
	checkedTreeKeys = defaultCheckedKeys;
	return defaultCheckedKeys;
}

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

function getMouseById(mouseList: Mouse[], mouseIdStr: string): Mouse | null {
	const mouseId = parseInt(mouseIdStr);
	for (const mouse of mouseList) {
		if (mouse.getId() === mouseId) {
			return mouse;
		}
	}
	return null;
}

export default function View(props: ViewProps): JSX.Element {
	const { children, mouseList, authModalVisible, setAuthModalVisible } = props;

	return (
		<WsMouseControlPanel>
			<MouseCanvas mouseList={mouseList} />

			{children}

			<Modal
				title="分配权限"
				visible={!authModalVisible}
				onOk={(): void => {
					checkedTreeKeys.forEach(key => {
						const nums = key.split(TREE_KEY_SEPERATE);
						if (nums.length === 1) {
							return;
						}
						const mouse: Mouse = getMouseById(mouseList, nums[0]) as Mouse;
						for (let i = 1; i < nums.length; i++) {
							mouse.addAuth(parseInt(nums[i]));
						}
					});
					setAuthModalVisible(false);
				}}
				onCancel={(): void => {
					setAuthModalVisible(false);
				}}
			>
				<Tree
					checkable
					onCheck={onTreeChecked}
					defaultCheckedKeys={getDefaultTreeCheckedKeys(mouseList)}
				>
					{mouseList.map(mouse => {
						return (
							<TreeNode title={mouse.getId()} key={`${mouse.getId()}`}>
								{Object.values(MouseEventType).map(authId =>
									typeof authId !== 'string' ? (
										<TreeNode
											title={getMouseEventTypeZh(authId)}
											key={getAuthTreeKey(mouse, authId)}
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
