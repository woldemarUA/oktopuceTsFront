// styles.ts
const styles = {
  navContainer: 'bg-teal-600 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8',
  flexContainer: 'relative flex h-16 items-center justify-between',
  mobileMenuContainer: 'absolute inset-y-0 left-0 flex items-center sm:hidden',
  mobileMenuButton:
    'relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white',
  svgBlock: 'block h-6 w-6',
  svgHidden: 'hidden h-6 w-6',
  centerFlex:
    'flex flex-1 items-center justify-center sm:items-stretch sm:justify-start',
  logoContainer: 'flex flex-shrink-0 items-center',
  logo: 'h-8 w-auto rounded-full',
  logoHeadline: 'text-white rounded-md px-3 py-2 text-sm font-medium',
  navLinks: 'hidden sm:ml-6  sm:block',
  navLink: 'flex space-x-4',
  menuItemActive:
    'bg-teal-600 text-white rounded-md px-3 py-2 text-sm font-medium',
  menuItem:
    'bg-teal-600 hover:bg-teal-200 hover:text-white rounded-md px-3 py-2 text-sm font-medium',
  profileButton:
    'relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800',
  userMenuButton:
    'relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800',
  userMenu:
    'absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
  userProfile: 'block px-4 py-2 text-sm text-gray-700',
  hangingMenu:
    'absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none',
};

export default styles;
