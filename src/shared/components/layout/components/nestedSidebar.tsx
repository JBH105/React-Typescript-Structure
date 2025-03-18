import React, { useState, useEffect } from 'react';
import { INestedMenuItem, NestedDropdownProps } from '../interface/ISidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';


const NestedDropdown: React.FC<NestedDropdownProps> = ({
  items,
  level = 0,
  isCollapsed,
  onCloseSidebar,
}) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDropdownToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleNavigate = (item: INestedMenuItem) => {
    if (item.route) {
      navigate(item.route);
      if (onCloseSidebar) onCloseSidebar(); 
    }
  };

  const isItemActive = (item: INestedMenuItem): boolean => {
    if (item.route === location.pathname) return true;
    if (item.children) {
      return item.children.some((child) => isItemActive(child));
    }
    return false;
  };

  useEffect(() => {
    items?.forEach((item, index) => {
      if (item.children && item.children.some((child) => isItemActive(child))) {
        setOpenDropdown(index);
      }
    });
  }, [location.pathname, items]);

  return (
    <ul className={`nested-menu level-${level}`}>
      {items?.map((item, index) => {
        const isActive = isItemActive(item);
        const hasChildren = item.children && item.children.length > 0;

        return (
          <li key={item.id || item.label} className="nested-item">
            {!isCollapsed ? (
              <>
                <button
                  onClick={() => (hasChildren ? handleDropdownToggle(index) : handleNavigate(item))}
                  className={`nested-button ${isActive ? 'active' : ''}`}
                  style={{ paddingLeft: `${level * 1}rem` }}
                >
                  <div className="button-content">
                    {item.icon && <Icon icon={item.icon} width={18} />}
                    <span className="label">{item.label}</span>
                  </div>
                  {hasChildren && (
                    <Icon
                      icon="mdi:chevron-down"
                      width={18}
                      className={`dropdown-arrow ${openDropdown === index ? 'open' : ''}`}
                    />
                  )}
                </button>
              </>
            ) : (
              <Tooltip title={item.label} placement="right" arrow>
                <button
                  onClick={() => (hasChildren ? handleDropdownToggle(index) : handleNavigate(item))}
                  className={`nested-button collapsed ${isActive ? 'active' : ''}`}
                >
                  {item.icon && <Icon icon={item.icon} width={18} />}
                </button>
              </Tooltip>
            )}

            {hasChildren && openDropdown === index && (
              <div className={`nested-dropdown ${openDropdown === index ? 'open' : ''}`}>
                <NestedDropdown
                  items={item.children}
                  level={level + 1}
                  isCollapsed={isCollapsed}
                  onCloseSidebar={onCloseSidebar} 
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NestedDropdown;