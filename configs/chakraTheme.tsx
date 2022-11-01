import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultProps
} from '@chakra-ui/react';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
  cssVarPrefix: 'arageek'
};

const activeLabelStyles = {
  transform: 'scale(0.75) translateY(-28px)',
  paddingInlineStart: 0
};

const theme = extendTheme(
  {
    config,
    semanticTokens: {
      fontSizes: {
        h1: '3xl',
        h2: '2xl',
        h3: 'xl',
        h4: 'lg',
        h5: 'lg',
        h6: 'lg'
      }
    },
    layerStyles: {
      bgShadow: {},
      textShadow: {}
    },
    styles: {
      global: {
        html: {
          '&:focus-within': {
            scrollBehavior: 'smooth'
          },
          body: {
            color: 'black'
          },

          'b,strong': {
            fontWeight: 'bold'
          },
          //! fix the bug for the toast icon
          '.chakra-alert': {
            '& button': {
              right: 'auto',
              left: 1
            }
          }
        }
      }
    },
    components: {
      Container: {
        baseStyle: {
          maxW: 'container.xl',
          px: { base: 4, xl: 16 }
        }
      },
      Divider: {
        baseStyle: {
          opacity: 1,
          borderColor: 'light.500',
          borderRad: '3xl'
        }
      },
      Accordion: {
        baseStyle: {
          container: {
            bgColor: 'light.500',
            py: 4,
            borderWidth: 0,
            rounded: 'md'
          },
          panel: {
            pb: 4
          }
        }
      },
      Tag: {
        sizes: {
          md: {
            container: {
              borderRadius: 'xl'
            }
          },
          lg: {
            container: {
              borderRadius: 'xl'
            }
          }
        }
      },
      Button: {
        baseStyle: {
          borderRadius: '3xl',
          '& svg': {
            width: '1.2em',
            height: '1.2em'
          }
        },
        defaultProps: {
          // colorScheme: "dark",
        },
        sizes: {},
        variants: {
          solid: props => {
            const { colorScheme: c } = props;

            return {
              ...(c === 'light' && { color: `${c}.900` })
            };
          },
          ghost: props => {
            const { colorScheme: c } = props;

            return {
              ...(c === 'light' && { color: `${c}.900` }),
              _hover: {
                bg: `${c}.500`
              }
            };
          },

          outline: props => {
            const { colorScheme: c } = props;

            return {
              ...(c === 'light' && { color: `${c}.900` }),
              borderColor: `${c}.500`,
              _hover: {
                bg: `${c}.500`
              }
            };
          }
        }
      },
      Link: {
        baseStyle: {
          position: 'relative',
          color: 'light.900',
          '&:hover': {
            textDecoration: 'none',
            ':before': {
              h: '100%'
            }
          }
        },
        variants: {
          unstyled: {},
          underline: {
            '&:before': {
              content: '""',
              width: 'full',
              h: '1px',
              bgColor: 'light.500',
              pos: 'absolute',
              insetX: 0,
              bottom: 0,
              zIndex: -1,
              transitionDuration: 'normal',
              transitionProperty: 'dimensions'
            },
            '&:hover': {
              ':before': {
                h: '100%'
              }
            }
          }
        }
      },
      Input: {
        defaultProps: {
          focusBorderColor: 'light.500'
        },
        baseStyle: {
          element: {
            w: 'auto'
          }
        }
      },
      Select: {
        defaultProps: {
          focusBorderColor: 'light.500'
        },
        baseStyle: {
          icon: {
            w: 'auto',
            right: 0,
            fontSize: 'lg'
          }
        }
      },
      PinInput: {
        defaultProps: {
          focusBorderColor: 'light.500'
        }
      },
      Textarea: {
        defaultProps: {
          focusBorderColor: 'light.500'
        }
      },
      FormLabel: {
        baseStyle: {
          // fontWeight: "bold",
          color: 'dark.600',
          fontSize: 'md',
          // mb: 4
          '&.isTop': {
            ...activeLabelStyles
          }
        }
      },
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                'label:not(.chakra-radio)': {
                  ...activeLabelStyles
                }
              },
              'input:not(:placeholder-shown) + label,textarea:not(:placeholder-shown) + label, select:not(:placeholder-shown) + label,label[data-has-value="true"]':
                {
                  ...activeLabelStyles
                },
              'label:not(.isStatic,.chakra-radio)': {
                top: 0,
                left: 0,
                zIndex: 2,
                position: 'absolute',
                // backgroundColor: 'white',
                pointerEvents: 'none',
                // mx: 3,
                // px: 1,
                my: 3,
                transformOrigin: 'left top'
              }
            }
          }
        }
      }
    },
    fonts: {
      body: "'IBM Plex Sans Arabic', sans-serif;",
      heading: "'IBM Plex Sans Arabic', sans-serif;"
    },

    // fontWeights: {},
    colors: {
      red: {
        400: '#E5126A',
        500: '#F34E4E'
      },
      blue: {
        500: '#2F80ED'
      },
      dark: {
        50: '#E7E5D81A',
        100: '#F4F5F6',
        200: '#C4C4C4',
        300: '#999999',
        500: '#000',
        600: '#55595F',
        700: '#333333'
      },
      light: {
        '500': '#F1EFE2',
        '600': '#DFDABC',
        '700': '#CCC596',
        '900': '#0B5C2D'
      }
    }
  },
  withDefaultColorScheme({ colorScheme: 'dark' }),
  withDefaultProps({
    defaultProps: {
      variant: 'flushed',
      size: 'lg'
    },
    components: [
      'Input',
      'NumberInput',
      'PinInput',
      'Textarea',
      'Select',
      'Slider',
      'Textarea'
    ]
  }),
  withDefaultProps({
    defaultProps: {
      variant: 'floating',
      size: 'lg'
    },
    components: ['Form']
  }),
  withDefaultProps({
    defaultProps: {
      colorScheme: 'light'
      // size: 'lg'
    },
    components: ['Button']
  }),
  withDefaultProps({
    defaultProps: {
      variant: 'underline'
    },
    components: ['Link']
  })
);

// typeof window === 'object' && console.log(theme);

export type Theme = typeof theme;

export default theme;
