import { Button } from 'antd';
import * as React from 'react';

export interface RoundButtonProps {
	onClick: (event: React.FormEvent) => void;
	text: string;
	type: 'ghost' | 'default' | 'primary' | 'dashed' | 'danger' | undefined;
}

const RoundButton = (props: RoundButtonProps) => {
	return (
		<div className="RoundButton__Main">
			<Button
				type={props.type}
				onClick={props.onClick}
				style={{
					height: '40px',
					fontSize: '12px',
					fontWeight: 'bold',
					borderRadius: '25px',
					paddingLeft: '30px',
					paddingRight: '30px'
				}}
			>
				{props.text}
			</Button>
		</div>
	);
};

export default RoundButton;
