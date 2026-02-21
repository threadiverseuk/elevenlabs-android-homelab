import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastStack } from '@/components/ToastStack';
import { HomeScreen } from '@/screens/HomeScreen';
import { ProfilesScreen } from '@/screens/ProfilesScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';

export function AppRouter() {
  return (
    <>
      <Routes>
        <Route element={<HomeScreen />} path="/" />
        <Route element={<ProfilesScreen />} path="/profiles" />
        <Route element={<SettingsScreen />} path="/settings" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
      <ToastStack />
    </>
  );
}
