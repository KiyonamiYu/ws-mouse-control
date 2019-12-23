import { ReactNode } from 'react';
import Mouse from '../class/mouse';

export default interface ViewProps {
	children: ReactNode;
	mouseList: Array<Mouse>;
}
