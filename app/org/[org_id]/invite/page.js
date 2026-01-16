
"use client";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getFromCookies } from '@/utils/utility';
import Protected from '@/components/Protected';

export const runtime = 'edge';

function UserManagementPage() {
  console.log('UserManagementPage component rendered');
  
  useEffect(() => {
    console.log('useEffect started');
    const PROXY_AUTH_TOKEN = getFromCookies('proxy_token');
    
    const initWidget = () => {
      initVerification({
        authToken: PROXY_AUTH_TOKEN,
        pass: true,
        type: 'user-management',
        containerId: 'userProxyContainer',
        success: (data) => {
          console.log('MSG91 Auth success response', data);
          toast.success('Authentication verified successfully!');
        },
        failure: (error) => {
          console.log('MSG91 Auth failure reason', error);
          toast.error('Authentication failed. Please try again.');
        },
      });
    };
    
      if (typeof initVerification === 'function') {
        console.log('Script already loaded, calling initWidget');
        initWidget();}
  }, []);

  return (
    <div id="userProxyContainer"></div>
  );
}

export default Protected(UserManagementPage);

