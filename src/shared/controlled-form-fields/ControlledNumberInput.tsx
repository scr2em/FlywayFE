import { NumberInput, type NumberInputProps } from "@mantine/core";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export function ControlledNumberInput<FormValues extends FieldValues>(
	props: NumberInputProps & {
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
					<NumberInput
						{...rest}
						{...field}
						error={t(fieldState.error?.message || "")}
					/>
				);
			}}
		/>
	);
}
