import { PasswordInput, type PasswordInputProps } from "@mantine/core";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export function ControlledPasswordInput<FormValues extends FieldValues>(
	props: PasswordInputProps & {
		control: Control<FormValues>;
		name: Path<FormValues>;
	},
) {
	const { control, name, ...rest } = props;
	const { t } = useTranslation();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => {
				return (
					<PasswordInput
						{...rest}
						{...field}
						error={t(fieldState.error?.message || "")}
					/>
				);
			}}
		/>
	);
}
