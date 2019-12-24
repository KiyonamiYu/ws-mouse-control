import React, { useRef, useEffect } from 'react';
import MouseCanvasProps from './interface/mouse-canvas-props';
import Mouse from './class/mouse';

/**
 * 初始化 canvas
 * @param canvasEle
 */
function initCanvas(
	canvasEle: React.MutableRefObject<HTMLCanvasElement>,
): void {
	// 初始化自定义层级
	const canvas = canvasEle.current;
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	canvas.style.background = 'rgba(0, 0, 0, 0.2)';
}

/**
 * canvas 画鼠标圆
 */
const CIRCLE_RADIUS = 10;
function drawCircle(context: CanvasRenderingContext2D, mouse: Mouse): void {
	context.clearRect(
		0,
		0,
		document.body.clientWidth,
		document.body.clientHeight,
	);
	context.beginPath();
	context.arc(mouse.getX(), mouse.getY(), CIRCLE_RADIUS, 0, Math.PI * 2);
	context.closePath();
	context.shadowColor = '#aaa';
	context.shadowOffsetX = 2;
	context.shadowOffsetY = 2;
	context.shadowBlur = 5;
	context.fillStyle = mouse.getColor();
	context.fill();
}

export default function MouseCanvas(props: MouseCanvasProps): JSX.Element {
	const { mouseList } = props;
	const cnavasEle: React.MutableRefObject<HTMLCanvasElement> = useRef(
		document.createElement('canvas'),
	);

	useEffect(() => {
		initCanvas(cnavasEle);
	}, []);

	useEffect(() => {
		const canvas: HTMLCanvasElement = cnavasEle.current;
		const canvasCtx: CanvasRenderingContext2D | null = canvas.getContext('2d');
		if (canvasCtx == null) {
			console.log('canvas context is null!');
			return;
		}
		mouseList.forEach(item => {
			drawCircle(canvasCtx, item);
		});
	});

	return (
		<canvas
			ref={cnavasEle}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				zIndex: 999999,
			}}
		></canvas>
	);
}
