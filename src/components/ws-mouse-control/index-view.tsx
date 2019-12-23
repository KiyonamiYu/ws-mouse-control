import React from 'react';
import { Modal, Tree } from 'antd';
import ViewProps from './interface/view-props';
import { WsMouseControlPanel } from './styles';
import MouseCanvas from './mouse-canvas';

const { TreeNode } = Tree;

export default function View(props: ViewProps): JSX.Element {
	const { children, mouseList, authModalVisible, setAuthModalVisible } = props;
	return (
		<WsMouseControlPanel>
			<MouseCanvas mouseList={mouseList} />
			{children}
			<Modal
				title="分配权限"
				visible={authModalVisible}
				onOk={(): void => {
					setAuthModalVisible(false);
				}}
				onCancel={(): void => {
					setAuthModalVisible(false);
				}}
			>
				<Tree
					checkable
					defaultSelectedKeys={['0-0-0', '0-0-1']}
					defaultCheckedKeys={['0-0-0', '0-0-1']}
					// onSelect={this.onSelect}
					// onCheck={this.onCheck}
				>
					<TreeNode title="parent 1" key="0-0">
						<TreeNode title="parent 1-0" key="0-0-0" disabled>
							<TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
							<TreeNode title="leaf" key="0-0-0-1" />
						</TreeNode>
						<TreeNode title="parent 1-1" key="0-0-1">
							<TreeNode
								title={<span style={{ color: '#1890ff' }}>sss</span>}
								key="0-0-1-0"
							/>
						</TreeNode>
					</TreeNode>
				</Tree>
			</Modal>
		</WsMouseControlPanel>
	);
}
