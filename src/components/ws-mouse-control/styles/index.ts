import styled from 'styled-components';

// import { MouseCircleProps } from '../interface/style';
import { WS_MOUSE_CONTROL_PANEL } from '../constants';

export const WsMouseControlPanel = styled.div.attrs({
	id: WS_MOUSE_CONTROL_PANEL,
})`
	position: relative;
	// margin: 0 auto;
	// width: 1200px;
	// height: 800px;
	// top: 100px;
	// background: rgb(172, 168, 168);
`;

// export const MouseCircle = styled.div`
// 	position: absolute;
// 	top: ${(props: MouseCircleProps): number => props.y}px;
// 	left: ${(props: MouseCircleProps): number => props.x}px;
// 	height: 15px;
// 	width: 15px;
// 	border-radius: 50%;
// 	background: ${(props: MouseCircleProps): string => props.color};
// 	z-index: 9999;
// `;
