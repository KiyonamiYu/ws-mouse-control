import React, { Fragment } from 'react';
import { Button } from 'antd';
import WsMouseControl from './components/ws-mouse-control';
// import HooksTest from './components/hooks-test';
const App: React.FC = () => {
	return (
		<Fragment>
			<WsMouseControl>
				<Button type="primary">Helllo World!</Button>
			</WsMouseControl>
			{/* <HooksTest /> */}
		</Fragment>
	);
};

export default App;
