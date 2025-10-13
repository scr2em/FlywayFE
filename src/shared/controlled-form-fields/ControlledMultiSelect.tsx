import { Loader, MultiSelect, type MultiSelectProps } from "@mantine/core";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { usePermissionsQuery } from "../api/queries/role";


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



export function ControlledPermissionsMultiSelect<FormValues extends FieldValues>(
	props: MultiSelectProps & {
		control: Control<FormValues>;
		name: Path<FormValues>;
	},
) {
	const { control, name, ...rest } = props;
	const {
		data: permissions,
		isPending,
		isError,
	} = usePermissionsQuery();



	if(isPending ) {
		return <Loader />;
	}
	if (isError) {
		return <>error fetching permissions</>;
	}
	const options = permissions.map((permission) => ({
		value: permission.code,
		label: permission.name,
	})) 

	return (
		<ControlledMultiSelect
			control={control}
			name={name}
			disabled={isPending}
			options={options}
			{...rest}

		/>
	);
}
