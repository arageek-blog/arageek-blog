import {
  AspectRatio,
  Center,
  Flex,
  FormLabel,
  Icon,
  IconButton,
  Image,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { ALLOWEDFILETYPE } from 'configs/imageTypes';
import { useField } from 'formik';
import { Gallery, Trash } from 'iconsax-react';
import { memo, useRef } from 'react';
import { useDropArea } from 'react-use';
import { FormControl } from './';

interface Props {
  name: string;
  label: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  helpText?: string;
  fileValidateTypeLabelExpectedTypes?: string;
  labelFileTypeNotAllowed?: string;
}

const Upload: React.FC<Props> = ({ name, label, ...rest }) => {
  const uploaderEl = useRef<HTMLInputElement>(null);
  const [field, { error, touched }, { setValue }] = useField(name);

  const handleFileProcess = (file: File) => {
    const { size, type } = file;
    const fileSize = size / 1024 / 1024;
    const isValid = ALLOWEDFILETYPE.includes(type);

    if (fileSize > 1 || !isValid) {
      return;
    }

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.addEventListener(
      'load',
      () => {
        setValue(reader.result);
      },
      false,
    );
  };

  const [bond, { over }] = useDropArea({
    onFiles: (files) => {
      const file = files?.[0];
      if (file) {
        handleFileProcess(file);
      }
    },
  });

  const isInvalid = !!error && touched;

  const handleUploaderInput: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event?.currentTarget?.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDelete = () => {
    setValue('');
    if (uploaderEl.current) {
      uploaderEl.current.value = '';
      uploaderEl.current.type = '';
      uploaderEl.current.type = 'file';
    }
  };

  const { value } = field;

  return (
    <FormControl name={name} {...rest} isCenter>
      <VisuallyHiddenInput
        ref={uploaderEl}
        size={1000000}
        accept={ALLOWEDFILETYPE?.join(',')}
        type='file'
        onChange={handleUploaderInput}
      />
      <VisuallyHiddenInput type='text' value={value ?? ''} {...field} />
      <AspectRatio
        {...bond}
        ratio={1}
        backgroundColor={over ? 'gray.200' : 'gray.100'}
        transitionProperty='common'
        transitionDuration='normal'
        transitionTimingFunction={'ease-in-out'}
        borderRadius='full'
        overflow={'hidden'}
        cursor={value ? 'default' : 'pointer'}
        onClick={() => {
          if (!Boolean(value)) {
            uploaderEl.current.click();
          }
        }}
      >
        <Center role={'group'}>
          {value ? (
            <ImageValueWrapper src={value} onDelete={handleDelete} />
          ) : (
            <Icon as={Gallery} boxSize='12' />
          )}
        </Center>
      </AspectRatio>

      <FormLabel
        mt={2}
        mb={-2}
        mx={0}
        className='isStatic'
        textAlign='center'
        onClick={() => {
          uploaderEl.current.click();
        }}
      >
        {label}
      </FormLabel>
    </FormControl>
  );
};

interface ImageValueWrapperProps {
  src: string;
  onDelete: () => void;
}

const ImageValueWrapper: React.FC<ImageValueWrapperProps> = ({
  src,
  onDelete,
}) => {
  return (
    <>
      <Image src={src} alt='صورة المستخدم' height={'full'} objectFit='cover' />
      <Flex
        w='full'
        h='full'
        inset={0}
        pos='absolute'
        justify={'center'}
        align='flex-end'
        zIndex={1}
        p={2}
        bgGradient='linear(to-t, rgba(0,0,0,0.75) 0%,transparent 50%, transparent 100%)'
        visibility={{ md: 'hidden' }}
        opacity={{ md: 0 }}
        transitionProperty='common'
        transitionDuration='normal'
        transitionTimingFunction={'ease-in-out'}
        _groupHover={{
          opacity: 1,
          visibility: 'visible',
        }}
      >
        <IconButton
          icon={<Icon as={Trash} />}
          aria-label='حذف الصورة'
          colorScheme='red'
          size={'sm'}
          onClick={onDelete}
        />
      </Flex>
    </>
  );
};

export const ImageUpload = memo(Upload);
