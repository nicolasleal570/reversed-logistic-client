import { useContext } from 'react';
import { LayoutContext } from '@contexts/LayoutContext/LayoutContext';

export function useLayout() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(LayoutContext);

  return { isSidebarOpen, setIsSidebarOpen };
}
