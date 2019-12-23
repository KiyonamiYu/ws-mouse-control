import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
export default function HooksTest(): JSX.Element {
	const [myArr, setMyArr] = useState(new Array<number>());
	useEffect(() => {
		console.log('1. 组件挂载完成！');
	}, []);

	useEffect(() => {
		console.log('2. useEffect 都会执行');
	});

	console.log('3. 函数内部-console', myArr);

	return (
		<div>
			Hooks Test
			<Button
				onClick={(): void => {
					setMyArr([myArr.length, ...myArr]);
				}}
			>
				+1
			</Button>
		</div>
	);
}

// 刚加载：3, 1, 2
// 更改状态：3, 2
