import merge from 'lodash/merge';
// Color system
export const white = '#ffffff';
export const grey1 = '#f4f4f4';
export const grey2 = '#e9ecef';
export const grey3 = '#dee2e6';
export const grey4 = '#adb5bd';
export const grey5 = '#999999';
export const grey6 = '#777777';
export const grey7 = '#383838';
export const grey8 = '#1e1e1e';
export const grey9 = '#2C2C2C';
export const black = '#121212';

export const red = '#e60023';
export const orange = '#F2711C';
export const yellow = '#FBBD08';
export const olive = '#B5CC18';
export const green = '#51d96c';
export const teal = '#00B5AD';
export const blue = '#2185D0';
export const violet = '#6435C9';
export const purple = '#A333C8';
export const pink = '#E03997';
export const brown = '#A5673F';

// Export dark theme
export const darkColors = {
  key: 'dark',
  colors: {
    primary: white,
    secondary: grey6,

    bgColor: black,
    bgColorSecondary: grey7,

    white: white,
    grey1: grey1,
    grey2: grey2,
    grey3: grey3,
    grey4: grey4,
    grey5: grey5,
    grey6: grey6,
    grey7: grey7,
    grey8: grey8,
    black: black,

    greyOutline: '#bbb',
    searchBg: '#303337',
    listItemBg: grey8,
    success: green,
    error: red,
    warning: yellow,
    disabled: 'hsl(208, 8%, 90%)',
    // Darker color if hairlineWidth is not thin enough
    divider: grey6,
    border: grey9,
    platform: {
      ios: {
        primary: '#007aff',
        secondary: '#5856d6',
        success: '#4cd964',
        error: '#ff3b30',
        warning: '#ffcc00',
      },
      android: {
        primary: '#2196f3',
        secondary: '#9C27B0',
        success: '#4caf50',
        error: '#f44336',
        warning: '#ffeb3b',
      },
    },
  },
  // Component text
  Text: {
    primary: {
      color: white,
    },
    secondary: {
      color: grey6,
    },
    third: {
      color: grey5,
    },
  },

  // Component Icon
  Icon: {
    color: white,
  },

  // Component SearchBar
  SearchBar: {
    bgColor: grey8,
  },

  // navigation Tab
  TabNavigator: {
    tabStyle: {
      borderTopColor: black,
      backgroundColor: grey8,
    },
  },

  // Button
  Button: {
    backgroundColor: black,
    borderColor: white,
    color: white,
    outlineColor: white,
    outlineBorderColor: grey7,
  },
  // Modal
  Modal: {
    backgroundColor: grey7,
  },

  // Loading
  Loading: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: white,
  },

  // ProductItem
  ProductItem: {
    color: white,
  },

  // SwitchProduct
  SwitchProduct: {
    color: grey7,
    selectColor: white,
  },

  // CategoryProductList
  CategoryProductList: {
    color: grey5,
    borderColor: grey7,
  },

  // Wishlist Item (ProductItem2)
  ProductItem2: {
    backgroundColor: grey8,
  },

  // ViewLabel
  ViewLabel: {
    color: grey6,
    colorHeading: white,
  },

  // ProductGrouped
  ProductGrouped: {
    quantityColor: grey8,
  },

  // LastestBlog
  LastestBlog: {
    backgroundColor: grey7,
  },

  // ChooseItem
  ChooseItem: {
    bgColor: 'transparent',
    borderColor: grey7,
    borderColorSub: 'transparent',
    bgColorSelect: grey7,
    borderColorSelect: grey7,
    borderColorSelectSub: grey7,
    iconSelect: green,
  },

  // OrderInfo
  OrderInfo: {
    avatarColor: grey8,
    avatarOpacity: 1,
  },
  // ButtonSwiper
  ButtonSwiper: {
    like: {
      backgroundColor: grey1,
      color: green,
    },
    unlike: {
      backgroundColor: grey1,
      color: black,
    },
    delete: {
      backgroundColor: red,
      color: white,
    },
    default: {
      backgroundColor: red,
      color: white,
    },
  },

  // LimeReviewProduct
  LimeReviewProduct: {
    color: grey7,
    colorRating: grey6,
  },

  // Screen About us
  AboutUsScreen: {
    titleColor: '#20c997',
    researchColor: grey6,
  },
};

const defaultLight = {
  key: 'light',
  colors: {
    primary: green,
    secondary: grey6,

    bgColor: green,
    bgColorSecondary: grey1,

    white: white,
    grey1: grey1,
    grey2: grey2,
    grey3: grey3,
    grey4: grey4,
    grey5: grey5,
    grey6: grey6,
    grey7: grey7,
    grey8: grey8,
    black:  black,

    greyOutline: '#bbb',
    searchBg: '#303337',
    listItemBg: white,
    success: green,
    error: red,
    warning: yellow,
    disabled: 'hsl(208, 8%, 90%)',
    // Darker color if hairlineWidth is not thin enough
    divider: grey2,
    border: grey2,
    platform: {
      ios: {
        primary: '#007aff',
        secondary: '#5856d6',
        success: '#4cd964',
        error: '#ff3b30',
        warning: '#ffcc00',
      },
      android: {
        primary: '#2196f3',
        secondary: '#9C27B0',
        success: '#4caf50',
        error: '#f44336',
        warning: '#ffeb3b',
      },
    },
  },
  // Component text
  Text: {
    primary: {
      color: white,
    },
    secondary: {
      color: grey6,
    },
    third: {
      color: grey5,
    },
  },

  // Component Icon
  Icon: {
    color: black,
  },

  // Component SearchBar
  SearchBar: {
    bgColor: grey1,
  },

  // navigation Tab
  TabNavigator: {
    tabStyle: {
      borderTopColor: grey1,
      backgroundColor: white,
    },
  },

  // Button
  Button: {
    backgroundColor:  green,
    borderColor: green,
    color:  green,
    outlineColor: green,
    outlineBorderColor: green,
  },

  // Button
  Modal: {
    backgroundColor: white,
  },

  // Loading
  Loading: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: black,
  },

  // ProductItem
  ProductItem: {
    color: grey6,
  },

  // SwitchProduct
  SwitchProduct: {
    color: grey4,
    selectColor: black,
  },

  // CategoryProductList
  CategoryProductList: {
    color: black,
    borderColor: grey2,
  },

  // Wishlist Item (ProductItem2)
  ProductItem2: {
    backgroundColor: white,
  },

  // ViewLabel
  ViewLabel: {
    color: grey5,
    colorHeading: black,
  },
  // ProductGrouped
  ProductGrouped: {
    quantityColor: white,
  },
  // LastestBlog
  LastestBlog: {
    backgroundColor: white,
  },
  // ChooseItem
  ChooseItem: {
    bgColor: 'transparent',
    borderColor: grey2,
    borderColorSub: 'transparent',
    bgColorSelect: 'transparent',
    borderColorSelect: black,
    borderColorSelectSub: black,
    iconSelect: black,
  },

  // ChooseItem
  OrderInfo: {
    avatarColor: red,
    avatarOpacity: 0.05,
  },

  // ButtonSwiper
  ButtonSwiper: {
    like: {
      backgroundColor: green,
      color: black,
    },
    unlike: {
      backgroundColor: grey2,
      color: black,
    },
    delete: {
      backgroundColor: red,
      color: white,
    },
    default: {
      backgroundColor: red,
      color: white,
    },
  },

  // LimeReviewProduct
  LimeReviewProduct: {
    color: grey3,
    colorRating: '#000',
  },

  // Screen About us
  AboutUsScreen: {
    titleColor: grey4,
    researchColor: black,
  },
};

export const getThemeLight = (colorsNew = {}) => {
  const dataColors = merge(defaultLight.colors, {
    ...colorsNew,
    listItemBg: colorsNew.bgColor,
  });
  return merge(defaultLight, {
    colors: dataColors,
    // Component text
    Text: {
      primary: {
        color: dataColors.primary,
      },
      secondary: {
        color: dataColors.secondary,
      },
      third: {
        color: grey5,
      },
    },

    // Component Icon
    Icon: {
      color: dataColors.primary,
    },

    // Component SearchBar
    SearchBar: {
      bgColor: dataColors.bgColorSecondary,
    },

    // navigation Tab
    TabNavigator: {
      tabStyle: {
        borderTopColor: dataColors.bgColorSecondary,
        backgroundColor: dataColors.bgColor,
      },
    },

    // Button
    Button: {
      backgroundColor: green,
      borderColor:green,
      color: dataColors.bgColor,
      outlineColor: dataColors.primary,
      outlineBorderColor: dataColors.primary,
    },

    // Button
    Modal: {
      backgroundColor: dataColors.bgColor,
    },

    // Loading
    Loading: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: dataColors.primary,
    },

    // ProductItem
    ProductItem: {
      color: green,
    },

    // SwitchProduct
    SwitchProduct: {
      color: green,
      selectColor: dataColors.primary,
    },

    // CategoryProductList
    CategoryProductList: {
      color: green,
      borderColor: grey2,
    },

    // Wishlist Item (ProductItem2)
    ProductItem2: {
      backgroundColor: green,
    },

    // ViewLabel
    ViewLabel: {
      color: green,
      colorHeading: dataColors.primary,
    },
    // ProductGrouped
    ProductGrouped: {
      quantityColor: dataColors.bgColor,
    },
    // LastestBlog
    LastestBlog: {
      backgroundColor: dataColors.bgColor,
    },
    // ChooseItem
    ChooseItem: {
      bgColor: 'transparent',
      borderColor: grey2,
      borderColorSub: 'transparent',
      bgColorSelect: 'transparent',
      borderColorSelect: dataColors.primary,
      borderColorSelectSub: dataColors.primary,
      iconSelect: dataColors.primary,
    },

    // ChooseItem
    OrderInfo: {
      avatarColor: red,
      avatarOpacity: 0.05,
    },

    // ButtonSwiper
    ButtonSwiper: {
      like: {
        backgroundColor: green,
        color: dataColors.primary,
      },
      unlike: {
        backgroundColor: green,
        color: dataColors.primary,
      },
      delete: {
        backgroundColor: red,
        color: dataColors.bgColor,
      },
      default: {
        backgroundColor: green,
        color: dataColors.bgColor,
      },
    },

    // LimeReviewProduct
    LimeReviewProduct: {
      color: grey3,
      colorRating: dataColors.primary,
    },

    // Screen About us
    AboutUsScreen: {
      titleColor: grey4,
      researchColor: dataColors.primary,
    },
  });
};
