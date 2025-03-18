export const APP_ROUTE = {
  LOGIN: '/',
  SIGN_UP: '/signup',
  DASHBOARD: '/dashboard',

  //ROLES WISE ROUTE
  SUPERVISORS: '/supervisor',
  STUDENTS: '/student',
  TEACHERS: '/teacher',
  SUPER_ADMINS: '/superadmin',


  //DEMO ROUTES
  SHOP: '/shop',
  CATEGORY: '/category',
  BOOKS: '/books',
  BOOK_PDF: '/book-pdf',
  CHECKLIST: '/checklist',
  WISHLIST: '/wishlist',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin-dashboard',
  ADMIN_CATEGORY_LIST: '/category-list',
  ADMIN_AUTHOR: '/author',
  ADMIN_BOOK: '/book'
} as const;
