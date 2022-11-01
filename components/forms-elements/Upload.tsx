import { Box, FormLabel } from '@chakra-ui/react';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import { useField } from 'formik';
import { memo } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import { FormControl } from './';

interface Props {
	name: string;
	label: string;
	placeholder: string;
	isRequired?: boolean;
	isDisabled?: boolean;
	helpText?: string;
	fileValidateTypeLabelExpectedTypes?: string;
	labelFileTypeNotAllowed?: string;
	isMulti?: boolean;
	maxFiles?: number | null;
	maxFilesize?: string;
	accept?: string[];
}

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const NormalUpload: React.FC<Props> = ({
	name,
	placeholder,
	label,
	helpText,
	fileValidateTypeLabelExpectedTypes,
	labelFileTypeNotAllowed,
	isMulti = false,
	maxFiles,
	maxFilesize = '10MB',
	accept,
	...rest
}) => {
	const [{ value, onBlur }, { error, touched }, { setValue, setTouched }] = useField(name);

	const isInvalid = !!error && touched;

	return (
		<FormControl
			name={name}
			{...rest}
		>
			<FormLabel
				className='static'
				mb={4}
			>
				{label}
			</FormLabel>
			<Box
				className={isInvalid ? 'filepond-error' : 'filepond-normal'}
				sx={{
					'.filepond--root': {
						fontFamily: 'body'
					},
					'.filepond--drop-label': {
						color: 'inherit',
						cursor: 'pointer'
					},
					'.filepond--panel-root': {
						cursor: 'pointer',
						borderRadius: 'md',
						backgroundColor: isInvalid ? 'red.100' : 'gray.100'
					},
					'.filepond--item-panel': {
						borderRadius: 0,
						backgroundColor: 'light.500',
						color: 'white'
					},
					'[data-filepond-item-state*=error] .filepond--item-panel, [data-filepond-item-state*=invalid] .filepond--item-panel':
						{
							backgroundColor: 'red.500'
						},
					'.filepond--file-action-button': {
						cursor: 'pointer',
						backgroundColor: 'light.600'
					},
					'[data-filepond-item-state*=error] .filepond--file-action-button, [data-filepond-item-state*=invalid] .filepond--file-action-button':
						{
							backgroundColor: 'red.600'
						}
				}}
			>
				<FilePond
					files={value}
					onupdatefiles={fileItems => {
						setValue(fileItems.map(fileItem => fileItem.file));
						setTouched(true);
					}}
					required={rest?.isRequired}
					instantUpload={false}
					allowMultiple={isMulti}
					// onblur={onBlur}
					maxFiles={maxFiles}
					maxFileSize={maxFilesize}
					acceptedFileTypes={accept}
					name={name}
					labelIdle={helpText}
					fileValidateTypeLabelExpectedTypes={fileValidateTypeLabelExpectedTypes}
					labelFileTypeNotAllowed={labelFileTypeNotAllowed}
					{...{ credits: false }}
				/>
			</Box>
		</FormControl>
	);
};

export const Upload = memo(NormalUpload);
