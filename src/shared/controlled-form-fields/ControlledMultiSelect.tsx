import {  MultiSelect, type MultiSelectProps } from "@mantine/core";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";


export function ControlledMultiSelect<
	T extends { label: string; value: string },
	FormValues extends FieldValues,
>(
	props: MultiSelectProps & {
		control: Control<FormValues>;
		name: Path<FormValues>;
		options: T[];
	},
) {
	const { control, name, options, ...rest } = props;

	const { t } = useTranslation();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => {
		
				return (
					<MultiSelect
						{...rest}
						{...field}
						value={field.value}
						data={options}
						error={t(fieldState.error?.message || "")}
					/>
				);
			}}
		/>
	);
}
