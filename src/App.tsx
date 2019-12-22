import React, { Fragment } from 'react';
import { Button } from 'antd';
import WsMouseControl from './components/ws-mouse-control';
const App: React.FC = () => {
	return (
		<Fragment>
			<WsMouseControl>
				<Button type="primary">Helllo World!</Button>
				hello world
			</WsMouseControl>
		</Fragment>
	);
};

export default App;
