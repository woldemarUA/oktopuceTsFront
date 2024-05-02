const globalStyles = {
  body: 'bg-black text-gray-200 ',
  container: 'h-screen  w-screen mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ', // was lg Defines a narrow container with maximum width for small screens
  mobilePadding: 'py-8 px-4 md:px-8 lg:px-12 xl:px-16', // Adds padding to the content for different screen sizes
  header: 'text-4xl font-bold text-center text-gray-100 mt-2',
  error: 'text-red-500 text-xs italic mt-1',
  message: 'text-center text-teal-600 text-base italic mt-1',
  row: 'grid items-center',
  button:
    'w-full bg-teal-800 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-2',
};

export default globalStyles;
