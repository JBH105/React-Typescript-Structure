/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserPermission } from '@shared/components/auth/login/interfaces/IAuth';
import { APP_ROUTE } from '@shared/constant/app-route';
import { APP_CONSTANTS } from '@shared/constant/app.constant';
import { RootState } from '@store/app.store';
import { useSelector } from 'react-redux';

export const generateNavigationLinks = (userPermissions: IUserPermission[]) => {
  const supervisorLinks = [
    {
      label: 'Supervisor Dashboard',
      icon: 'mdi:view-dashboard',
      route: `${APP_ROUTE.SUPERVISORS}${APP_ROUTE.DASHBOARD}`,
      children: []
    },
    {
      label: 'Supervisor Store',
      icon: 'mdi:cart-outline',
      children: [
        {
          label: 'Store Categories',
          icon: 'mdi:shape-outline',
          route: `${APP_ROUTE.SUPERVISORS}${APP_ROUTE.CATEGORY}`
        },
        {
          label: 'Store Books',
          icon: 'mdi:book-open-page-variant',
          route: `${APP_ROUTE.SUPERVISORS}${APP_ROUTE.BOOKS}`
        },
        {
          label: 'Book Downloads',
          icon: 'mdi:file-pdf-box',
          route: `${APP_ROUTE.SUPERVISORS}${APP_ROUTE.BOOK_PDF}`
        },
        {
          label: 'Task Checklist',
          icon: 'mdi:checkbox-marked-outline',
          route: `${APP_ROUTE.SUPERVISORS}${APP_ROUTE.CHECKLIST}`
        },
        {
          label: 'Supervisor Favorites',
          icon: 'mdi:heart-outline',
          route: `${APP_ROUTE.SUPERVISORS}${APP_ROUTE.WISHLIST}`
        }
      ]
    }
  ];

  const adminLinks = [
    {
      label: 'Superadmin Overview',
      icon: 'mdi:view-dashboard',
      route: `${APP_ROUTE.SUPER_ADMINS}${APP_ROUTE.DASHBOARD}`,
      children: []
    },
    {
      label: 'Superadmin',
      icon: 'mdi:cart-outline',
      children: [
        {
          label: 'Market Categories',
          icon: 'mdi:shape-outline',
          route: `${APP_ROUTE.SUPER_ADMINS}${APP_ROUTE.CATEGORY}`
        },
        {
          label: 'Market Books',
          icon: 'mdi:book-open-page-variant',
          route: `${APP_ROUTE.SUPER_ADMINS}${APP_ROUTE.BOOKS}`
        },
        {
          label: 'PDF Resources',
          icon: 'mdi:file-pdf-box',
          route: `${APP_ROUTE.SUPER_ADMINS}${APP_ROUTE.BOOK_PDF}`
        },
        {
          label: 'Admin Tasks',
          icon: 'mdi:checkbox-marked-outline',
          route: `${APP_ROUTE.SUPER_ADMINS}${APP_ROUTE.CHECKLIST}`
        },
        {
          label: 'Superadmin Wishlist',
          icon: 'mdi:heart-outline',
          route: `${APP_ROUTE.SUPER_ADMINS}${APP_ROUTE.WISHLIST}`
        }
      ]
    }
    
  ];

  const studentMenuItems = [
    {
      label: 'Student Hub',
      icon: 'mdi:view-dashboard',
      route: `${APP_ROUTE.STUDENTS}${APP_ROUTE.DASHBOARD}`,
      children: []
    },
    {
      label: 'Learning Store',
      icon: 'mdi:cart-outline',
      children: [
        {
          label: 'Learning Categories',
          icon: 'mdi:shape-outline',
          route: `${APP_ROUTE.STUDENTS}${APP_ROUTE.CATEGORY}`
        },
        {
          label: 'Student Books',
          icon: 'mdi:book-open-page-variant',
          route: `${APP_ROUTE.STUDENTS}${APP_ROUTE.BOOKS}`
        },
        {
          label: 'Study PDFs',
          icon: 'mdi:file-pdf-box',
          route: `${APP_ROUTE.STUDENTS}${APP_ROUTE.BOOK_PDF}`
        },
        {
          label: 'Homework Checklist',
          icon: 'mdi:checkbox-marked-outline',
          route: `${APP_ROUTE.STUDENTS}${APP_ROUTE.CHECKLIST}`
        },
        {
          label: 'Student Favorites',
          icon: 'mdi:heart-outline',
          route: `${APP_ROUTE.STUDENTS}${APP_ROUTE.WISHLIST}`
        }
      ]
    }
  ];

  const teacherLinks = [
    {
      label: 'Dashboard',
      icon: 'mdi:view-dashboard',
      route: `${APP_ROUTE.TEACHERS}${APP_ROUTE.DASHBOARD}`,
      children: []
    },
    {
      label: 'Resource Shop',
      icon: 'mdi:cart-outline',
      children: [
        {
          label: 'Resource Categories',
          icon: 'mdi:shape-outline',
          route: `${APP_ROUTE.TEACHERS}${APP_ROUTE.CATEGORY}`
        },
        {
          label: 'Teaching Books',
          icon: 'mdi:book-open-page-variant',
          route: `${APP_ROUTE.TEACHERS}${APP_ROUTE.BOOKS}`
        },
        {
          label: 'Lesson PDFs',
          icon: 'mdi:file-pdf-box',
          route: `${APP_ROUTE.TEACHERS}${APP_ROUTE.BOOK_PDF}`
        },
        {
          label: 'Lesson Checklist',
          icon: 'mdi:checkbox-marked-outline',
          route: `${APP_ROUTE.TEACHERS}${APP_ROUTE.CHECKLIST}`
        },
        {
          label: 'Teacher Wishlist',
          icon: 'mdi:heart-outline',
          route: `${APP_ROUTE.TEACHERS}${APP_ROUTE.WISHLIST}`
        }
        
      ]
    }
  ];

  const isUserLogged = useSelector((state: RootState) => state.user.data);
  const userRole = (isUserLogged as { role?: { name: string } })?.role?.name;

  if (userRole === APP_CONSTANTS.ROLE_NAME.SUPERVISOR) {
    return filterLinks(supervisorLinks, userPermissions);
  }

  if (userRole === APP_CONSTANTS.ROLE_NAME.SUPERADMIN) {
    return filterLinks(adminLinks, userPermissions);
  }

  if (userRole === APP_CONSTANTS.ROLE_NAME.STUDENT) {
    return filterLinks(studentMenuItems, userPermissions);
  }

  if (userRole === APP_CONSTANTS.ROLE_NAME.TEACHER) {
    return filterLinks(teacherLinks, userPermissions);
  }

  return [];
};

export const filterLinks = (links: any[], userPermissions: IUserPermission[]) => {
  const filteredLinks = links
    .map((link) => {
      if (link.children && link.children.length > 0) {
        const filteredChildren = link.children.filter((sublink: any) => {
          const hasChildPermission = userPermissions.some((p) => p.moduleName === sublink.label);
          return hasChildPermission || true;
        });
        const hasParentPermission = userPermissions.some((p) => p.moduleName === link.label);
        return hasParentPermission || filteredChildren.length > 0 || true ? { ...link, children: filteredChildren } : null;
      }
      const hasPermission = userPermissions.some((p) => p.moduleName === link.label);
      return hasPermission || link.label === 'Teacher Portal' || link.label === 'Resource Shop' || true ? link : null;
    })
    .filter((link) => link !== null);

  const teacherPortalLink = links.find((link) => link.label === 'Teacher Portal');
  if (teacherPortalLink && !filteredLinks.some((link) => link.label === 'Teacher Portal')) {
    filteredLinks.unshift(teacherPortalLink);
  }

  const resourceShopLink = links.find((link) => link.label === 'Resource Shop');
  if (resourceShopLink && !filteredLinks.some((link) => link.label === 'Resource Shop')) {
    filteredLinks.unshift(resourceShopLink);
  }
  return filteredLinks;
};
