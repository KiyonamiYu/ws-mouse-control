import { C_SHARP_WIDTH, C_SHARP_HEIGHT } from '../constants';
import MouseEventType from '../constants/mouse-event-type';
export default class Mouse {
	private id: number;
	private type: number;
	private color: string;
	private x: number;
	private y: number;
	private auths: number[];

	constructor(id: number, type: number, x: number, y: number) {
		this.id = id;
		this.type = type;

		this.x = x / (C_SHARP_WIDTH / document.body.clientWidth);
		this.y = y / (C_SHARP_HEIGHT / document.body.clientHeight);

		this.color = this.randomColor();

		this.auths = [];
	}

	addAuth(auth: MouseEventType): void {
		this.auths.push(auth);
	}

	getAuths(): number[] {
		return this.auths;
	}

	getId(): number {
		return this.id;
	}

	getX(): number {
		return this.x;
	}

	getY(): number {
		return this.y;
	}

	getColor(): string {
		return this.color;
	}

	setX(x: number): void {
		this.x = x;
	}

	setY(y: number): void {
		this.y = y;
	}

	private randomColor(): string {
		const digits = new Array<string>(6)
			.fill('')
			.map(() => Math.floor(Math.random() * 15).toString(16));
		return `#${digits.join('')}`;
	}
}
