const CONSTANTS = {
  SCREENS: {
    ONBOARDING: 'ONBOARDING',
    PROFILE: 'PROFILE',
  },
  ASYNC_STORAGE_CONSTANTS: {
    LOGGED_IN: 'LOGGED_IN',
    PROFILE: 'PROFILE',
  },
  PROFILE_MODEL: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    profileImgUrl: '',
    notificationPreference: [
      { key: 'order', label: 'Order Statuses', isSelected: false },
      { key: 'password', label: 'Password Changes', isSelected: false },
      { key: 'special', label: 'Special Offers', isSelected: false },
      { key: 'news', label: 'Newsletter', isSelected: false },
    ],
  },
};

export { CONSTANTS };
