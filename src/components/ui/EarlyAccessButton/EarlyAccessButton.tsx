import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import * as React from 'react';

import { EarlyAccess } from 'models/EarlyAccess';

import { EARLY_ACCESS_ERROR_MESSAGE, EARLY_ACCESS_VALIDATION_ERROR_MESSAGE } from 'utils/Constants';

const InputGroup = Input.Group;

import './style.less';

export interface EarlyAccessButtonProps {
	handleEarlyAccessClick: (earlyAccess: EarlyAccess) => void;
	handleEarlyAccessValidationError: (error: any) => void;
}

type AllProps = EarlyAccessButtonProps & FormComponentProps;

class EarlyAccessButton extends React.Component<AllProps> {
	public handleSubmit = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.handleEarlyAccessClick({ emailAddress: values.email });
				this.props.form.resetFields();
			} else {
				this.props.handleEarlyAccessValidationError(err);
			}
		});
	};

	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="EarlyAccessButton__Main">
				<InputGroup compact={true}>
					{getFieldDecorator('email', {
						rules: [
							{
								type: 'email',
								message: EARLY_ACCESS_VALIDATION_ERROR_MESSAGE
							},
							{
								required: true,
								message: EARLY_ACCESS_ERROR_MESSAGE
							}
						]
					})(
						<Input
							className="EarlyAccessInput"
							type="email"
							style={{
								borderRadius: '25px',
								border: '2px solid #fefefe'
							}}
							placeholder="email"
						/>
					)}

					<Button
						className="EarlyAccessButton HiddenAtMd"
						style={{
							borderRadius: '25px',
							border: '2px solid #fefefe'
						}}
						onClick={this.handleSubmit}
					>
						Sign Up for Early Access
					</Button>

					<Button
						className="EarlyAccessIconButton ShowAtMd"
						style={{
							borderRadius: '25px',
							border: '1px solid #fefefe',
							height: '32px',
							width: '32px'
						}}
						onClick={this.handleSubmit}
						shape="circle"
						icon="login"
					/>
				</InputGroup>
			</div>
		);
	}
}

export default Form.create<EarlyAccessButtonProps>()(EarlyAccessButton);
