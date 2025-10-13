import { Checkbox, type CheckboxProps } from "@mantine/core";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export function ControlledCheckbox<FormValues extends FieldValues>(
	props: CheckboxProps & {
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
					<Checkbox
						{...rest}
						{...field}
						checked={field.value}
						error={t(fieldState.error?.message || "")}
					/>
				);
			}}
		/>
	);
}
