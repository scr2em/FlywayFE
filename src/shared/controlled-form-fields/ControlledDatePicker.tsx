import { DatePickerInput, type DatePickerInputProps } from "@mantine/dates";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export function ControlledDatePicker<FormValues extends FieldValues>(
	props: DatePickerInputProps & {
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
					<DatePickerInput
						valueFormat="D MMM YYYY"
						{...rest}
						{...field}
						error={t(fieldState.error?.message || "")}
						onChange={(value) => {
							if (typeof value === "string") {
								field.onChange(new Date(value));
							} else {
								field.onChange(value);
							}
						}}
					/>
				);
			}}
		/>
	);
}
