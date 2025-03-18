import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Header from './header.component';
import Tooltip from '@mui/material/Tooltip';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryComponent from '@shared/hooks/ErrorBoundary';
import Logo from '@assets/images/nav-logo.png';
import Collapse_Logo from '@assets/images/past_paper.png';
import { logout } from '@shared/components/auth/login/store-slice/login.slice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '@store/app.store';
import { useDispatch, useSelector } from 'react-redux';
import { APP_ROUTE } from '@shared/constant/app-route';
import { generateNavigationLinks } from '@shared/utils/menuItems';
import NestedDropdown from './nestedSidebar';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();
  const userPermissions = useSelector((state: RootState) => state.permission.data);
  const user = useSelector((state: RootState) => state.user.data);
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed on mobile
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Track screen size
  const navigate = useNavigate();
  const location = useLocation();

  const menuLink = generateNavigationLinks(userPermissions);

  // Update isMobile state based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const closeSidebar = () => {
    if (isMobile) setIsCollapsed(true); // Only close on mobile
  };

  const handleMenuClick = (index: number, hasChildren: boolean, route?: string) => {
    if (hasChildren) {
      setOpenDropdown(openDropdown === index ? null : index);
    } else {
      setOpenDropdown(null);
      if (route) {
        navigate(route);
        closeSidebar(); // Close sidebar only if mobile
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(APP_ROUTE.LOGIN);
  };

  const isItemActive = (item: any): boolean => {
    if (item.route === location.pathname) return true;
    if (item.children) {
      return item.children.some((child: any) => isItemActive(child));
    }
    return false;
  };

  return (
    <div className="app-container">
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="sidebar-header">
          {!isCollapsed ? (
            <div className="header-content">
              <Link to="/" className="logo-link">
                <img src={Logo} className="logo" alt="examcare Logo" />
              </Link>
              <button onClick={toggleSidebar} className="toggle-button">
                <Icon icon="material-symbols:chevron-right" width={24} />
              </button>
            </div>
          ) : (
            <div className="header-content collapsed">
              <Link to="/" className="logo-link collapsed">
                <img src={Collapse_Logo} className="logo" alt="examcare Logo" />
              </Link>
              <button onClick={toggleSidebar} className="toggle-button collapsed">
                <Icon icon="material-symbols:chevron-left" width={24} />
              </button>
            </div>
          )}
        </div>

        <nav className="nav-menu">
          <ul className="menu-list">
            {menuLink.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive = isItemActive(item);

              return (
                <li key={item.id || item.label} className="menu-item">
                  {!isCollapsed ? (
                    <button
                      onClick={() => handleMenuClick(index, hasChildren, item.route)}
                      className={`nav-button ${isActive ? 'active' : ''}`}
                    >
                      <div className="button-content">
                        {item.icon && <Icon icon={item.icon} width={20} />}
                        <span className="label">{item.label}</span>
                      </div>
                      {hasChildren && (
                        <Icon
                          icon="mdi:chevron-down"
                          width={20}
                          className={`dropdown-arrow ${openDropdown === index ? 'open' : ''}`}
                        />
                      )}
                    </button>
                  ) : (
                    <Tooltip title={item.label} placement="right" arrow>
                      <button
                        onClick={() => handleMenuClick(index, hasChildren, item.route)}
                        className={`nav-button collapsed ${isActive ? 'active' : ''}`}
                      >
                        {item.icon && <Icon icon={item.icon} width={20} />}
                      </button>
                    </Tooltip>
                  )}

                  {hasChildren && openDropdown === index && (
                    <div className={`dropdown-content ${openDropdown === index ? 'open' : ''}`}>
                      <NestedDropdown
                        items={item.children}
                        level={1}
                        isCollapsed={isCollapsed}
                        onCloseSidebar={closeSidebar} // Pass closeSidebar callback
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="logout-section">
          <Tooltip title="Sign Out" placement="right" arrow>
            <button onClick={handleLogout} className={`logout-button ${isCollapsed ? 'collapsed' : ''}`}>
              <Icon icon="material-symbols:logout" width={24} />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </Tooltip>
        </div>
      </aside>

      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} user={user} />
        <div className={`outlet ${isCollapsed ? 'outlet-close' : 'outlet-open'}`}>
          <ErrorBoundary FallbackComponent={ErrorBoundaryComponent}>
            <main className="main">
              <div className="container">
                <Outlet />
              </div>
            </main>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;