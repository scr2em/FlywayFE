import { Group, Radio, type RadioGroupProps } from "@mantine/core";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export function ControlledRadioGroup<
	T extends { value: string; label: string },
	FormValues extends FieldValues,
>(
	props: Omit<RadioGroupProps, "children"> & {
		options: T[];
		control: Control<FormValues>;
		name: Path<FormValues>;
		onValueChangeSideEffect?: (newValue: T["value"] | undefined) => void;
		disabled?: boolean;
	},
) {
	const { options, control, name, ...rest } = props;
	const { t } = useTranslation();
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => {
				return (
					<Radio.Group
						{...rest}
						{...field}
						error={t(fieldState.error?.message || "")}
						onChange={(newValue) => {
							field.onChange(newValue);
							props.onValueChangeSideEffect?.(newValue);
						}}
					>
						<Group mt="xs">
							{options.map((option) => {
								return (
									<Radio
										disabled={props.disabled}
										key={option.value}
										value={option.value}
										label={option.label}
									/>
								);
							})}
						</Group>
					</Radio.Group>
				);
			}}
		/>
	);
}
