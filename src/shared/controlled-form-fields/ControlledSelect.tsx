import { Select, type SelectProps } from "@mantine/core";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRolesQuery } from "../api/queries/role";


export function ControlledSelect<
	T extends { label: string; value: string },
	FormValues extends FieldValues,
>(
	props: SelectProps & {
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
					<Select
						{...rest}
						{...field}
						data={options}
						error={t(fieldState.error?.message || "")}
					/>
				);
			}}
		/>
	);
}

export function ControlledRolesSelect<FormValues extends FieldValues>(
	props: SelectProps & {
		control: Control<FormValues>;
		name: Path<FormValues>;
	},
) {
	const { control, name, ...rest } = props;
	const { data: roles, isPending: isLoadingRoles, isError } = useRolesQuery();

	if (isLoadingRoles) {
		return <>loading roles</>;
	}
	if (isError) {
		return <>error fetching roles</>;
	}

	const options = roles?.map((role) => ({
		value: role.id,
		label: role.name,
	}));
	return (
		<ControlledSelect
			control={control}
			name={name}
			options={options}
			{...rest}
		/>
	);
}