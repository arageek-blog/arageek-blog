import type { FormControlProps } from '@chakra-ui/react';
import { FormLabel, Icon } from '@chakra-ui/react';
import type {
  ChakraStylesConfig,
  SelectComponentsConfig,
} from 'chakra-react-select';
import { chakraComponents, Select } from 'chakra-react-select';
import { ArrowDown2, CloseCircle } from 'iconsax-react';

import { useField } from 'formik';
import { FormControl } from './';

const chakraStyles: ChakraStylesConfig = {
  valueContainer: (provided, state) => ({
    ...provided,

    paddingInlineStart: 0,
    paddingBlockStart: '1.125rem',
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: 3,
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    height: '50%',
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    height: 'auto',
    width: 'auto',
    fontSize: 'lg',
    ':hover': {
      background: 'transparent',
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    paddingInlineStart: 1,
    fontSize: 'lg',
  }),
};

const components: SelectComponentsConfig = {
  ClearIndicator: (props) => (
    <chakraComponents.ClearIndicator {...props}>
      <Icon as={CloseCircle} />
    </chakraComponents.ClearIndicator>
  ),
  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={ArrowDown2} />
    </chakraComponents.DropdownIndicator>
  ),
};

interface Props {
  name: string;
  label: string;
  options: any[];
  isMulti?: boolean;
  isClearable?: boolean;
  helpText?: string;
}

export const SelectExtended: React.FC<Props & FormControlProps> = ({
  name,
  helpText,
  label,
  isMulti,
  isClearable = false,
  options = [],
  ...rest
}) => {
  const [field, , { setValue, setTouched }] = useField(name);

  const onChange = (value) => {
    if (isMulti) {
      const values = value?.map(({ value }) => value);
      setValue(values);
    } else {
      setValue(value?.value || '');
    }
  };

  const getValue = ():
    | { label: string; value: string }
    | readonly { label: string; value: string }[] => {
    if (options) {
      if (isMulti) {
        return options?.filter(({ value }) => field.value?.includes(value));
      } else {
        return options?.find(({ value }) => value === field?.value);
      }
    } else {
      return isMulti ? [] : ('' as any);
    }
  };

  const inputValue = isMulti
    ? field?.value?.map((value) => value)?.join('|')
    : field?.value?.value;

  return (
    <FormControl name={name} helpText={helpText} {...rest}>
      <Select
        chakraStyles={chakraStyles}
        components={components}
        name={name}
        options={options}
        placeholder=' '
        closeMenuOnSelect={false}
        isMulti={isMulti}
        isClearable={isClearable}
        noOptionsMessage={() => 'لا يوجد خيارات'}
        loadingMessage={() => 'جاري التحميل'}
        value={getValue()}
        onChange={onChange}
        onBlur={() => {
          setTouched(true);
        }}
      />
      <FormLabel data-has-value={Boolean(inputValue)}>{label}</FormLabel>
    </FormControl>
  );
};
